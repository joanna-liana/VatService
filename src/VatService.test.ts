import { any, anyString, mock } from 'jest-mock-extended';
import { firstValueFrom, from, lastValueFrom } from 'rxjs';
import { v4 } from 'uuid';

import { Product } from './Product/Product';
import { Type } from './Product/Type';
import { VatProvider } from './VatProvider';
import { VatService } from './VatService';

describe('VatService', () => {
  it('calculates the gross price of a book', async () => {
    //given
    const vatProvider = mock<VatProvider>();
    vatProvider.getVatFor.calledWith(anyString(), any(Type)).mockResolvedValue(0.05);

    const serviceToTest = new VatService(vatProvider);
    const product = new Product(v4(), 'My book', 20.50, Type.BOOK, 'Poland');

    //when
    const grossPrice = await serviceToTest.getGrossPrice(product);

    //then
    expect(grossPrice).toEqual(21.53);
  });

  it('calculates the gross prices of the given products', async () => {
    //given
    const vatProvider = mock<VatProvider>();
    vatProvider.getVatFor.calledWith(anyString(), Type.FOOD).mockResolvedValue(0.05);
    vatProvider.getVatFor.calledWith(anyString(), Type.CLOTHES).mockResolvedValue(0.07);

    const serviceToTest = new VatService(vatProvider);
    const food = new Product(v4(), 'Chinese', 10.75, Type.FOOD, 'Poland');
    const clothes = new Product(v4(), 'Jeans', 25.50, Type.CLOTHES, 'Poland');

    //when
    const grossPrices = await serviceToTest.getGrossPrices(from([food, clothes]));

    // then
    expect(await firstValueFrom(grossPrices)).toEqual(11.29);
    expect(await lastValueFrom(grossPrices)).toEqual(27.29);
  });
});
