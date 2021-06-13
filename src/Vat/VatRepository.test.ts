import { Type } from '../Product/Type';
import { VatNotFoundException } from './VatNotFoundException';
import { VatRepository } from './VatRepository';

describe('VatRepository', () => {
  it('Throws when the country is incorrect', async() => {
    //given
    const repositoryToTest = new VatRepository();

    // when, then
    repositoryToTest.getVatFor('Poland111', Type.BOOK).subscribe({
      error: (err) => {
        expect(err).toStrictEqual(new VatNotFoundException('Vat for country Poland111 and product type BOOK was not found'));
      }
    });
  });
});
