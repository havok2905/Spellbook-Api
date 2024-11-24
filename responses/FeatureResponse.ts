export class FeatureResponse {
  public id: string = '';
  public spellCreatureId: string = '';
  public description: string = '';
  public name: string = '';
  public createdAt?: string;
  public updatedAt?: string;

  constructor (
    id: string,
    spellCreatureId: string,
    description: string,
    name: string,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id;
    this.spellCreatureId = spellCreatureId;
    this.description = description;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public toJson() {
    return {
      id: this.id,
      spellCreatureId: this.spellCreatureId,
      description: JSON.parse(this.description),
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}