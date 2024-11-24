import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex('spell_creature_actions').del();
  await knex('spell_creature_features').del();
  await knex('spell_casting_times').del();
  await knex('spell_duration_times').del();
  await knex('spell_creatures').del();
  await knex('spellbook_spells').del();
  await knex('spells').del();
  await knex('spellbooks').del();

  await knex('spells').insert([
    {
      id: '2ed8b3de-8f65-4fb2-8b16-9be0c7a8c714',
      components: 'SV',
      concentration: false,
      description: JSON.stringify([
        'You cause numbing frost to form on one creature that you can see within range. The target must make a Constitution saving throw. On a failed save, the target takes 1d6 cold damage, and it has disadvantage on the next weapon attack roll it makes before the end of its next turn.'
      ]),
      description_higher_level: JSON.stringify([
        'The spell\'s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).'
      ]),
      level: 0,
      magic_school: 'evocation',
      materials: '',
      name: 'Frostbite',
      range_text: '60ft.',
      ritual: false,
      source: 'Elemental Evil Player\'s Companion',
      ttrpg_system: 'D&D 2014',
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    },
    {
      id: 'ab41047c-5813-429e-9620-7cbd492daa38',
      components: 'SV',
      concentration: false,
      description: JSON.stringify([
        'A creature you touch regains a number of hit points equal to 1d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs.'
      ]),
      description_higher_level: JSON.stringify([
        'When you cast this spell using a spell slot of 2nd level or higher, the Healing increases by 1d8 for each slot level above 1st.'
      ]),
      level: 1,
      magic_school: 'evocation',
      materials: '',
      name: 'Cure Wounds',
      range_text: 'Touch',
      ritual: false,
      source: 'Player\'s Handbook',
      ttrpg_system: 'D&D 2014',
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    },
    {
      id: 'c277cbbd-e9d6-4514-ac5f-d4bbfb6b71fd',
      components: 'MSV',
      concentration: true,
      description: JSON.stringify([
        'You call forth a draconic spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Draconic Spirit stat block. When you cast this spell, choose a family of dragon: chromatic, gem, or metallic. The creature resembles a dragon of the chosen family, which determines certain traits in its stat block. The creature disappears when it drops to 0 hit points or when the spell ends.',
        'The creature is an ally to you and your companions. In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don\'t issue any, it takes the Dodge action and uses its move to avoid danger.'
      ]),
      description_higher_level: JSON.stringify([
        'When you cast this spell using a spell slot of 6th level or higher, use the higher level wherever the spell\'s level appears in the stat block.'
      ]),
      level: 5,
      magic_school: 'conjuration',
      materials: 'an object with the image of a dragon engraved on it, worth at least 500 gp',
      name: 'Summon Draconic Spirit',
      range_text: '60ft.',
      ritual: false,
      source: 'Fizban\'s Treasury of Dragons',
      ttrpg_system: 'D&D 2014',
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }
  ]);

  await knex('spellbooks').insert([
    {
      id: '956b20fe-d05a-481d-8579-974c37895608',
      name: 'My Spellbook',
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }
  ]);

  await knex('spellbook_spells').insert([
    {
      id: '949129ec-beee-4263-aef8-77e25c0eba0f',
      spell_id: 'c277cbbd-e9d6-4514-ac5f-d4bbfb6b71fd',
      spellbook_id: '956b20fe-d05a-481d-8579-974c37895608',
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }
  ]);

  await knex('spell_casting_times').insert([
    {
      id: '949129ec-beee-4263-aef8-77e25c0eba1f',
      spell_id: 'c277cbbd-e9d6-4514-ac5f-d4bbfb6b71fd',
      total: 1,
      action_type: 'action',
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }
  ]);

  await knex('spell_duration_times').insert([
    {
      id: '949129ec-beee-4263-aef8-77e25c0eba2f',
      spell_id: 'c277cbbd-e9d6-4514-ac5f-d4bbfb6b71fd',
      total: 1,
      action_type: 'hour',
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }
  ]);

  await knex('spell_creatures').insert([
    {
      id: '947a7a3a-9494-49b1-a9f0-bd834684e2e8',
      spell_id: 'c277cbbd-e9d6-4514-ac5f-d4bbfb6b71fd',
      ac: '14 + the level of the spell (natural armor)',
      alignment: 'neutral',
      cha: 14,
      con: 17,
      condition_immunities: 'charmed, frightened, poisoned',
      cr: 'Proficiency Bonus (PB) equals your bonus',
      creature_type: 'Dragon',
      damage_immunities: '',
      damage_resistances: '(Chromatic and Metallic Only) acid, cold, fire, lightning, poison; (Gem Only) force, necrotic, psychic, radiant, thunder',
      damage_vulnerabilities: '',
      dex: 14,
      hp: '50 + 10 for each spell level above 5th (the dragon has a number of hit dice [d10s] equal to the level of the spell)',
      intelligence: 10,
      languages: 'Draconic, understands the languages you speak',
      name: 'My Spellbook',
      proficiency_bonus: 'equals your bonus',
      senses: 'blindsight 30 ft., darkvision 60 ft., passive Perception 12',
      size: 'Large',
      speed: '30 ft., fly 60 ft., swim 30 ft.',
      str: 19,
      wis: 14,
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }
  ]);

  await knex('spell_creature_actions').insert([
    {
      id: '4286085b-abe9-44f3-86ed-4802a9f33c71',
      spell_creature_id: '947a7a3a-9494-49b1-a9f0-bd834684e2e8',
      name: 'Multiattack',
      description: JSON.stringify([
        'The dragon makes a number of Rend attacks equal to half the spell\'s level (rounded down), and it uses Breath Weapon.'
      ]),
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    },
    {
      id: '338a5a79-675f-416c-8049-b0254f6674da',
      spell_creature_id: '947a7a3a-9494-49b1-a9f0-bd834684e2e8',
      name: 'Rend',
      description: JSON.stringify([
        'Melee Weapon Attack: your spell attack modifier to hit, reach 10 ft., one target. Hit: 1d6 plus 4 + the spell\'s level piercing damage.'
      ]),
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    },
    {
      id: 'e22a7bc9-ebed-4311-8f93-f9de7b4d855b',
      spell_creature_id: '947a7a3a-9494-49b1-a9f0-bd834684e2e8',
      name: 'Breath Weapon',
      description: JSON.stringify([
        'The dragon exhales destructive energy in a 30-foot cone. Each creature in that area must make a Dexterity saving throw against your spell save DC. A creature takes 2d6 damage of a type this dragon has resistance to (your choice) on a failed save, or half as much damage on a successful one.'
      ]),
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }
  ]);

  await knex('spell_creature_features').insert([
    {
      id: 'd004eabc-058b-4f3e-9055-a6f5a148af4c',
      spell_creature_id: '947a7a3a-9494-49b1-a9f0-bd834684e2e8',
      name: 'Shared Resistances',
      description: JSON.stringify([
        'When you summon the dragon, choose one of its damage resistances. You have resistance to the chosen damage type until the spell ends'
      ]),
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }
  ]);
};
