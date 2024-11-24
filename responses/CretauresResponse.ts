import { CreatureResponse } from './CreatureResponse';

export class CreaturesResponse {
  public creatures: CreatureResponse[] = [];

  constructor(creatures: CreatureResponse[]) {
    this.creatures = creatures;
  }

  public toJson() {
    return this.creatures.map(creature => {
      return creature.toJson();
    });
  }
}