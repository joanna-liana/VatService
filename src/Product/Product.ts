import { Type } from './Type';

export interface IProduct {
  id: string;
  name: string;
  netPrice: number;
  type: Type;
  country: string;
}

export class Product implements IProduct {
  #id: string;
  #name: string;
  #netPrice: number;
  #type: Type;
  #country: string;

  constructor(
    id: string,
    name: string,
    netPrice: number,
    type: Type,
    country: string
  ) {
    this.#id = id;
    this.#name = name;
    this.#netPrice = netPrice;
    this.#type = type;
    this.#country = country;
  }

  get id(): string {
    return this.#id;
  }

  get name(): string {
    return this.#name;
  }

  get netPrice(): number {
    return this.#netPrice;
  }

  get type(): Type {
    return this.#type;
  }

  get country(): string {
    return this.#country;
  }
}
