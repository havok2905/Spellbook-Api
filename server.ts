import cors from 'cors';
import { CreateSpellbookRequest } from './requests/CreateSpellbookRequest';
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

app.get('/spellbooks', async (_request, response, next) => {
  try {
    const spellbooksRepository = new SpellbookRepository(knex);
    const spellbookController = new SpellbookController(spellbooksRepository);
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
    const spellbookController = new SpellbookController(spellbooksRepository);
    const spellbookResponse = await spellbookController.create(createSpellbookRequest);
    response.send(spellbookResponse.toJson());
  } catch (error) {
    next(error);
  }
});

app.delete('/spellbooks/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const spellbooksRepository = new SpellbookRepository(knex);
    const spellbookController = new SpellbookController(spellbooksRepository);
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
    const spellbookController = new SpellbookController(spellbooksRepository);
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
