import { ApiRequest } from './types';

export interface DescriptionOrderedListEntity {
  type: 'description-ordered-list-entity',
  items: string[];
}

export interface DescriptionUnorderedListEntity {
  type: 'description-unordered-list-entity',
  items: string[];
}

export type DescriptionEntity =
  DescriptionOrderedListEntity |
  DescriptionUnorderedListEntity |
  string;

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

export class CreateSpellRequest implements ApiRequest {
  public castingTimes: CastingTimeRequest[];
  public components: string = '';
  public concentration: boolean = false;
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