import { Model } from './Model';

export class CreatureModel extends Model {
  public ac: string = '';
  public alignment: string = '';
  public cha: number = 0;
  public con: number = 0;
  public condition_immunities: string = '';
  public cr: string = '';
  public creature_type: string = '';
  public damage_immunities: string = '';
  public damage_resistances: string = '';
  public damage_vulnerabilities: string = '';
  public dex: number = 0;
  public hp: string = '';
  public intelligence: number = 0;
  public languages: string = '';
  public name: string = '';
  public proficiency_bonus: string = '';
  public senses: string = '';
  public size: string = '';
  public speed: string = '';
  public spell_id: string = '';
  public str: number = 0;
  public wis: number = 0;

  constructor(
    ac: string,
    alignment: string,
    cha: number,
    con: number,
    condition_immunities: string,
    cr: string,
    creature_type: string,
    damage_immunities: string,
    damage_resistances: string,
    damage_vulnerabilities: string,
    dex: number,
    hp: string,
    intelligence: number,
    languages: string,
    name: string,
    proficiency_bonus: string,
    senses: string,
    size: string,
    speed: string,
    spell_id: string,
    str: number,
    wis: number,
    created_at?: string,
    updated_at?: string
  ) {
    super(
      created_at,
      updated_at
    );

    this.ac = ac;
    this.alignment = alignment;
    this.cha = cha;
    this.con = con;
    this.condition_immunities = condition_immunities;
    this.cr = cr;
    this.creature_type = creature_type;
    this.damage_immunities = damage_immunities;
    this.damage_resistances = damage_resistances;
    this.damage_vulnerabilities = damage_vulnerabilities;
    this.dex = dex;
    this.hp = hp;
    this.intelligence = intelligence;
    this.languages = languages;
    this.name = name;
    this.proficiency_bonus = proficiency_bonus;
    this.senses = senses;
    this.size = size;
    this.speed = speed;
    this.spell_id = spell_id;
    this.str = str;
    this.wis = wis;
  }
}