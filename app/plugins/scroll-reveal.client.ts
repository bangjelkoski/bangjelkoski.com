export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined') return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        }
      })
    },
    { threshold: 0.1 },
  )

  // Observe all elements with the scroll-reveal-item class
  const init = () => {
    document.querySelectorAll('.scroll-reveal-item').forEach((el) => {
      const htmlEl = el as HTMLElement
      htmlEl.style.opacity = '0'
      htmlEl.style.transition = 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out'
      htmlEl.style.transform = 'translateY(20px)'
      observer.observe(el)
    })
  }

  // Run on initial load and on route changes
  const nuxtApp = useNuxtApp()
  nuxtApp.hook('page:finish', init)
  init()
})
