import { Model } from './Model';

export class CastingTimeModel extends Model {
  public action_type: string = '';
  public spell_id: string = '';
  public total: number = 0;

  constructor(
    action_type: string,
    spell_id: string,
    total: number,
    created_at?: string,
    updated_at?: string
  ) {
    super(
      created_at,
      updated_at
    );

    this.action_type = action_type;
    this.spell_id = spell_id;
    this.total = total;
  }
}