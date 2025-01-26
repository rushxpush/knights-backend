import { CreateKnightDto } from 'src/knights/dto/create-knight.dto';

export const createKnightDtoStub = (): CreateKnightDto => {
  return {
    name: 'King Arthur',
    nickname: 'Arthy',
    birthday: new Date('2001-02-21'),
    weapons: [
      {
        name: 'mace',
        mod: 2,
        attr: 'strength',
        equipped: true,
      },
    ],
    attributes: {
      strength: 13,
      dexterity: 11,
      constitution: 9,
      intelligence: 11,
      wisdom: 11,
      charisma: 10,
    },
    keyAttribute: 'charisma',
  };
};
