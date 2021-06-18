import { Type } from './Product/Type';

export interface VatProvider {
  getVatFor(country: string, productType: Type): Promise<number>;
}
