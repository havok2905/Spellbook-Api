import { v4 as uuidv4 } from 'uuid';

export class Model {
  private id: string = '';
  public created_at?: string;
  public updated_at?: string;

  constructor(
    created_at?: string,
    updated_at?: string
  ) {
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  generateId() {
    this.id = uuidv4();
  }

  getId(): string {
    return this.id;
  }

  setId(id: string) {
    this.id = id;
  }
}
