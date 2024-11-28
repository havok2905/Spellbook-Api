import { BadArgumentException } from '../exceptions/exceptions';
import { CreateSpellbookRequest } from '../requests/CreateSpellbookRequest';
import { ISpellbookRepository } from '../repositories/SpellbookRepository';
import { SpellbookModel } from '../models/SpellbookModel';
import { SpellbookResponse } from '../responses/SpellbookResponse';
import { SpellbooksResponse } from '../responses/SpellbooksResponse';

export class SpellbookController {
  private spellbookRepository: ISpellbookRepository;

  constructor(spellbookRepository: ISpellbookRepository) {
    this.spellbookRepository = spellbookRepository;
  }

  async create(request: CreateSpellbookRequest): Promise<SpellbookResponse> {
    if (!request.validate()) {
      throw new BadArgumentException();
    }

    const spellbook = await this.spellbookRepository.create(request.name);
    const spellbookResponse = this.mapSpellbookModelToResponse(spellbook);
    return spellbookResponse;
  }

  async destroy(id: string): Promise<void> {
    if (!id) {
      throw new BadArgumentException();
    }

    await this.spellbookRepository.find(id);
    await this.spellbookRepository.destroy(id);
  }

  async get(): Promise<SpellbooksResponse> {
    const spellbooks = await this.spellbookRepository.findAll();
    const response = new SpellbooksResponse([]);

    for(let x=0; x<spellbooks.length; x++) {
      const spellbook = spellbooks[x];
      const spellbookResponse = this.mapSpellbookModelToResponse(spellbook);
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