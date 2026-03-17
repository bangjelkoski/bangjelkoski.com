export const readingTime = (text: string): number => {
  const wordsPerMinute = 175
  const textLength = text.split(' ').length

  if (textLength > 0) {
    return Math.ceil(textLength / wordsPerMinute)
  }

  return 0
}

export const formatReadingTime = (text: string): string => {
  const minutes = readingTime(text)
  const cups = Math.round(minutes / 8)

  if (cups > 5) {
    return `${new Array(Math.round(cups / Math.E))
      .fill('🍕')
      .join('')} ${minutes} min read`
  }

  return `${new Array(cups || 1).fill('☕️').join('')} ${minutes} min read`
}

export const formatPostDate = (date: string): string => {
  if (typeof Date.prototype.toLocaleDateString !== 'function') {
    return date
  }

  return new Date(date).toLocaleDateString('en-UK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
