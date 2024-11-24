import { SpellResponse } from './SpellResponse';

export class SpellsResponse {
  public spells: SpellResponse[] = [];

  constructor(spells: SpellResponse[]) {
    this.spells = spells;
  }

  public toJson() {
    return this.spells.map(spell => {
      return spell.toJson();
    });
  }
}