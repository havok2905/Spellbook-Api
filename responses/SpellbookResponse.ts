export class SpellbookResponse {
  public id: string = '';
  public name: string = '';
  public createdAt?: string;
  public updatedAt?: string;

  constructor (
    id: string,
    name: string,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public toJson() {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}