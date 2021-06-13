import { any, anyString, mock } from 'jest-mock-extended';
import { v4 } from 'uuid';

import { Product } from './Product/Product';
import { Type } from './Product/Type';
import { VatProvider } from './VatProvider';
import { VatService } from './VatService';

describe('VatService', () => {
  it('calculates the gross price of a book', async() => {
    //given
    const vatProvider = mock<VatProvider>();
    vatProvider.getVatFor.calledWith(anyString(), any(Type)).mockReturnValue(0.05);

    const serviceToTest = new VatService(vatProvider);
    const product = new Product(v4(), 'My book', 20.50, Type.BOOK, 'Poland');

    //when
    const grossPrice = serviceToTest.getGrossPrice(product);

    //then
    expect(grossPrice).toEqual(21.53);
  });
});
