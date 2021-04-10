---
title: Cosmos SDK overview through the lens of a JavaScript Developer
date: 2021/04/10
slug: cosmos-sdk-overview-through-the-lens-of-a-javascript-developer
excerpt: Explore the world of the world’s most popular framework for building application-specific blockchains.
keywords: cosmos, cosmos-sdk, blockchain, tendermint, bft, byzantine fault tolerance
image: /images/cosmos-sdk.jpeg
category: Blockchain
tags: cosmos, blockchain
---

Why does a JavaScript developer write about a framework for building application-specific blockchains? Given the fact that we at [Injective Protocol](http://injectiveprotocol.com/) are building our own Injective Chain based on the Cosmos SDK, having the growth mindset and feeling the necessity for constantly evolving as a developer by exploring new concepts and tools, I had to start learning more about it.

So, what is the Cosmos SDK? Their official docs state that **Cosmos SDK is the world’s most popular framework for building application-specific blockchains.** Its written in [Go](https://golang.org/) programming language and uses [Tendermint](https://tendermint.com/) core as a consensus algorithm. Tendermint is responsible for the networking and the consensus layer, and Cosmos SDK handles the business logic. The Cosmos SDK and Tendermint communicate using the ABCI (*Application Blockchain Interface*). Lets deep dive into the specifics now. 

## Tendermint Core

Tendermint Core is a blockchain application platform; it provides the equivalent of a web-server, database, and supporting libraries for blockchain applications written in any programming language. Tendermint core is the leading BFT (Byzantine Fault Tolerance) engine for building blockchains. The safety threshold is `1/3` of the validator's power. Every block that is produced is considered final (i.e blocks have **instant finality**). Also, with the ABCI interface, Tendermint Core supports state machines written in any programming language.

### Tendermint BFT

Byzantine Fault Tolerance is the feature of a distributed network to reach consensus *(agreement on the same value)* even when some of the nodes in the network fail to respond or respond with incorrect information. The objective of a BFT mechanism is to safeguard against system failures by employing collective decision-making (both – correct and faulty nodes) which aims to reduce to influence of the faulty nodes. BFT is derived from *Byzantine Generals’ Problem*.

The advantages of BFT are: 

- **Energy efficiency -** It can achieve distributed consensus without carrying out complex mathematical computations (like in Proof of Work).
- **Transaction finality**: The transactions do not require multiple confirmations (like in the case of the PoW mechanism in Bitcoin where every node individually verifies all the transactions before adding the new block to the blockchain; confirmations can take between 10-60 minutes depending upon how many entities confirm the new block) after they have been finalized and agreed upon.
- **Low reward variance**: Every node in the network takes part in responding to the request by the client and hence every node can be incentivized leading to low variance in rewarding the nodes that help in decision making.

### BFT Consensus Algorithm

The participants in the protocol are called **validators**, who take turns in proposing blocks of transactions and vote on them. These turns are assigned to the validators using round-robin scheduling according to their total amount of stake.

Another key participant in the protocol are the **delegators**. Delegators are token holders that do not want to run validator operations (ie. invest in the necessary equipment to be able to participate in the consensus protocol) and, as the name suggests, they delegate their stake tokens to validators, who charge a commission on the corresponding fees obtained by the delegated tokens.

Tendermint BFT works using three steps: **proposing**, **pre-voting** and **pre-committing.** The sequence `(Propose -> Pre-vote -> Pre-commit)` is called **round**.

![BFT Consensus Algorithm](/images/posts/bft-consensus-algorithm.png)

1) **Propose step**

- A validator node from the validator set is chosen as block proposer for a given height.
- The validator picks up transactions and packs them in a block. The proposed block is broadcasted to the rest of nodes.

2) **Pre-Vote step**

- Each node casts a ***pre-vote*** and listens until `+2/3` pre-votes from validators' nodes have been submitted. A block can be either pre-voted as *a pre-vote* (ie. valid block) or `nil` (when it's invalid or timeout reached). We generally call a ***Polka*** when `+2/3` of validator pre-vote for the same block. Also, in the perspective of a validator, if the validator voted for the block that is referred to in the Polka, the validator now has what's called a ***proof-of-lock-change*** or **PoLC** for short in that particular height and round `(H, R)`.

3) **Pre-Commit step**

- Once a Polka is reached, validators submit a ***pre-commit*** block, otherwise they *pre-commit* `nil`. After they are broadcasted, they wait for `+2/3` pre-commits from their peers.
- Finally, the proposed block is committed when validators submit more than `+2/3` pre-commits (aka ***Commit***) and a new block height is reached with a new selected block proposer. If not, the network performs a new round and the process starts from the beginning (1).

One important thing to consider is that these pre-votes are included in the next block as proof that the previous block was committed - they cannot be included in the current block, as that block has already been created.

### ABCI (Application BlockChain Interface)

The communication between the Cosmos SDK and Tendermint goes through the ABCI interface. Tendermint only handles transaction bytes. It has no knowledge of what these bytes mean. All Tendermint does is order these transaction bytes deterministically. Tendermint passes the bytes to the application via the ABCI, and expects a return code to inform it if the messages contained in the transactions were successfully processed or not. 

Here are the most important messages of the ABCI:

- **`CheckTx`:** Validate transaction. Mempool only relays valid transactions to its peers.
- **`DeliverTx`:** Deliver transaction. Validate tx against the current state, application protocol and the cryptographic credentails.
- **`Commit`:** Persist app state to disk. Transactions are now considered final. Remain transactions in the mempool are replayed (**`CheckTx`**).
- **`BeginBlock/EndBlock`:** Run code at the beginning/end of every block. **Every application module can define its own `BeginBlock/EndBlock` functions in their `BeginBlocker` and `EndBlocker` function within the module.**

## Cosmos SDK

The Cosmos-SDK is an open-source framework for building multi-asset public **Proof-of-Stake** (PoS) blockchains, as well as permission **Proof-Of-Authority** (PoA) blockchains. Blockchains built with the Cosmos SDK are generally referred to as **application-specific blockchains.** 

The goal of the Cosmos SDK is to allow developers to easily create custom blockchains from scratch that can natively interoperate with other blockchains. SDK-based blockchains are built out of composable modules, most of which are open source and readily available for any developers to use. Anyone can create a module for the Cosmos-SDK, and integrating already-built modules is as simple as importing them into your blockchain application. 

The Cosmos SDK is a framework that facilitates the development of secure state machines on top of Tendermint. At its core, the SDK is a boilerplate implementation of the ABCI in Go. It comes with a multistore to persist data and a router to handle transactions. 

The main components of an Cosmos SDK app are: 

- **`Baseapp`**: Boilerplate implementation of a Cosmos SDK application. It comes with an implementation of the ABCI to handle the connection with the underlying consensus engine.
- **`Multistore`**: The Cosmos SDK provides a multistore for persisting state. It's a store of key-value stores (KVStores).
- **App Codec**: encoding of state and client logic (Amino or Protobuf)
- **Module Keepers**: hold a key to access the module's KVStore. Secured by [object-capability model.](https://en.wikipedia.org/wiki/Object-capability_model)
- **Module manager**: List of the app modules which contain the application business logic.

Lets dig deeper into these components.

### `Baseapp`

Boilerplate implementation of a Cosmos SDK application. It comes with an implementation of the ABCI to handle the connection with the underlying consensus engine.

- **Tendermint ABCI**: `CheckTx`, `DeliverTx`, `Commit`, `Begin/End Block`, `Info`
- **Transaction/Query Router**: runs each `Msg` through the Router/Query handler for each of the modules
- **Tendermint consensus parameters**: Block, Evidence, and Validators *(can be changed through governance)*
- **DB and Logger**
- **`AnteHandler`**: special logic that is executed before the actual transaction execution happens *(eg: balance, signature verification, gas consumption, etc).*

### `Multistore`

Store of key-value stores (KVStore). Each module contains a key to one or more KVStore. It supports different databases *(GolevelDB [default], RocksDB, BoltDB, etc)*. App state persisted to disk during ABCI `Commit` phase. 

There are different types of stores:

- **IAVL Store**: self-balancing binary tree. Get and Set oprations are O(log n).
- **Transcient Store**: automatically discarded at the end of the block. Useful to persist information that is only relevant per-block *(eg: parameter changes)*.

### Keepers

Gatekeepers for a given KVStore. They are usually associated with a single module. They hold a reference to a store key and a codec for de/encoding of types from/to the store.

They can also hold a reference to other modules' [expected Keepers](https://docs.cosmos.network/v0.42/building-modules/keeper.html#type-definition). 

### Module Manager

The center piece of the Cosmos SDK. The modules are a way to implement the business logic of the Cosmos Application. Usually located in the `x` folder *(stands for extensions)*. When designing and building a module, Composability *(can be reused)*, Specialisation *(manages a specific set of business logic)* and Capabilities *(each module has a single reference to a KVStore, and overall security measures for the module, what it can and can't do)* should be the key considerations.

- Manages a collection of `AppModules`.
- It also defines a common interface that modules need to expose
- Register clients
- Routes for tx and queries; `Handler` and `Query`
- ABCI Logic (`InitChain`, `Import/ExportGenesis`, `Begin/EndBlock`)
- Module invariants and simulation registration

Thats about it. The next blog post would cover Cosmos-SDK modules and then IBC. I'll continue writing on this topic as I continue exploring myself. ✌️


References: 
- [Go](https://golang.org/)
- [Tendermint](https://tendermint.com/)
- [BFT](https://en.wikipedia.org/wiki/Byzantine_fault) (Byzantine Fault Tolerance)
- [PoS](https://en.wikipedia.org/wiki/Proof_of_stake) (Proof of Stake)
- [RRA](https://en.wikipedia.org/wiki/Round-robin_scheduling) (Round Robin Algorithm)
- [Cosmos SDK](https://docs.cosmos.network/v0.42/)
- [Tendermint BFT Consensus Algorithm](https://cosmos-network.gitbooks.io/cosmos-academy/content/introduction-to-the-cosmos-ecosystem/tendermint-bft-consensus-algorithm.html)
- [Object-Capability Model](https://en.wikipedia.org/wiki/Object-capability_model)
