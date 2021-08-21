import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProduct } from './Product/Product';
import { VatProvider } from './VatProvider';

export class VatService {
  #vatProvider: VatProvider;

  constructor(vatProvider: VatProvider) {
    this.#vatProvider = vatProvider;
  }

  getGrossPrice(product: IProduct): number {
    const vatValue = this.#vatProvider.getVatFor(product.country, product.type);

    return this.#calculateGrossPrice(product.netPrice, vatValue);
  }

  getGrossPrices(products: Observable<IProduct>): Observable<number> {
    return products.pipe(
      map(p => {
        const vatValue = this.#vatProvider.getVatFor(p.country, p.type);
        return this.#calculateGrossPrice(p.netPrice, vatValue);
      })
    );
  }

  #calculateGrossPrice(netPrice: number, vatValue: number): number {
    return parseFloat((netPrice * (1 + vatValue)).toFixed(2));
  }
}
