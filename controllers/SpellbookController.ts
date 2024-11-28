import { BadArgumentException } from '../exceptions/exceptions';
import { CreateSpellbookRequest } from '../requests/CreateSpellbookRequest';
import { ISpellRepository } from '../repositories/SpellRepository';
import { ISpellbookRepository } from '../repositories/SpellbookRepository';
import { SpellbookModel } from '../models/SpellbookModel';
import { SpellbookResponse } from '../responses/SpellbookResponse';
import { SpellbooksResponse } from '../responses/SpellbooksResponse';

export class SpellbookController {
  private spellbookRepository: ISpellbookRepository;
  private spellRepository: ISpellRepository;

  constructor(
    spellRepository: ISpellRepository,
    spellbookRepository: ISpellbookRepository
  ) {
    this.spellRepository = spellRepository;
    this.spellbookRepository = spellbookRepository;
  }

  async addSpell(id: string, spellId: string) {
    if (!id || !spellId) {
      throw new BadArgumentException();
    }

    await this.spellbookRepository.find(id);
    await this.spellRepository.find(spellId);
    await this.spellbookRepository.addSpell(id, spellId);
  }

  async removeSpell(id: string, spellId: string) {
    if (!id || !spellId) {
      throw new BadArgumentException();
    }

    await this.spellbookRepository.removeSpell(id, spellId);
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