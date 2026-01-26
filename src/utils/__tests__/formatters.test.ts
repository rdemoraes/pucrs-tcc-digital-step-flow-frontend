import { describe, it, expect } from 'vitest'
import { formatEmail, isValidEmail, formatName } from '../formatters'

describe('formatters', () => {
  describe('formatEmail', () => {
    it('should trim whitespace and convert to lowercase', () => {
      expect(formatEmail('  TEST@EXAMPLE.COM  ')).toBe('test@example.com')
      expect(formatEmail('User@Example.Com')).toBe('user@example.com')
    })

    it('should return empty string for empty input', () => {
      expect(formatEmail('')).toBe('')
    })

    it('should handle null/undefined gracefully', () => {
      expect(formatEmail(null as any)).toBe('')
      expect(formatEmail(undefined as any)).toBe('')
    })
  })

  describe('isValidEmail', () => {
    it('should return true for valid email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name@example.co.uk')).toBe(true)
      expect(isValidEmail('user+tag@example.com')).toBe(true)
    })

    it('should return false for invalid email addresses', () => {
      expect(isValidEmail('invalid')).toBe(false)
      expect(isValidEmail('invalid@')).toBe(false)
      expect(isValidEmail('@example.com')).toBe(false)
      expect(isValidEmail('invalid@example')).toBe(false)
    })

    it('should return false for empty input', () => {
      expect(isValidEmail('')).toBe(false)
      expect(isValidEmail(null as any)).toBe(false)
      expect(isValidEmail(undefined as any)).toBe(false)
    })

    it('should handle whitespace', () => {
      expect(isValidEmail('  test@example.com  ')).toBe(true)
    })
  })

  describe('formatName', () => {
    it('should capitalize first letter of each word', () => {
      expect(formatName('john doe')).toBe('John Doe')
      expect(formatName('MARY JANE WATSON')).toBe('Mary Jane Watson')
    })

    it('should handle single word names', () => {
      expect(formatName('john')).toBe('John')
      expect(formatName('MARY')).toBe('Mary')
    })

    it('should trim whitespace', () => {
      expect(formatName('  john doe  ')).toBe('John Doe')
    })

    it('should handle multiple spaces between words', () => {
      expect(formatName('john    doe')).toBe('John Doe')
    })

    it('should return empty string for empty input', () => {
      expect(formatName('')).toBe('')
      expect(formatName(null as any)).toBe('')
      expect(formatName(undefined as any)).toBe('')
    })
  })
})
