import { ActionModel } from '../models/ActionModel';
import { CastingTimeModel } from '../models/CastingTimeModel';
import { CreatureModel } from '../models/CreatureModel';
import { DurationTimeModel } from '../models/DurationTimeModel';
import { EntityNotFoundException } from '../exceptions/exceptions';
import { FeatureModel } from '../models/FeatureModel';
import Knex from 'knex';
import { SpellModel } from '../models/SpellModel';

export interface ISpellRepository {
  find(id: string): Promise<SpellModel>;
  findAll(): Promise<SpellModel[]>;
  findBySpellbook(spellbookId: string): Promise<SpellModel[]>;
  findCastingTimes(spellId: string): Promise<CastingTimeModel[]>;
  findCreatures(spellId: string): Promise<CreatureModel[]>;
  findCreatureActions(creatureId: string): Promise<ActionModel[]>;
  findCreatureFeatures(creatureId: string): Promise<FeatureModel[]>;
  findDurationTimes(spellId: string): Promise<DurationTimeModel[]>;
}

export class SpellRepository implements ISpellRepository {
  private knex: Knex.Knex;
  private tableName: string = 'spells';
  private actionsTableName: string = 'spell_creature_actions';
  private castingTimesTableName: string = 'spell_casting_times';
  private creaturesTableName: string = 'spell_creatures';
  private durationTimesTableName: string = 'spell_duration_times';
  private featuresTableName: string = 'spell_creature_features';
  private spellbookSpellsTableName: string = 'spellbook_spells';

  constructor(knex: Knex.Knex) {
    this.knex = knex;
  }

  async find(id: string): Promise<SpellModel> {
    const response = new Promise<SpellModel>((resolve, reject) => {
      this
        .knex(this.tableName)
        .select()
        .where({ id })
        .then(spells => {
          const spell = spells[0];

          if (!spell) {
            throw new EntityNotFoundException('spell');
          }

          const model = this.mapModel(spell);
          resolve(model);
        })
        .catch((error) => {
          console.error(error);
          reject();
        });
    });

    return response;
  }

  async findAll(): Promise<SpellModel[]> {
    const response = new Promise<SpellModel[]>((resolve, reject) => {
      this
        .knex(this.tableName)
        .select()
        .then(spells => {
          const models = spells.map((spell) => {
            return this.mapModel(spell);
          });
          resolve(models);
        })
        .catch((error) => {
          console.error(error);
          reject();
        });
    });

    return response;
  }

  async findBySpellbook(spellbookId: string): Promise<SpellModel[]> {
    const response = new Promise<SpellModel[]>((resolve, reject) => {
      this
        .knex(this.tableName)
        .select(`${this.tableName}.*`)
        .leftJoin(this.spellbookSpellsTableName, `${this.tableName}.id`, `${this.spellbookSpellsTableName}.spell_id`)
        .where(`${this.spellbookSpellsTableName}.spellbook_id`, spellbookId)
        .then(spells => {
          const models = spells.map((spell) => {
            return this.mapModel(spell);
          });
          resolve(models);
        })
        .catch((error) => {
          console.error(error);
          reject();
        });
    });

    return response;
  }

  async findCastingTimes(spellId: string): Promise<CastingTimeModel[]> {
    const response = new Promise<any[]>((resolve, reject) => {
      this
        .knex(this.castingTimesTableName)
        .select()
        .where({ spell_id: spellId })
        .then(castingTimes => {
          const models = castingTimes.map((castingTime) => {
            return this.mapCastingTimeModel(castingTime);
          });
          resolve(models);
        })
        .catch((error) => {
          console.error(error);
          reject();
        });
    });

    return response;
  }

  async findDurationTimes(spellId: string): Promise<DurationTimeModel[]> {
    const response = new Promise<any[]>((resolve, reject) => {
      this
        .knex(this.durationTimesTableName)
        .select()
        .where({ spell_id: spellId })
        .then(durationTimes => {
          const models = durationTimes.map((durationTime) => {
            return this.mapDurationTimeModel(durationTime);
          });
          resolve(models);
        })
        .catch((error) => {
          console.error(error);
          reject();
        });
    });

    return response;
  }

  async findCreatures(spellId: string): Promise<CreatureModel[]> {
    const response = new Promise<any[]>((resolve, reject) => {
      this
        .knex(this.creaturesTableName)
        .select()
        .where({ spell_id: spellId })
        .then(creatures => {
          const models = creatures.map((creature) => {
            return this.mapCreatureModel(creature);
          });
          resolve(models);
        })
        .catch((error) => {
          console.error(error);
          reject();
        });
    });

    return response;
  }

  async findCreatureActions(creatureId: string): Promise<ActionModel[]> {
    const response = new Promise<any[]>((resolve, reject) => {
      this
        .knex(this.actionsTableName)
        .select()
        .where({ spell_creature_id: creatureId })
        .then(actions => {
          const models = actions.map((action) => {
            return this.mapActionModel(action);
          });
          resolve(models);
        })
        .catch((error) => {
          console.error(error);
          reject();
        });
    });

    return response;
  }

  async findCreatureFeatures(creatureId: string): Promise<FeatureModel[]> {
    const response = new Promise<any[]>((resolve, reject) => {
      this
        .knex(this.featuresTableName)
        .select()
        .where({ spell_creature_id: creatureId })
        .then(features => {
          const models = features.map((feature) => {
            return this.mapFeatureModel(feature);
          });
          resolve(models);
        })
        .catch((error) => {
          console.error(error);
          reject();
        });
    });

    return response;
  }

  private mapModel(knexSpellResponse: any): SpellModel {
    const {
      id,
      components,
      concentration,
      description,
      description_higher_level,
      level,
      magic_school,
      materials,
      name,
      range_text,
      ritual,
      source,
      ttrpg_system,
      created_at,
      updated_at
    } = knexSpellResponse;

    const spellModel = new SpellModel(
      components,
      concentration,
      description,
      description_higher_level,
      level,
      magic_school,
      materials,
      name,
      range_text,
      ritual,
      source,
      ttrpg_system,
      created_at,
      updated_at
    );

    spellModel.setId(id);

    return spellModel;
  }

  private mapActionModel(knexActionResponse: any): ActionModel {
    const {
      id,
      spell_creature_id,
      description,
      name,
      created_at,
      updated_at
    } = knexActionResponse;

    const actionModel = new ActionModel(
      description,
      name,
      spell_creature_id,
      created_at,
      updated_at
    );

    actionModel.setId(id);

    return actionModel;
  }

  private mapFeatureModel(knexFeatureResponse: any): FeatureModel {
    const {
      id,
      spell_creature_id,
      description,
      name,
      created_at,
      updated_at
    } = knexFeatureResponse;

    const featureModel = new FeatureModel(
      description,
      name,
      spell_creature_id,
      created_at,
      updated_at
    );

    featureModel.setId(id);

    return featureModel;
  }

  private mapCastingTimeModel(knexCastingTimeResponse: any): CastingTimeModel {
    const {
      id,
      action_type,
      spell_id,
      total,
      created_at,
      updated_at
    } = knexCastingTimeResponse;

    const castingTimeModel = new CastingTimeModel(
      action_type,
      spell_id,
      total,
      created_at,
      updated_at
    );

    castingTimeModel.setId(id);

    return castingTimeModel;
  }

  private mapCreatureModel(knexCreatureResponse: any): CreatureModel {
    const {
      id,
      spell_id,
      ac,
      alignment,
      cha,
      con,
      condition_immunities,
      cr,
      creature_type,
      damage_immunities,
      damage_resistances,
      damage_vulnerabilities,
      dex,
      hp,
      intelligence,
      languages,
      name,
      proficiency_bonus,
      senses,
      size,
      speed,
      str,
      wis,
      created_at,
      updated_at
    } = knexCreatureResponse;

    const creatureModel = new CreatureModel(
      ac,
      alignment,
      cha,
      con,
      condition_immunities,
      cr,
      creature_type,
      damage_immunities,
      damage_resistances,
      damage_vulnerabilities,
      dex,
      hp,
      intelligence,
      languages,
      name,
      proficiency_bonus,
      senses,
      size,
      speed,
      spell_id,
      str,
      wis,
      created_at,
      updated_at
    );

    creatureModel.setId(id);

    return creatureModel;
  }

  private mapDurationTimeModel(knexDurationTimeResponse: any): DurationTimeModel {
    const {
      id,
      action_type,
      spell_id,
      total,
      created_at,
      updated_at
    } = knexDurationTimeResponse;

    const durationTimeModel = new DurationTimeModel(
      action_type,
      spell_id,
      total,
      created_at,
      updated_at
    );

    durationTimeModel.setId(id);

    return durationTimeModel;
  }
}