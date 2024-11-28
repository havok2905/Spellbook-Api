import { Model } from './Model';

export class SpellbookSpellModel extends Model {
  public spell_id: string = '';
  public spellbook_id: string = '';

  constructor(
    spell_id: string,
    spellbook_id: string,
    created_at?: string,
    updated_at?: string
  ) {
    super(
      created_at,
      updated_at
    );

    this.spell_id = spell_id;
    this.spellbook_id = spellbook_id;
  }
}