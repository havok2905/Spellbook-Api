import { Model } from './Model';

export class ActionModel extends Model {
  public description: string = '';
  public name: string = '';
  public spell_creature_id: string = '';

  constructor(
    description: string,
    name: string,
    spell_creature_id: string,
    created_at?: string,
    updated_at?: string
  ) {
    super(
      created_at,
      updated_at
    );

    this.description = description;
    this.name = name;
    this.spell_creature_id = spell_creature_id;
  }
}