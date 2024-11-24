import { SpellbookResponse } from './SpellbookResponse';

export class SpellbooksResponse {
  public spellbooks: SpellbookResponse[] = [];

  constructor(spellbooks: SpellbookResponse[]) {
    this.spellbooks = spellbooks;
  }

  public toJson() {
    return this.spellbooks.map(spellbook => {
      return spellbook.toJson();
    });
  }
}