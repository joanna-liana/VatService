import { CountryNotSupportedException } from './CountryNotSupportedException';
import { Type } from './Product/Type';
import { VatProvider } from './VatProvider';

export class EuropeanVatProvider implements VatProvider {
  getVatFor(country: string, productType: Type): number {
    let result: number;

    switch (country) {
    case 'Poland':
      result = this.#getPolishVatFor(productType);
      break;
    case 'Germany':
      result = this.#getGermanVatFor(productType);
      break;
    case 'Denmark':
      result = 0.08;
      break;
    default:
      throw new CountryNotSupportedException(
        `This country is not supported: ${country}`
      );
    }
    return result;
  }

  #getPolishVatFor(productType: Type): number {
    let result: number;

    if ([Type.BABY, Type.BOOK].includes(productType)) {
      result = 0.05;
    } else if (productType === Type.FOOD) {
      result = 0.08;
    } else {
      result = 0.23;
    }

    return result;
  }

  #getGermanVatFor(productType: Type): number {
    let result: number;

    if ([Type.BABY, Type.BOOK, Type.FOOD].includes(productType)) {
      result = 0.04;
    } else if (productType === Type.CLOTHES) {
      result = 0.1;
    } else {
      result = 0.21;
    }

    return result;
  }
}
