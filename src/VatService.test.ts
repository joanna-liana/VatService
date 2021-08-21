import { any, anyString, mock } from 'jest-mock-extended';
import { firstValueFrom, from, lastValueFrom } from 'rxjs';
import { v4 } from 'uuid';

import { Product } from './Product/Product';
import { ProductBuilder } from './Product/test/Product.builder';
import { Type } from './Product/Type';
import { VatProvider } from './VatProvider';
import { VatService } from './VatService';

describe('VatService', () => {
  it('calculates the gross price of a book', async() => {
    //given
    const vatProvider = mock<VatProvider>();
    vatProvider.getVatFor.calledWith(anyString(), any(Type)).mockReturnValue(0.05);

    const serviceToTest = new VatService(vatProvider);
    const product = new ProductBuilder()
      .withNetPrice(20.50)
      .withType(Type.BOOK)
      .build();

    //when
    const grossPrice = serviceToTest.getGrossPrice(product);

    //then
    expect(grossPrice).toEqual(21.53);
  });

  it('calculates the gross prices of the given products', async () => {
    //given
    const vatProvider = mock<VatProvider>();
    vatProvider.getVatFor.calledWith(anyString(), Type.FOOD).mockReturnValue(0.05);
    vatProvider.getVatFor.calledWith(anyString(), Type.CLOTHES).mockReturnValue(0.07);

    const serviceToTest = new VatService(vatProvider);
    const food = new ProductBuilder()
      .withNetPrice(10.75)
      .withType(Type.FOOD)
      .build();

    const clothes = new ProductBuilder()
      .withNetPrice(25.50)
      .withType(Type.CLOTHES)
      .build();

    //when
    const grossPrices = serviceToTest.getGrossPrices(from([food, clothes]));

    // then
    expect(await firstValueFrom(grossPrices)).toEqual(11.29);
    expect(await lastValueFrom(grossPrices)).toEqual(27.29);
  });
});
