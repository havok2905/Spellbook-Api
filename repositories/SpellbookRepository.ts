import { EntityNotFoundException } from '../exceptions/exceptions';
import Knex from 'knex';
import { SpellbookModel } from '../models/SpellbookModel';

export interface ISpellbookRepository {
  find(id: string): Promise<SpellbookModel>;
  findAll(): Promise<SpellbookModel[]>;
}

export class SpellbookRepository implements ISpellbookRepository {
  private knex: Knex.Knex;
  private tableName: string = 'spellbooks';

  constructor(knex: Knex.Knex) {
    this.knex = knex;
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
        .catch((error) => {
          console.error(error);
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
        .catch((error) => {
          console.error(error);
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