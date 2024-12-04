import {
  CastingTimeRequest,
  CreateSpellRequest,
  CreatureActionRequest,
  CreatureRequest,
  DurationTimeRequest
} from './requests/CreateSpellRequest';
import cors from 'cors';
import { CreateSpellbookRequest } from './requests/CreateSpellbookRequest';
import { DescriptionEntity } from './requests/types';
import { errorHandler } from './middleware/errorHandler';
import express from 'express';
import Knex from 'knex';
import knexConfig from './knexfile';
import { SpellController } from './controllers/SpellController';
import { SpellRepository } from './repositories/SpellRepository';
import { SpellbookController } from './controllers/SpellbookController';
import { SpellbookRepository } from './repositories/SpellbookRepository';

const app = express();
const port = 4000;

const knex = Knex(knexConfig.development);

app.use(cors());
app.use(express.json());

app.get('/', (_request, response) => {
  response.send({});
});

app.get('/spells', async (_request, response, next) => {
  try {
    const spellRepository = new SpellRepository(knex);
    const spellController = new SpellController(spellRepository);
    const spellsResponse = await spellController.get();
    response.send(spellsResponse.toJson());
  } catch(error) {
    next(error);
  }
});

app.get('/spells/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const spellRepository = new SpellRepository(knex);
    const spellController = new SpellController(spellRepository);
    const spellResponse = await spellController.find(id);
    response.send(spellResponse.toJson());
  } catch(error) {
    next(error);
  }
});

app.delete('/spells/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const spellRepository = new SpellRepository(knex);
    const spellController = new SpellController(spellRepository);
    await spellController.destroy(id);
    response.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.post('/spells', async (request, response, next) => {
  try {
    const {
      castingTimes,
      components,
      concentration,
      creatures,
      description,
      descriptionHigherLevel,
      durationTimes,
      level,
      magicSchool,
      materials,
      name,
      range,
      ritual,
      source,
      system
    } = request.body;

    const castingTimesRequests = castingTimes.map((castingTime: { actionType: string, total: number }) => {
      const { actionType, total } = castingTime;
      return new CastingTimeRequest(actionType, total);
    });

    const durationTimesRequests = durationTimes.map((durationTime: { actionType: string, total: number }) => {
      const { actionType, total } = durationTime;
      return new DurationTimeRequest(actionType, total);
    });

    const creaturesRequests = creatures.map((creature: {
      ac: string;
      actions: Array<{
        name: string;
        description: DescriptionEntity[]
      }>;
      alignment: string;
      cha: number;
      con: number;
      conditionImmunities: string;
      cr: string;
      damageImmunities: string;
      damageResistances: string;
      damageVulnerabilities: string;
      dex: number;
      features: Array<{
        name: string;
        description: DescriptionEntity[]
      }>;
      hp: string;
      int: number;
      languages: string;
      name: string;
      proficiencyBonus: string;
      senses: string;
      size: string;
      speed: string;
      str: number;
      type: string;
      wis: number;
    }) => {
      const {
        ac,
        actions,
        alignment,
        cha,
        con,
        conditionImmunities,
        cr,
        damageImmunities,
        damageResistances,
        damageVulnerabilities,
        dex,
        features,
        hp,
        int,
        languages,
        name,
        proficiencyBonus,
        senses,
        size,
        speed,
        str,
        type,
        wis
      } = creature;

      const creatureActionRequests = actions.map((action) => {
        const { name, description } = action;
        return new CreatureActionRequest(name, description);
      });

      const creatureFeatureRequests = features.map((action) => {
        const { name, description } = action;
        return new CreatureActionRequest(name, description);
      });

      return new CreatureRequest(
        ac,
        creatureActionRequests,
        alignment,
        cha,
        con,
        conditionImmunities,
        cr,
        damageImmunities,
        damageResistances,
        damageVulnerabilities,
        dex,
        creatureFeatureRequests,
        hp,
        int,
        languages,
        name,
        proficiencyBonus,
        senses,
        size,
        speed,
        str,
        type,
        wis
      );
    });

    const createSpellRequest = new CreateSpellRequest(
      castingTimesRequests,
      components.join(''),
      concentration,
      creaturesRequests,
      description,
      descriptionHigherLevel,
      durationTimesRequests,
      level,
      magicSchool,
      materials,
      name,
      range,
      ritual,
      source,
      system
    );
    
    const spellRepository = new SpellRepository(knex);
    const spellController = new SpellController(spellRepository);
    const spellResponse = await spellController.create(createSpellRequest);
    response.send(spellResponse.toJson());
  } catch(error) {
    next(error);
  }
});

app.get('/spellbooks', async (_request, response, next) => {
  try {
    const spellRepository = new SpellRepository(knex);
    const spellbooksRepository = new SpellbookRepository(knex);
    const spellbookController = new SpellbookController(spellRepository, spellbooksRepository);
    const spellbooksResponse = await spellbookController.get();
    response.send(spellbooksResponse.toJson());
  } catch(error) {
    next(error);
  }
});

app.post('/spellbooks', async (request, response, next) => {
  try {
    const { name } = request.body;
    const createSpellbookRequest = new CreateSpellbookRequest(name);
    const spellbooksRepository = new SpellbookRepository(knex);
    const spellRepository = new SpellRepository(knex);
    const spellbookController = new SpellbookController(spellRepository, spellbooksRepository);
    const spellbookResponse = await spellbookController.create(createSpellbookRequest);
    response.send(spellbookResponse.toJson());
  } catch (error) {
    next(error);
  }
});

app.delete('/spellbooks/:id/removeSpell/:spellId', async (request, response, next) => {
  try {
    const { id, spellId } = request.params;
    const spellbooksRepository = new SpellbookRepository(knex);
    const spellRepository = new SpellRepository(knex);
    const spellbookController = new SpellbookController(spellRepository, spellbooksRepository);
    await spellbookController.removeSpell(id, spellId);
    response.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.post('/spellbooks/:id/addSpell/:spellId', async (request, response, next) => {
  try {
    const { id, spellId } = request.params;
    const spellbooksRepository = new SpellbookRepository(knex);
    const spellRepository = new SpellRepository(knex);
    const spellbookController = new SpellbookController(spellRepository, spellbooksRepository);
    await spellbookController.addSpell(id, spellId);
    response.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.delete('/spellbooks/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const spellbooksRepository = new SpellbookRepository(knex);
    const spellRepository = new SpellRepository(knex);
    const spellbookController = new SpellbookController(spellRepository, spellbooksRepository);
    await spellbookController.destroy(id);
    response.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.get('/spellbooks/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const spellbooksRepository = new SpellbookRepository(knex);
    const spellRepository = new SpellRepository(knex);
    const spellbookController = new SpellbookController(spellRepository, spellbooksRepository);
    const spellbookResponse = await spellbookController.find(id);
    response.send(spellbookResponse.toJson());
  } catch(error) {
    next(error);
  }
});

app.get('/spellbooks/:id/spells', async (request, response, next) => {
  try {
    const id = request.params.id;
    const spellRepository = new SpellRepository(knex);
    const spellController = new SpellController(spellRepository);
    const spellResponse = await spellController.getBySpellbook(id);
    response.send(spellResponse.toJson());
  } catch(error) {
    next(error);
  }
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
