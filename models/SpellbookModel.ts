import { Model } from './Model';

export class SpellbookModel extends Model {
  public name: string = '';

  constructor(
    name: string,
    created_at?: string,
    updated_at?: string
  ) {
    super(
      created_at,
      updated_at
    );

    this.name = name;
  }
}