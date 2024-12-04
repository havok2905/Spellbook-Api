import { ActionModel } from '../models/ActionModel';
import { ActionResponse } from '../responses/ActionResponse';
import { ActionsResponse } from '../responses/ActionsResponse';
import { BadArgumentException } from '../exceptions/exceptions';
import { CastingTimeModel } from '../models/CastingTimeModel';
import { CastingTimeResponse } from '../responses/CastingTimeResponse';
import { CastingTimesResponse } from '../responses/CastingTimesResponse';
import { CreateSpellRequest } from '../requests/CreateSpellRequest';
import { CreatureModel } from '../models/CreatureModel';
import { CreatureResponse } from '../responses/CreatureResponse';
import { CreaturesResponse } from '../responses/CretauresResponse';
import { DurationTimeModel } from '../models/DurationTimeModel';
import { DurationTimeResponse } from '../responses/DurationTimeResponse';
import { DurationTimesResponse } from '../responses/DurationTimesResponse';
import { FeatureModel } from '../models/FeatureModel';
import { FeatureResponse } from '../responses/FeatureResponse';
import { FeaturesResponse } from '../responses/FeaturesResponse';
import { ISpellRepository } from '../repositories/SpellRepository';
import { SpellModel } from '../models/SpellModel';
import { SpellResponse } from '../responses/SpellResponse';
import { SpellsResponse } from '../responses/SpellsResponse';

export class SpellController {
  private spellRepository: ISpellRepository;

  constructor(spellRepository: ISpellRepository) {
    this.spellRepository = spellRepository;
  }

  async create(createSpellRequest: CreateSpellRequest): Promise<SpellResponse> {
    if (!createSpellRequest.validate()) {
      throw new BadArgumentException();
    }

    const spell = await this.spellRepository.create(createSpellRequest);

    const response = await this.getSpellResponse(spell);
    const castingTimesResponse = new CastingTimesResponse([]);
    const durationTimesResponse = new DurationTimesResponse([]);
    const creaturesResponse = new CreaturesResponse([]);

    for(let x=0; x<createSpellRequest.creatures.length; x++) {
      const creature = createSpellRequest.creatures[x];
      const creatureModel = await this.spellRepository.createCreature(
        creature,
        spell.getId()
      );

      const actionsResponse = new ActionsResponse([]);
      const featuresResponse = new FeaturesResponse([]);

      for(let y=0; y<creature.actions.length; y++) {
        const action = creature.actions[y];
        const actionModel = await this.spellRepository.createCreatureAction(
          action.name,
          action.description,
          creatureModel.getId()
        );

        const actionResponse = this.mapActionModelToResponse(actionModel);

        actionsResponse.actions.push(actionResponse);
      }

      for(let y=0; y<creature.features.length; y++) {
        const feature = creature.features[y];
        const featureModel = await this.spellRepository.createCreatureFeature(
          feature.name,
          feature.description,
          creatureModel.getId()
        );

        const featureResponse = this.mapFeatureModelToResponse(featureModel);

        featuresResponse.features.push(featureResponse);
      }

      const creatureResponse = this.mapCreatureModelToResponse(creatureModel);

      creatureResponse.actions = actionsResponse;
      creatureResponse.features = featuresResponse;
      creaturesResponse.creatures.push(creatureResponse);
    }

    for(let x=0; x<createSpellRequest.castingTimes.length; x++) {
      const castingTime = createSpellRequest.castingTimes[x];
      const castingTimeModel = await this.spellRepository.createCastingTime(
        castingTime.actionType,
        castingTime.total,
        spell.getId()
      );

      castingTimesResponse.castingTimes.push(this.mapCastingTimeModelToResponse(castingTimeModel));
    }

    for(let x=0; x<createSpellRequest.durationTimes.length; x++) {
      const durationTime = createSpellRequest.durationTimes[x];
      const durationTimeModel = await this.spellRepository.createDurationTime(
        durationTime.actionType,
        durationTime.total,
        spell.getId()
      );

      durationTimesResponse.durationTimes.push(this.mapDurationTimeModelToResponse(durationTimeModel));
    }

    return response;
  }

  async destroy(id: string): Promise<void> {
    if (!id) {
      throw new BadArgumentException();
    }

    await this.spellRepository.find(id);
    await this.spellRepository.destroy(id);
  }

  async get(): Promise<SpellsResponse> {
    const spells = await this.spellRepository.findAll();
    const response = new SpellsResponse([]);

    for(let x=0; x<spells.length; x++) {
      const spell = spells[x];
      const spellResponse = await this.getSpellResponse(spell);
      response.spells.push(spellResponse);
    }

    return response;
  }

  async getBySpellbook(spellbookId: string): Promise<SpellsResponse> {
    const spells = await this.spellRepository.findBySpellbook(spellbookId);
    const response = new SpellsResponse([]);

    for(let x=0; x<spells.length; x++) {
      const spell = spells[x];
      const spellResponse = await this.getSpellResponse(spell);
      response.spells.push(spellResponse);
    }

    return response;
  }

  async find(id: string): Promise<SpellResponse> {
    if (!id) {
      throw new BadArgumentException();
    }

    const spell = await this.spellRepository.find(id);
    const response = await this.getSpellResponse(spell);
    return response;
  }

  private async getSpellResponse(spell: SpellModel): Promise<SpellResponse> {
    const castingTimes = await this.spellRepository.findCastingTimes(spell.getId());
    const castingTimesResponse = new CastingTimesResponse(castingTimes.map(this.mapCastingTimeModelToResponse));

    const durationTimes = await this.spellRepository.findDurationTimes(spell.getId());
    const durationTimesResponse = new DurationTimesResponse(durationTimes.map(this.mapDurationTimeModelToResponse));

    const creatures = await this.spellRepository.findCreatures(spell.getId());
    const creaturesResponse = new CreaturesResponse([]);

    for(let y=0; y<creatures.length; y++) {
      const creature = creatures[y];

      const actions = await this.spellRepository.findCreatureActions(creature.getId());
      const features = await this.spellRepository.findCreatureFeatures(creature.getId());

      const actionsResponse = new ActionsResponse(actions.map(this.mapActionModelToResponse));
      const featuresResponse = new FeaturesResponse(features.map(this.mapFeatureModelToResponse));

      const creatureResponse = this.mapCreatureModelToResponse(creature);

      creatureResponse.actions = actionsResponse;
      creatureResponse.features = featuresResponse;

      creaturesResponse.creatures.push(creatureResponse);
    }

    const spellResponse = this.mapSpellModelToResponse(spell);

    spellResponse.castingTimes = castingTimesResponse;
    spellResponse.durationTimes = durationTimesResponse;
    spellResponse.creatures = creaturesResponse;

    return spellResponse;
  }

  private mapActionModelToResponse(action: ActionModel): ActionResponse {
    const {
      description,
      name,
      spell_creature_id,
      created_at,
      updated_at
    } = action;

    return new ActionResponse(
      action.getId(),
      spell_creature_id,
      description,
      name,
      created_at,
      updated_at
    );
  }

  private mapFeatureModelToResponse(feature: FeatureModel): FeatureResponse {
    const {
      description,
      name,
      spell_creature_id,
      created_at,
      updated_at
    } = feature;

    return new FeatureResponse(
      feature.getId(),
      spell_creature_id,
      description,
      name,
      created_at,
      updated_at
    );
  }

  private mapCastingTimeModelToResponse(castingTime: CastingTimeModel): CastingTimeResponse {
    const {
      action_type,
      spell_id,
      total,
      created_at,
      updated_at
    } = castingTime;

    return new CastingTimeResponse(
      castingTime.getId(),
      action_type,
      spell_id,
      total,
      created_at,
      updated_at
    )
  }

  private mapCreatureModelToResponse(creature: CreatureModel): CreatureResponse {
    const {
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
    } = creature;

    return new CreatureResponse(
      creature.getId(),
      spell_id,
      ac,
      alignment,
      cha,
      con,
      condition_immunities,
      cr,
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
      creature_type,
      wis,
      created_at,
      updated_at
    );
  }

  private mapDurationTimeModelToResponse(durationTime: DurationTimeModel): DurationTimeResponse {
    const {
      action_type,
      spell_id,
      total,
      created_at,
      updated_at
    } = durationTime;

    return new DurationTimeResponse(
      durationTime.getId(),
      action_type,
      spell_id,
      total,
      created_at,
      updated_at
    )
  }

  private mapSpellModelToResponse(spell: SpellModel): SpellResponse {
    const {
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
    } = spell;

    return new SpellResponse(
      spell.getId(),
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
  }
}