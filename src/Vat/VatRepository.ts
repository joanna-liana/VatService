import { from, Observable } from 'rxjs';
import { filter, first, throwIfEmpty } from 'rxjs/operators';

import { Type } from '../Product/Type';
import { Vat } from './Vat';
import { VatNotFoundException } from './VatNotFoundException';

export class VatRepository {
  #vatValues: Set<Vat>;

  constructor() {
    this.#vatValues = new Set<Vat>();
    this.#vatValues.add(new Vat('Poland', Type.BABY, 0.05));
    this.#vatValues.add(new Vat('Poland', Type.BOOK, 0.05));
    this.#vatValues.add(new Vat('Poland', Type.FOOD, 0.08));
    this.#vatValues.add(new Vat('Poland', Type.CLOTHES, 0.23));
    this.#vatValues.add(new Vat('Poland', Type.GAMES, 0.23));
    this.#vatValues.add(new Vat('Poland', Type.SHOES, 0.23));
  }

  getVatFor(country: string, productType: Type): Observable<Vat> {
    return from(this.#vatValues).pipe(
      filter((val) => {
        return val.country === country && val.productType === productType;
      }),
      throwIfEmpty(() => {
        const message = `Vat for country ${country} and product type ${productType} was not found`;
        return new VatNotFoundException(message);
      }),
      first()
    );
  }

  addVatValue(country: string, productType: Type, amount: number): void {
    this.#vatValues.add(new Vat(country, productType, amount));
  }
}
