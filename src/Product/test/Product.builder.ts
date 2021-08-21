import faker from 'faker';
import { v4 } from 'uuid';

import { IProduct } from '../Product';
import { Type } from '../Type';

export class ProductBuilder {
  #product: IProduct;

  constructor() {
    this.#product = {
      id: v4(),
      country: 'Poland',
      name: faker.random.words(2),
      netPrice: 10.99,
      type: Type.SHOES
    };
  }

  build(): IProduct {
    return this.#product;
  }


  withId(id: string): ProductBuilder {
    this.#product.id = id;

    return this;
  }

  withName(name: string): ProductBuilder {
    this.#product.name = name;

    return this;
  }

  withType(type: Type): ProductBuilder {
    this.#product.type = type;

    return this;
  }

  withCountry(country: string): ProductBuilder {
    this.#product.country = country;

    return this;
  }

  withNetPrice(netPrice: number): ProductBuilder {
    this.#product.netPrice = netPrice;

    return this;
  }
}
