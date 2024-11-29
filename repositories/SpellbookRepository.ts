import { EntityNotFoundException } from '../exceptions/exceptions';
import Knex from 'knex';
import { SpellbookModel } from '../models/SpellbookModel';
import {SpellbookSpellModel} from '../models/SpellbookSpellModel';

export interface ISpellbookRepository {
  addSpell(id: string, spellId: string): Promise<void>;
  create(name: string): Promise<SpellbookModel>;
  destroy(id: string): Promise<void>;
  find(id: string): Promise<SpellbookModel>;
  findAll(): Promise<SpellbookModel[]>;
  removeSpell(id: string, spellId: string): Promise<void>;
}

export class SpellbookRepository implements ISpellbookRepository {
  private knex: Knex.Knex;
  private tableName: string = 'spellbooks';
  private spellbookSpellsTableName: string = 'spellbook_spells';

  constructor(knex: Knex.Knex) {
    this.knex = knex;
  }

  async addSpell(
    id: string,
    spellId: string
  ): Promise<void> {
    const response = new Promise<void>((resolve, reject) => {
      const spellbookSpellModel = new SpellbookSpellModel(
        spellId,
        id
      );

      spellbookSpellModel.generateId();

      this
        .knex(this.spellbookSpellsTableName)
        .insert({
          id: spellbookSpellModel.getId(),
          spell_id: spellId,
          spellbook_id: id,
          created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        })
        .then(() => {
          resolve()
        })
        .catch(() => {
          reject();
        })
    });

    return response;
  }

  async removeSpell(
    id: string,
    spellId: string
  ): Promise<void> {
    const response = new Promise<void>((resolve, reject) => {
      this
        .knex(this.spellbookSpellsTableName)
        .delete()
        .where({
          spell_id: spellId,
          spellbook_id: id
        })
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        })
    });

    return response;
  }

  async create(
    name: string
  ): Promise<SpellbookModel> {
    const response = new Promise<SpellbookModel>((resolve, reject) => {
      const spellbookModel = new SpellbookModel(name);
      
      spellbookModel.generateId();

      this
        .knex(this.tableName)
        .insert({
          id: spellbookModel.getId(),
          name: spellbookModel.name,
          created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        })
        .then(() => {
          resolve(spellbookModel)
        })
        .catch(() => {
          reject();
        })
    });

    return response;
  }

  async destroy (
    id: string
  ): Promise<void> {
    const response = new Promise<void>((resolve, reject) => {
      this
        .knex(this.spellbookSpellsTableName)
        .delete()
        .where({ spellbook_id: id})
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

  async find(id: string): Promise<SpellbookModel> {
    const response = new Promise<SpellbookModel>((resolve, reject) => {
      this
        .knex(this.tableName)
        .select()
        .where({ id })
        .then(spellbooks => {
          const spellbook = spellbooks[0];

          if (!spellbook) {
            throw new EntityNotFoundException('spellbook');
          }

          const model = this.mapModel(spellbook);
          resolve(model);
        })
        .catch(() => {
          reject();
        });
    });

    return response;
  }

  async findAll(): Promise<SpellbookModel[]> {
    const response = new Promise<SpellbookModel[]>((resolve, reject) => {
      this
        .knex(this.tableName)
        .select()
        .then(spellbooks => {
          const models = spellbooks.map((spellbook) => {
            return this.mapModel(spellbook);
          });
          resolve(models);
        })
        .catch(() => {
          reject();
        });
    });

    return response;
  }

  private mapModel(knexSpellbookResponse: any): SpellbookModel {
    const {
      id,
      name,
      created_at,
      updated_at
    } = knexSpellbookResponse;

    const spellbookModel = new SpellbookModel(
      name,
      created_at,
      updated_at
    );

    spellbookModel.setId(id);

    return spellbookModel;
  }
}