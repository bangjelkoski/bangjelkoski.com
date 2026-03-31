---
title: Secure and hardened OpenClaw setup on a VPS
date: 2026/03/23
slug: open-claw-secure-hardened-setup
excerpt: Setting up OpenClaw on a VPS is easy. Setting it up in a way that doesn’t casually expose your gateway to the internet is the part that actually matters.
keywords: openclaw, vps, docker, ubuntu, secure openclaw setup, hardened server setup, ssh hardening, ufw, fail2ban
image: /images/openclaw.png
category: AI
tags: ai, devops, docker, security, vps
readingTime: "☕️☕️ 12 min read"
---

I have been experimenting with OpenClaw recently, and while the initial setup is fairly straightforward, the secure setup is where most of the interesting decisions actually are.

The difference between “it works” and “it is safe enough to leave running on a VPS” is not small. If you are running an agent that can read files, write code, install packages, and expose a gateway for device pairing, you really do not want to treat the box like a throwaway toy project.

So in this post I am going to walk through the setup I ended up with for OpenClaw on a VPS, but with an emphasis on **hardening the machine first**, and only then installing the app. The main goal is simple:

- lock down SSH
- keep the OpenClaw gateway on loopback only
- avoid exposing unnecessary ports
- run the service in a way that survives rebuilds and reboots

This is not the only way to do it, but it is a pragmatic setup that I would be comfortable running.

## First: harden the server before installing anything

Start by connecting to your VPS as `root`.

```bash
ssh root@YOUR_VPS_IP
```

If this is the first time you connect, type `yes` at the SSH fingerprint prompt.

Once you are in, update the machine.

```bash
apt-get update && apt-get upgrade -y
```

Then install the basic packages we need along the way.

```bash
apt-get install -y git curl ca-certificates
```

Now install Docker:

```bash
curl -fsSL https://get.docker.com | sh
```

And after that, install the basic hardening tools:

```bash
apt install ufw fail2ban unattended-upgrades -y
```

Enable automatic security updates as well:

```bash
dpkg-reconfigure -plow unattended-upgrades
```

There is nothing OpenClaw-specific here yet, and that is the point. Before giving an AI agent a home on your VPS, make sure the VPS itself is not casually exposed.

## Configure the firewall before OpenClaw exists

This is one of the most important parts of the whole setup.

The gateway should **not** be reachable from the public internet. It should bind to loopback and only be reachable locally on the server. So before installing OpenClaw, configure the firewall to allow only SSH.

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp comment 'SSH'
ufw enable
ufw status verbose
```

What you should **not** do is this:

```bash
ufw allow 18789/tcp
```

That would expose the OpenClaw gateway directly to the internet, which defeats the point of keeping it local in the first place.

## Create a separate user and stop using root

Next, create a dedicated user for running and managing OpenClaw.

```bash
adduser openclaw
```

Set a password, skip the optional name and phone fields, and confirm with `Y`.

Then give that user `sudo` and Docker access:

```bash
usermod -aG sudo openclaw
usermod -aG docker openclaw
```

Copy over your SSH key so you can log in as the new user:

```bash
mkdir -p /home/openclaw/.ssh
cp /root/.ssh/authorized_keys /home/openclaw/.ssh/
chown -R openclaw:openclaw /home/openclaw/.ssh
chmod 700 /home/openclaw/.ssh
chmod 600 /home/openclaw/.ssh/authorized_keys
```

Now test it in a **new terminal tab**, while keeping your root session open:

```bash
ssh openclaw@YOUR_VPS_IP
```

If you see a shell prompt for `openclaw`, you are good.

Only after that should you lock down root SSH access:

```bash
echo "PermitRootLogin no" >> /etc/ssh/sshd_config
echo "PasswordAuthentication no" >> /etc/ssh/sshd_config
systemctl restart ssh
```

And verify:

```bash
ssh root@YOUR_VPS_IP
```

This should now fail with `Permission denied`.

From this point on, use the `openclaw` user only.

## Clone the repo and create persistent directories

Log in as the `openclaw` user and update packages once more:

```bash
sudo apt-get update && sudo apt-get upgrade -y
```

Then clone the repository:

```bash
git clone https://github.com/openclaw/openclaw.git
cd openclaw
```

Create the directories that should survive container rebuilds:

```bash
sudo mkdir -p /home/openclaw/.openclaw/workspace
sudo chown -R openclaw:openclaw /home/openclaw/.openclaw
```

I prefer keeping this data outside the container so configuration, auth state, and workspace files do not disappear when rebuilding images or replacing containers.

## Protect the environment file

Once you create your `.env`, lock it down immediately:

```bash
chmod 600 .env
```

That is just a small step, but it is one of those small steps that should always be there.

## Why the default Docker Compose file is not enough

This is where the setup starts getting more opinionated.

The default `docker-compose.yml` is not what I would call a hardened setup. There are a few things we want to change:

1. We want the gateway to build from the local `Dockerfile`, because we are going to tweak that file.
2. We want host networking so device pairing works reliably.
3. We want the gateway bound to loopback, not something reachable from outside.
4. We want restart policies so the service comes back after reboot or crashes.
5. We do **not** want leftover Anthropic session variables hanging around if we are not using them.

If you want to edit comfortably, this is one of those cases where VS Code Remote SSH is much nicer than editing everything with `nano`.

The file we are changing is:

```bash
nano /home/openclaw/openclaw/docker-compose.yml
```

And this is the version I ended up using:

```yaml
services:
  openclaw-gateway:
    image: ${OPENCLAW_IMAGE:-openclaw:local}
    build: .
    environment:
      HOME: /home/node
      TERM: xterm-256color
      OPENCLAW_GATEWAY_TOKEN: ${OPENCLAW_GATEWAY_TOKEN}
      NODE_ENV: production
      OPENCLAW_GATEWAY_BIND: ${OPENCLAW_GATEWAY_BIND:-loopback}
      OPENCLAW_GATEWAY_PORT: ${OPENCLAW_GATEWAY_PORT:-18789}
      OPENCLAW_SECRET: ${OPENCLAW_SECRET}
      XDG_CONFIG_HOME: ${XDG_CONFIG_HOME}
    volumes:
      - ${OPENCLAW_CONFIG_DIR}:/home/node/.openclaw
      - ${OPENCLAW_WORKSPACE_DIR}:/home/node/.openclaw/workspace
    network_mode: host
    init: true
    restart: unless-stopped
    command:
      ["node", "dist/index.js", "gateway",
       "--bind", "${OPENCLAW_GATEWAY_BIND:-loopback}",
       "--port", "18789"]

  openclaw-cli:
    image: ${OPENCLAW_IMAGE:-openclaw:local}
    environment:
      HOME: /home/node
      TERM: xterm-256color
      OPENCLAW_GATEWAY_TOKEN: ${OPENCLAW_GATEWAY_TOKEN}
      BROWSER: echo
    volumes:
      - ${OPENCLAW_CONFIG_DIR}:/home/node/.openclaw
      - ${OPENCLAW_WORKSPACE_DIR}:/home/node/.openclaw/workspace
    stdin_open: true
    tty: true
    init: true
    entrypoint: ["node", "dist/index.js"]
```

The most important line here is probably this one:

```yaml
OPENCLAW_GATEWAY_BIND: ${OPENCLAW_GATEWAY_BIND:-loopback}
```

`loopback` means the gateway listens on `127.0.0.1` only. That is exactly what we want.

Another important change is removing the `ports:` section entirely. If you expose the gateway with normal Docker port publishing and then open it in the firewall, you have made the box much more reachable than necessary.

## Modify the Dockerfile

There is one small but practical modification I had to make in the `Dockerfile`.

Open it:

```bash
nano Dockerfile
```

Near the bottom you will find:

```dockerfile
USER node
```

Comment that out:

```dockerfile
# USER node
```

Normally I prefer dropping privileges inside containers, but in this case the agent needs to install tools, manage packages, and write files in ways that quickly run into permissions friction. Leaving that line in place caused more trouble than value for my use case.

## Build and run onboarding

Now build the images:

```bash
docker compose build
```

Then run the onboarding wizard:

```bash
docker compose run --rm openclaw-cli onboard
```

I went with `QuickStart`, then `OpenAI (Codex OAuth + API key)`, followed by `OpenAI Codex (ChatGPT OAuth)`, but you can pick whichever provider works for you.

The OAuth flow is slightly awkward the first time, but it is simple enough:

1. The wizard prints a URL.
2. Open it in your laptop browser.
3. Log in and approve.
4. The browser redirects to something like `http://localhost:xxxx/auth/callback?code=...`
5. The page may say it cannot connect. That is normal.
6. Copy the entire redirected URL and paste it back into the terminal.

If you want Telegram, configure it during onboarding. I skipped the optional skills, hooks, and extra API key prompts for the initial setup.

## Fix the bind mode if the wizard changes it

After onboarding, verify that the gateway bind value is still correct:

```bash
grep '"bind"' /home/openclaw/.openclaw/openclaw.json
```

It should say:

```json
"bind": "loopback"
```

If it says `lan`, change it. This is not a cosmetic setting. It controls whether the gateway stays local or starts listening more broadly than intended.

## Fix the gateway token mismatch

This was the part that felt most likely to waste time later if left unnoticed.

The onboarding wizard can write its own gateway token into `openclaw.json`, and that token may not match the one in your `.env`. If the tokens differ, you will get weird failures later: CLI commands fail, subagents do not spawn correctly, cron jobs misbehave, and the setup feels broken in ways that are harder to reason about than they should be.

Check the token written by the wizard:

```bash
python3 -c "import json; c=json.load(open('/home/openclaw/.openclaw/openclaw.json')); print(c['gateway']['auth']['token'])"
```

Then compare it with the token in `.env`:

```bash
grep OPENCLAW_GATEWAY_TOKEN /home/openclaw/openclaw/.env
```

If they are different, edit the JSON file and make them match:

```bash
nano /home/openclaw/.openclaw/openclaw.json
```

## The final `openclaw.json` gateway shape

The gateway section in `openclaw.json` should look like this:

```json
"gateway": {
  "port": 18789,
  "mode": "local",
  "bind": "loopback",
  "auth": {
    "mode": "token",
    "token": "YOUR_TOKEN_FROM_ENV_FILE",
    "rateLimit": {
      "maxAttempts": 10,
      "windowMs": 60000,
      "lockoutMs": 300000
    }
  },
  "controlUi": {
    "enabled": true,
    "allowInsecureAuth": false
  }
}
```

There are three fields here that matter a lot:

- `bind: "loopback"` keeps the gateway local to `127.0.0.1`
- `allowInsecureAuth: false` ensures you do not weaken device pairing
- `rateLimit` gives you a basic brute-force safety net

This is the part where the setup stops being “just a local tool running in Docker” and starts becoming a service you can operate with a bit more confidence.

## Final thoughts

OpenClaw is not particularly hard to get running. The hard part is resisting the temptation to stop the moment you see the happy path working.

A secure setup here is mostly about discipline:

- do the firewall first
- move off root
- keep the gateway on loopback
- do not open the port publicly
- keep persistent data outside the container
- make sure the tokens are actually in sync

If you skip those parts, the setup is technically “done”, but not in a way I would feel good about leaving on a VPS.

My general rule is simple: whenever a tool can execute commands, install packages, and read or write files, the surrounding environment matters as much as the tool itself.

That is exactly the kind of software that deserves a hardened setup from day one.
