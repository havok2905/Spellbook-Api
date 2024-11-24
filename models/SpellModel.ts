import { Model } from './Model';

export class SpellModel extends Model {
  public components: string = '';
  public concentration: boolean = false;
  public description: string = '';
  public description_higher_level: string = '';
  public level: number = 0;
  public magic_school: string = '';
  public materials: string = '';
  public name: string = '';
  public range_text: string = '';
  public ritual: boolean = false;
  public source: string = '';
  public ttrpg_system: string = '';

  constructor(
    components: string,
    concentration: boolean,
    description: string,
    description_higher_level: string,
    level: number,
    magic_school: string,
    materials: string,
    name: string,
    range_text: string,
    ritual: boolean,
    source: string,
    ttrpg_system: string,
    created_at?: string,
    updated_at?: string
  ) {
    super(
      created_at,
      updated_at
    );

    this.components = components;
    this.concentration = concentration;
    this.description = description;
    this.description_higher_level = description_higher_level;
    this.level = level;
    this.magic_school = magic_school;
    this.materials = materials;
    this.name = name;
    this.range_text = range_text;
    this.ritual = ritual;
    this.source = source;
    this.ttrpg_system = ttrpg_system;
  }
}