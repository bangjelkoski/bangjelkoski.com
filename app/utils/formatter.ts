export const formatPostDate = (date: string): string => {
  if (typeof Date.prototype.toLocaleDateString !== 'function') {
    return date
  }

  return new Date(date).toLocaleDateString('en-UK', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
