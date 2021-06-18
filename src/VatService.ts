import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from './Product/Product';
import { VatProvider } from './VatProvider';

export class VatService {
  #vatProvider: VatProvider;

  constructor(vatProvider: VatProvider) {
    this.#vatProvider = vatProvider;
  }

  async getGrossPrice(product: Product): Promise<number> {
    const vatValue = await this.#vatProvider.getVatFor(product.country, product.type);

    return this.#calculateGrossPrice(product.netPrice, vatValue);
  }

  async getGrossPrices(products: Observable<Product>): Promise<Observable<Promise<number>>> {
    return products.pipe(
      map(async ({ country, type, netPrice }) => {
        const vatValue = await this.#vatProvider.getVatFor(country, type);
        return this.#calculateGrossPrice(netPrice, vatValue);
      })
    );
  }

  #calculateGrossPrice(netPrice: number, vatValue: number): number {
    return parseFloat((netPrice * (1 + vatValue)).toFixed(2));
  }
}
