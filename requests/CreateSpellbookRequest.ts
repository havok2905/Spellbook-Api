import { ApiRequest } from './types';

export class CreateSpellbookRequest implements ApiRequest {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  public validate(): boolean {
    if (!this.name) {
      return false;
    }

    return true;
  }
}