import { Type } from '../Product/Type';
import { VatNotFoundException } from './VatNotFoundException';
import { VatRepository } from './VatRepository';

describe('VatRepository', () => {
  let repositoryToTest: VatRepository;

  beforeEach(() => {
    repositoryToTest = new VatRepository();
  });

  it('Throws when the country is incorrect', () => {
    repositoryToTest.getVatFor('Poland111', Type.BOOK).subscribe({
      error: (err) => {
        expect(err).toStrictEqual(new VatNotFoundException('Vat for country Poland111 and product type BOOK was not found'));
      }
    });
  });

  it.each([
    ['Denmark', Type.GAMES, 0.4],
    ['Germany', Type.FOOD, 0.12],
    ['Italy', Type.FOOD, 0.1]
  ])('Adds vat value for the given country', (country, type, amount) => {
    repositoryToTest.addVatValue(country , type, amount);

    repositoryToTest.getVatFor(country, type).subscribe(vat => {
      expect(vat.country).toBe(country);
      expect(vat.productType).toBe(type);
      expect(vat.amount).toBe(amount);
    });
  });

  it('Given a vat value registered twice for the same country and product, the first entry takes precendence', () => {
    // given
    const country = 'Slovakia';
    const productType = Type.CLOTHES;

    repositoryToTest.addVatValue(country, productType, 0.3);
    repositoryToTest.addVatValue(country, productType, 0.5);

    // when, then
    repositoryToTest.getVatFor(country, productType).subscribe(vat => {
      expect(vat.country).toBe(country);
      expect(vat.productType).toBe(productType);
      expect(vat.amount).toBe(0.3);
    });
  });
});
