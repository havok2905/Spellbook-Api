import { BadArgumentException } from '../exceptions/exceptions';
import { ISpellbookRepository } from '../repositories/SpellbookRepository';
import { SpellbookModel } from '../models/SpellbookModel';
import { SpellbookResponse } from '../responses/SpellbookResponse';
import { SpellbooksResponse } from '../responses/SpellbooksResponse';

export class SpellbookController {
  private spellbookRepository: ISpellbookRepository;

  constructor(spellbookRepository: ISpellbookRepository) {
    this.spellbookRepository = spellbookRepository;
  }

  async get(): Promise<SpellbooksResponse> {
    const spellbooks = await this.spellbookRepository.findAll();
    const response = new SpellbooksResponse([]);

    for(let x=0; x<spellbooks.length; x++) {
      const spell = spellbooks[x];
      const spellbookResponse = this.mapSpellbookModelToResponse(spell);
      response.spellbooks.push(spellbookResponse);
    }

    return response;
  }

  async find(id: string): Promise<SpellbookResponse> {
    if (!id) {
      throw new BadArgumentException();
    }

    const spellbook = await this.spellbookRepository.find(id);
    const response = this.mapSpellbookModelToResponse(spellbook);

    return response;
  }

  private mapSpellbookModelToResponse(spellbook: SpellbookModel): SpellbookResponse {
    const {
      name,
      created_at,
      updated_at
    } = spellbook;

    return new SpellbookResponse(
      spellbook.getId(),
      name,
      created_at,
      updated_at
    )
  }
}