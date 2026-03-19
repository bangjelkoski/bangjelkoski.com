const speedReadActive = ref(false)

export const useSpeedRead = () => {
  const toggle = () => {
    speedReadActive.value = !speedReadActive.value
  }

  return {
    active: speedReadActive,
    toggle,
  }
}
