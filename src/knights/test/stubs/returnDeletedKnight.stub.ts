export const returnDeletedKnightStub = () => {
  return {
    _id: '67942b5d5a58e483bf823665',
    name: 'King Arthur',
    nickname: 'Arthy',
    birthday: new Date('2001-02-21T00:00:00Z'),
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
    __v: 0,
  };
};
