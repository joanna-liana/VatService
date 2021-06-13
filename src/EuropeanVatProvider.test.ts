import { EuropeanVatProvider } from './EuropeanVatProvider';
import { Type } from './Product/Type';

describe('EuropeanVatProvider', () => {
  it('Returns 5 percentage for books in Poland', async () => {
    // given
    const vatProvider = new EuropeanVatProvider();

    // when
    const polishBooksVat = vatProvider.getVatFor('Poland', Type.BOOK);

    // then
    expect(polishBooksVat).toEqual(0.05);
  });
});
