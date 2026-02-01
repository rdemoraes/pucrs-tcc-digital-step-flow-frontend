/**
 * Formats an email address by trimming whitespace and converting to lowercase
 * @param email - The email address to format
 * @returns The formatted email address
 */
export function formatEmail (email: string): string {
  if (email === '' || email === null || email === undefined) {
    return ''
  }
  return email.trim().toLowerCase()
}

/**
 * Validates if a string is a valid email format
 * @param email - The email address to validate
 * @returns True if the email is valid, false otherwise
 */
export function isValidEmail (email: string): boolean {
  if (email === '' || email === null || email === undefined) {
    return false
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

/**
 * Formats a name by capitalizing the first letter of each word
 * @param name - The name to format
 * @returns The formatted name
 */
export function formatName (name: string): string {
  if (name === '' || name === null || name === undefined) {
    return ''
  }
  return name
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
