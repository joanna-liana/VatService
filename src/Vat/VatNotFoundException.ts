export class VatNotFoundException extends Error {
  constructor(message?: string) {
    super(message || 'Vat not found');
  }
}
