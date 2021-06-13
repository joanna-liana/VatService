export class CountryNotSupportedException extends Error {
  constructor(message?: string) {
    super(message || 'Country not supported');
  }
}
