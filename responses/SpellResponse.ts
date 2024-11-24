import { CastingTimesResponse } from './CastingTimesResponse';
import { CreaturesResponse } from './CretauresResponse';
import { DescriptionEntity } from './types';
import { DurationTimesResponse } from './DurationTimesResponse';


export class SpellResponse {
  public castingTimes?: CastingTimesResponse;
  public durationTimes?: DurationTimesResponse;
  public creatures?: CreaturesResponse;
  public id: string = '';
  public components: string = '';
  public concentration: boolean = false;
  public description: string = '';
  public descriptionHigherLevel: string = '';
  public level: number = 0;
  public magicSchool: string = '';
  public materials: string = '';
  public name: string = '';
  public range: string = '';
  public ritual: boolean = false;
  public source: string = '';
  public system: string = '';
  public createdAt?: string;
  public updatedAt?: string;

  constructor (
    id: string,
    components: string,
    concentration: boolean,
    description: string,
    descriptionHigherLevel: string,
    level: number,
    magicSchool: string,
    materials: string,
    name: string,
    range: string,
    ritual: boolean,
    source: string,
    system: string,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id;
    this.components = components;
    this.concentration = concentration;
    this.description = description;
    this.descriptionHigherLevel = descriptionHigherLevel;
    this.level = level;
    this.magicSchool = magicSchool;
    this.materials = materials;
    this.name = name;
    this.range = range;
    this.ritual = ritual;
    this.source = source;
    this.system = system;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public toJson() {
    return {
      id: this.id,
      castingTimes: this.castingTimes?.toJson() ?? [],
      creatures: this.creatures?.toJson() ?? [],
      durationTimes: this.durationTimes?.toJson() ?? [],
      components: this.components.split(''),
      concentration: this.concentration,
      description: JSON.parse(this.description) as DescriptionEntity,
      descriptionHigherLevel: JSON.parse(this.descriptionHigherLevel) as DescriptionEntity,
      level: this.level,
      magicSchool: this.magicSchool,
      materials: this.materials,
      name: this.name,
      range: this.range,
      ritual: this.ritual,
      source: this.source,
      system: this.system,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}