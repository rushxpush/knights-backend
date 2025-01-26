export const returnUpdatedKnightStub = () => {
  return {
    _id: '67914e6e1d5a7b574bce8a07',
    name: 'King Arthur',
    nickname: 'New Nickname',
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
    __v: 0,
  };
};
