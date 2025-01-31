import { Weapon } from 'src/knights/interfaces/weapon.interface';

export const returnWeaponsStub = (): Weapon[] => {
  return [
    { name: 'Sword', mod: 3, attr: 'strength', equipped: true },
    { name: 'Mace', mod: 2, attr: 'strength', equipped: false },
  ];
};
