import { ActionsResponse } from './ActionsResponse';
import { FeaturesResponse } from './FeaturesResponse';

export class CreatureResponse {
  public actions?: ActionsResponse;
  public features?: FeaturesResponse;
  public id: string = '';
  public spellId: string = '';
  public ac: string = '';
  public alignment: string = '';
  public cha: number = 0;
  public con: number = 0;
  public conditionImmunities: string = '';
  public cr: string = '';
  public damageImmunities: string = '';
  public damageResistances: string = '';
  public damageVulnerabilities: string = '';
  public dex: number = 0;
  public hp: string = '';
  public int: number = 0;
  public languages: string = '';
  public name: string = '';
  public proficiencyBonus: string = '';
  public senses: string = '';
  public size: string = '';
  public speed: string = '';
  public str: number = 0;
  public type: string = '';
  public wis: number = 0;
  public createdAt?: string;
  public updatedAt?: string;

  constructor (
    id: string,
    spellId: string,
    ac: string,
    alignment: string,
    cha: number,
    con: number,
    conditionImmunities: string,
    cr: string,
    damageImmunities: string,
    damageResistances: string,
    damageVulnerabilities: string,
    dex: number,
    hp: string,
    int: number,
    languages: string,
    name: string,
    proficiencyBonus: string,
    senses: string,
    size: string,
    speed: string,
    str: number,
    type: string,
    wis: number,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id;
    this.spellId = spellId;
    this.ac = ac;
    this.alignment = alignment;
    this.cha = cha;
    this.con = con;
    this.conditionImmunities = conditionImmunities;
    this.cr = cr;
    this.damageImmunities = damageImmunities;
    this.damageResistances = damageResistances;
    this.damageVulnerabilities = damageVulnerabilities;
    this.dex = dex;
    this.hp = hp;
    this.int = int;
    this.languages = languages;
    this.name = name;
    this.proficiencyBonus = proficiencyBonus;
    this.senses = senses;
    this.size = size;
    this.speed = speed;
    this.str = str;
    this.type = type;
    this.wis = wis;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public toJson() {
    return {
      id: this.id,
      spellId: this.spellId,
      ac: this.ac,
      actions: this.actions?.toJson() ?? [],
      alignment: this.alignment,
      cha: this.cha,
      con: this.con,
      conditionImmunities: this.conditionImmunities,
      cr: this.cr,
      damageImmunities: this.damageImmunities,
      damageResistances: this.damageResistances,
      damageVulnerabilities: this.damageVulnerabilities,
      dex: this.dex,
      features: this.features?.toJson() ?? [],
      hp: this.hp,
      int: this.int,
      languages: this.languages,
      name: this.name,
      proficiencyBonus: this.proficiencyBonus,
      senses: this.senses,
      size: this.size,
      speed: this.speed,
      str: this.str,
      type: this.type,
      wis: this.wis,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}