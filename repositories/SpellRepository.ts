import { ActionModel } from '../models/ActionModel';
import { CastingTimeModel } from '../models/CastingTimeModel';
import { CreateSpellRequest, CreatureRequest } from '../requests/CreateSpellRequest';
import { CreatureModel } from '../models/CreatureModel';
import { DescriptionEntity } from '../responses/types';
import { DurationTimeModel } from '../models/DurationTimeModel';
import { EntityNotFoundException } from '../exceptions/exceptions';
import { FeatureModel } from '../models/FeatureModel';
import Knex from 'knex';
import { SpellModel } from '../models/SpellModel';

export interface ISpellRepository {
  create(createSpellRequest: CreateSpellRequest): Promise<SpellModel>;
  createCastingTime(actionType: string, total: number, spellId: string): Promise<CastingTimeModel>;
  createDurationTime(actionType: string, total: number, spellId: string): Promise<DurationTimeModel>;
  createCreature(createCreatureRequest: CreatureRequest, spellId: string): Promise<CreatureModel>;
  createCreatureAction(name: string, description: DescriptionEntity[], creatureId: string): Promise<ActionModel>;
  createCreatureFeature(name: string, description: DescriptionEntity[], creatureIdspellId: string): Promise<FeatureModel>;
  destroy(id: string): Promise<void>;
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

  async destroy(id: string): Promise<void> {
    const response = new Promise<void>((resolve, reject) => {
      this
        .knex(this.spellbookSpellsTableName)
        .delete()
        .where({ spell_id: id})
        .then(() => {
          this
            .knex(this.castingTimesTableName)
            .delete()
            .where({ spell_id: id })
            .then(() => {
              this
                .knex(this.durationTimesTableName)
                .delete()
                .where({ spell_id: id })
                .then(() => {
                  this
                    .knex(this.tableName)
                    .delete()
                    .where({ id })
                    .then(() => {
                      resolve();
                    })
                    .catch(() => {
                      reject();
                    });
                })
                .catch(() => {
                  reject();
                })
            })
            .catch(() => {
              reject();
            });
        })
        .catch(() => {
          reject();
        });
        
      this
        .knex(this.tableName)
        .delete()
        .where({ id })
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    });

    return response;
  }

  async create(createSpellRequest: CreateSpellRequest): Promise<SpellModel> {
    const spellModel = new SpellModel(
      createSpellRequest.components,
      createSpellRequest.concentration,
      JSON.stringify(createSpellRequest.description),
      JSON.stringify(createSpellRequest.descriptionHigherLevel),
      createSpellRequest.level,
      createSpellRequest.magicSchool,
      createSpellRequest.materials,
      createSpellRequest.name,
      createSpellRequest.range,
      createSpellRequest.ritual,
      createSpellRequest.source,
      createSpellRequest.system,
      new Date().toISOString().slice(0, 19).replace('T', ' ')
    );

    spellModel.generateId();

    const response = new Promise<SpellModel>((resolve, reject) => {
      this
        .knex(this.tableName)
        .insert({
          id: spellModel.getId(),
          components: spellModel.components,
          concentration: spellModel.concentration,
          description: spellModel.description,
          description_higher_level: spellModel.description_higher_level,
          level: spellModel.level,
          magic_school: spellModel.magic_school,
          materials: spellModel.materials,
          name: spellModel.name,
          range_text: spellModel.range_text,
          ritual: spellModel.ritual,
          source: spellModel.source,
          ttrpg_system: spellModel.ttrpg_system,
          created_at: spellModel.created_at
        })
        .then(() => {
          resolve(spellModel);
        })
        .catch(() => {
          reject();
        });
    });

    return response;
  }

  async createCastingTime(
    actionType: string,
    total: number,
    spellId: string
  ): Promise<CastingTimeModel> {
    const castingTimeModel = new CastingTimeModel(
      actionType,
      spellId,
      total,
      new Date().toISOString().slice(0, 19).replace('T', ' ')
    );

    castingTimeModel.generateId();

    const response = new Promise<CastingTimeModel>((resolve, reject) => {
      this
      .knex(this.castingTimesTableName)
      .insert({
        id: castingTimeModel.getId(),
        action_type: castingTimeModel.action_type,
        spell_id: castingTimeModel.spell_id,
        total: castingTimeModel.total,
        created_at: castingTimeModel.created_at
      })
      .then(() => {
        resolve(castingTimeModel);
      })
      .catch(() => {
        reject();
      });
    });

    return response;
  }

  async createDurationTime(
    actionType: string,
    total: number,
    spellId: string
  ): Promise<DurationTimeModel> {
    const durationTimeModel = new DurationTimeModel(
      actionType,
      spellId,
      total,
      new Date().toISOString().slice(0, 19).replace('T', ' ')
    );

    durationTimeModel.generateId();

    const response = new Promise<CastingTimeModel>((resolve, reject) => {
      this
      .knex(this.durationTimesTableName)
      .insert({
        id: durationTimeModel.getId(),
        action_type: durationTimeModel.action_type,
        spell_id: durationTimeModel.spell_id,
        total: durationTimeModel.total,
        created_at: durationTimeModel.created_at
      })
      .then(() => {
        resolve(durationTimeModel);
      })
      .catch(() => {
        reject();
      });
    });

    return response;
  }

  async createCreatureAction(
    name: string,
    description: DescriptionEntity[],
    creatureId: string
  ): Promise<ActionModel> {
    const actionModel = new ActionModel(
      JSON.stringify(description),
      name,
      creatureId,
      new Date().toISOString().slice(0, 19).replace('T', ' ')
    );

    actionModel.generateId();

    const response = new Promise<ActionModel>((resolve, reject) => {
      this
        .knex(this.actionsTableName)
        .insert({
          id: actionModel.getId(),
          description: actionModel.description,
          name: actionModel.name,
          spell_creature_id: actionModel.spell_creature_id,
          created_at: actionModel.created_at
        })
        .then(() => {
          resolve(actionModel);
        })
        .catch(() => {
          reject();
        });
    });

    return response;
  }

  async createCreatureFeature(
    name: string,
    description: DescriptionEntity[],
    creatureId: string
  ): Promise<FeatureModel> {
    const featureModel = new FeatureModel(
      JSON.stringify(description),
      name,
      creatureId,
      new Date().toISOString().slice(0, 19).replace('T', ' ')
    );

    featureModel.generateId();

    const response = new Promise<FeatureModel>((resolve, reject) => {
      this
        .knex(this.actionsTableName)
        .insert({
          id: featureModel.getId(),
          description: featureModel.description,
          name: featureModel.name,
          spell_creature_id: featureModel.spell_creature_id,
          created_at: featureModel.created_at
        })
        .then(() => {
          resolve(featureModel);
        })
        .catch(() => {
          reject();
        });
    });

    return response;
  }

  async createCreature(createCreatureRequest: CreatureRequest, spellId: string): Promise<CreatureModel> {
    const creatureModel = new CreatureModel(
      createCreatureRequest.ac,
      createCreatureRequest.alignment,
      createCreatureRequest.cha,
      createCreatureRequest.con,
      createCreatureRequest.conditionImmunities,
      createCreatureRequest.cr,
      createCreatureRequest.type,
      createCreatureRequest.damageImmunities,
      createCreatureRequest.damageResistances,
      createCreatureRequest.damageVulnerabilities,
      createCreatureRequest.dex,
      createCreatureRequest.hp,
      createCreatureRequest.int,
      createCreatureRequest.languages,
      createCreatureRequest.name,
      createCreatureRequest.proficiencyBonus,
      createCreatureRequest.senses,
      createCreatureRequest.size,
      createCreatureRequest.speed,
      spellId,
      createCreatureRequest.str,
      createCreatureRequest.wis,
      new Date().toISOString().slice(0, 19).replace('T', ' ')
    );

    creatureModel.generateId();

    const response = new Promise<CreatureModel>((resolve, reject) => {
      this
        .knex(this.creaturesTableName)
        .insert({
          id: creatureModel.getId(),
          ac: creatureModel.ac,
          alignment: creatureModel.alignment,
          cha: creatureModel.cha,
          con: creatureModel.con,
          condition_immunities: creatureModel.condition_immunities,
          cr: creatureModel.cr,
          creature_type: creatureModel.creature_type,
          damage_immunities: creatureModel.damage_immunities,
          damage_resistances: creatureModel.damage_resistances,
          damage_vulnerabilities: creatureModel.damage_vulnerabilities,
          dex: creatureModel.dex,
          hp: creatureModel.hp,
          intelligence: creatureModel.intelligence,
          languages: creatureModel.languages,
          name: creatureModel.name,
          proficiency_bonus: creatureModel.proficiency_bonus,
          senses: creatureModel.senses,
          size: creatureModel.size,
          speed: creatureModel.speed,
          spell_id: creatureModel.spell_id,
          str: creatureModel.str,
          wis: creatureModel.wis,
          created_at: creatureModel.created_at
        })
        .then(() => {
          resolve(creatureModel);
        })
        .catch(() => {
          reject();
        });
    });

    return response;
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
        .catch(() => {
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
        .catch(() => {
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
        .catch(() => {
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
        .catch(() => {
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
        .catch(() => {
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
        .catch(() => {
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
        .catch(() => {
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
        .catch(() => {
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