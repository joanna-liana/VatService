import { Type } from '../Product/Type';

export class Vat {
  constructor(
    public country: string,
    public productType: Type,
    public amount: number
  ) {}
}
