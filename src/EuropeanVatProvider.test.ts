import { CountryNotSupportedException } from './CountryNotSupportedException';
import { EuropeanVatProvider } from './EuropeanVatProvider';
import { Type } from './Product/Type';

describe('EuropeanVatProvider', () => {
  let vatProvider: EuropeanVatProvider;

  beforeEach(() => {
    vatProvider = new EuropeanVatProvider();
  });

  describe('Poland', () => {
    const country = 'Poland';

    it.each([
      Type.BABY,
      Type.BOOK
    ])('Returns 5 percentage for %s products', (type) => {
      // given, when
      const vat = vatProvider.getVatFor(country, type);

      // then
      expect(vat).toEqual(0.05);
    });

    it('Returns 8 percentage for FOOD products', () => {
      // given, when
      const vat = vatProvider.getVatFor(country, Type.FOOD);

      // then
      expect(vat).toEqual(0.08);
    });

    it.each(
      Object.values(Type).filter(t => ![Type.BABY, Type.BOOK, Type.FOOD].includes(t))
    )('Returns 23 percentage for products other than BABY, FOOD and BOOK - %s', (type) => {
      // given, when
      const vat = vatProvider.getVatFor(country, type);

      // then
      expect(vat).toEqual(0.23);
    });
  });

  describe('Germany', () => {
    const country = 'Germany';

    it.each([
      Type.BABY,
      Type.BOOK,
      Type.FOOD
    ])('Returns 4 percentage for %s products', (type) => {
      // given, when
      const vat = vatProvider.getVatFor(country, type);

      // then
      expect(vat).toEqual(0.04);
    });

    it('Returns 10 percentage for CLOTHES products', () => {
      // given, when
      const vat = vatProvider.getVatFor(country, Type.CLOTHES);

      // then
      expect(vat).toEqual(0.1);
    });

    it.each(
      Object.values(Type).filter(t => ![Type.BABY, Type.BOOK, Type.FOOD, Type.CLOTHES].includes(t))
    )('Returns 21 percentage for products other than CLOTHES, BABY, FOOD and BOOK - %s', (type) => {
      // given, when
      const vat = vatProvider.getVatFor(country, type);

      // then
      expect(vat).toEqual(0.21);
    });
  });

  describe('Denmark', () => {
    const country = 'Denmark';

    it.each(Object.values(Type))('Returns 8 percentage for all product types - %s', (type) => {
      // given, when
      const vat = vatProvider.getVatFor(country, type);

      // then
      expect(vat).toEqual(0.08);
    });
  });

  describe('Unsupported country', () => {
    it('Throws when given an unsupported country', () => {
      expect(() => vatProvider.getVatFor('unsupported', Type.BABY)).toThrowError(CountryNotSupportedException);
    });

    it.each([
      'denmark',
      'POLAND'
    ])('Throws when a supported country name is not in Pascal case - %s', (country) => {
      expect(() => vatProvider.getVatFor(country, Type.BABY)).toThrowError(CountryNotSupportedException);
    });
  });
});
