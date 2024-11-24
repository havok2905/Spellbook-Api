export class CastingTimeResponse {
  public id: string = '';
  public actionType: string = '';
  public spellId: string = '';
  public total: number = 0;
  public createdAt?: string;
  public updatedAt?: string;

  constructor (
    id: string,
    actionType: string,
    spellId: string,
    total: number,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id;
    this.actionType = actionType;
    this.spellId = spellId;
    this.total = total;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public toJson() {
    return {
      id: this.id,
      actionType: this.actionType,
      spellId: this.spellId,
      total: this.total,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}