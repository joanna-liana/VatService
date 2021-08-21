import { firstValueFrom } from 'rxjs';

import { CountryNotSupportedException } from './CountryNotSupportedException';
import { Type } from './Product/Type';
import { VatNotFoundException } from './Vat/VatNotFoundException';
import { VatRepository } from './Vat/VatRepository';
import { VatProvider } from './VatProvider';

export class EuropeanVatProvider implements VatProvider {
  #vatRepository: VatRepository;
  #poland = 'Poland';
  #germany = 'Germany';
  #denmark = 'Denmark';

  constructor(vatRepository: VatRepository) {
    this.#vatRepository = vatRepository;

    this.#registerPolishVat();
    this.#registerGermanVat();
  }
  async getVatFor(country: string, productType: Type): Promise<number> {
    let result: number;

    switch (country) {
    case this.#poland:
      result = await this.#getValueByCountry(this.#poland, productType, 0.23);
      break;
    case this.#germany:
      result = await this.#getValueByCountry(this.#germany, productType, 0.21);
      break;
    case this.#denmark:
      result = await this.#getValueByCountry(this.#denmark, productType, 0.08);
      break;
    default:
      throw new CountryNotSupportedException(
        `This country is not supported: ${country}`
      );
    }
    return result;
  }

  async #getValueByCountry(country: string, productType: Type, defaultVat: number): Promise<number> {
    try {
      const vat = await firstValueFrom(this.#vatRepository.getVatFor(country, productType));
      return vat.amount;
    } catch (err) {
      if (err instanceof VatNotFoundException) {
        return defaultVat;
      }

      throw err;
    }
  }

  #registerPolishVat(): void {
    this.#vatRepository.addVatValue(this.#poland, Type.BABY, 0.05);
    this.#vatRepository.addVatValue(this.#poland, Type.BOOK, 0.08);
  }

  #registerGermanVat(): void {
    this.#vatRepository.addVatValue(this.#germany, Type.BABY, 0.04);
    this.#vatRepository.addVatValue(this.#germany, Type.BOOK, 0.04);
    this.#vatRepository.addVatValue(this.#germany, Type.FOOD, 0.04);
    this.#vatRepository.addVatValue(this.#germany, Type.CLOTHES, 0.1);
  }
}
