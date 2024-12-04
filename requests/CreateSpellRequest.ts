import { ApiRequest, DescriptionEntity } from './types';

export class CastingTimeRequest implements ApiRequest {
  public actionType: string;
  public total: number;

  constructor(
    actionType: string,
    total: number
  ) {
    this.actionType = actionType;
    this.total = total;
  }

  public validate(): boolean {
    if (
      !this.actionType ||
      typeof this.total !== 'number'
    ) {
      return false;
    }

    return true;
  }
}

export class DurationTimeRequest implements ApiRequest {
  public actionType: string;
  public total: number;

  constructor(
    actionType: string,
    total: number
  ) {
    this.actionType = actionType;
    this.total = total;
  }

  public validate(): boolean {
    if (
      !this.actionType ||
      typeof this.total !== 'number'
    ) {
      return false;
    }

    return true;
  }
}

export class CreatureActionRequest implements ApiRequest {
  public name: string = '';
  public description: DescriptionEntity[] = [];

  constructor(
    name: string,
    description: DescriptionEntity[]
  ) {
    this.name = name;
    this.description = description;
  }

  validate(): boolean {
    if (!this.name || !this.description) {
      return false;
    }

    return true;
  }
}

export class CreatureFeatureRequest implements ApiRequest {
  public name: string = '';
  public description: DescriptionEntity[] = [];

  constructor(
    name: string,
    description: DescriptionEntity[]
  ) {
    this.name = name;
    this.description = description;
  }

  validate(): boolean {
    if (!this.name || !this.description) {
      return false;
    }

    return true;
  }
}

export class CreatureRequest implements ApiRequest {
  public ac: string = '';
  public actions: CreatureActionRequest[];
  public alignment: string = '';
  public cha: number = 0;
  public con: number = 0;
  public conditionImmunities: string = '';
  public cr: string = '';
  public damageImmunities: string = '';
  public damageResistances: string = '';
  public damageVulnerabilities: string = '';
  public dex: number = 0;
  public features: CreatureFeatureRequest[];
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

  constructor(
    ac: string,
    actions:CreatureActionRequest[],
    alignment: string,
    cha: number,
    con: number,
    conditionImmunities: string,
    cr: string,
    damageImmunities: string,
    damageResistances: string,
    damageVulnerabilities: string,
    dex: number,
    features: CreatureFeatureRequest[],
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
    wis: number
  ) {
    this.ac = ac;
    this.actions = actions;
    this.alignment = alignment;
    this.cha = cha;
    this.con = con;
    this.conditionImmunities = conditionImmunities;
    this.cr = cr;
    this.damageImmunities = damageImmunities;
    this.damageResistances = damageResistances;
    this.damageVulnerabilities = damageVulnerabilities;
    this.dex = dex;
    this.features = features;
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
  }

  public validate(): boolean {
    for (let x=0; x<this.actions.length; x++) {
      if (!this.actions[x].validate()) {
        return false;
      }
    }

    for (let x=0; x<this.features.length; x++) {
      if (!this.features[x].validate()) {
        return false;
      }
    }

    if (
      !this.ac ||
      !this.alignment ||
      typeof this.cha !== 'number' ||
      typeof this.con !== 'number' ||
      !this.cr ||
      typeof this.dex !== 'number' ||
      !this.hp ||
      typeof this.int !== 'number' ||
      !this.languages ||
      !this.name ||
      !this.proficiencyBonus ||
      !this.senses ||
      !this.size ||
      !this.speed ||
      typeof this.str !== 'number' ||
      !this.type ||
      typeof this.wis !== 'number'
    ) {
      return false;
    }

    return true;
  }
}

export class CreateSpellRequest implements ApiRequest {
  public castingTimes: CastingTimeRequest[];
  public components: string = '';
  public concentration: boolean = false;
  public creatures: CreatureRequest[];
  public description: DescriptionEntity[] = [];
  public descriptionHigherLevel: DescriptionEntity[] = [];
  public durationTimes: DurationTimeRequest[];
  public level: number = 0;
  public magicSchool: string = '';
  public materials: string = '';
  public name: string = '';
  public range: string = '';
  public ritual: boolean = false;
  public source: string = '';
  public system: string = '';

  constructor(
    castingTimes: CastingTimeRequest[],
    components: string,
    concentration: boolean,
    creatures: CreatureRequest[],
    description: DescriptionEntity[],
    descriptionHigherLevel: DescriptionEntity[],
    durationTimes: DurationTimeRequest[],
    level: number,
    magicSchool: string,
    materials: string,
    name: string,
    range: string,
    ritual: boolean,
    source: string,
    system: string
  ) {
    this.castingTimes = castingTimes;
    this.components = components;
    this.concentration = concentration;
    this.creatures = creatures;
    this.description = description;
    this.descriptionHigherLevel = descriptionHigherLevel;
    this.durationTimes = durationTimes;
    this.level = level;
    this.magicSchool = magicSchool;
    this.materials = materials;
    this.name = name;
    this.range = range;
    this.ritual = ritual;
    this.source = source;
    this.system = system;
  }

  public validate(): boolean {
    if (
      !this.components ||
      typeof this.concentration  !== 'boolean' ||
      typeof this.level !== 'number' ||
      !this.magicSchool ||
      !this.name ||
      !this.range ||
      typeof this.ritual !== 'boolean' ||
      !this.source ||
      !this.system
    ) {
      return false;
    }

    for (let x=0; x<this.creatures.length; x++) {
      if (!this.creatures[x].validate()) {
        return false;
      }
    }

    for (let x=0; x<this.castingTimes.length; x++) {
      if (!this.castingTimes[x].validate()) {
        return false;
      }
    }

    for (let x=0; x<this.durationTimes.length; x++) {
      if (!this.durationTimes[x].validate()) {
        return false;
      }
    }

    try {
      JSON.stringify(this.description);
      JSON.stringify(this.descriptionHigherLevel);
    } catch (error) {
      return false;
    }

    return true;
  }
}