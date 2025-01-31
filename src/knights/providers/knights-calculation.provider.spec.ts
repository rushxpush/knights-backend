import { Knight } from '../models/knights.schema';
import { returnCreatedBabyKnightStub } from '../test/stubs/returnCreatedBabyKnight.stub';
import { returnCreatedKnightStub } from '../test/stubs/returnCreatedKnight.stub';
import { KnightsCalculationProvider } from './knights-calculation.provider';
import { Weapon } from '../interfaces/weapon.interface';
import { returnWeaponsStub } from '../test/stubs/returnWeapons.stub';

describe('KnightsCalculationProvider', () => {
  let calcProvider: KnightsCalculationProvider;

  beforeEach(() => {
    calcProvider = new KnightsCalculationProvider();
  });

  it('should be defined', () => {
    expect(KnightsCalculationProvider).toBeDefined();
  });

  describe('calculateAttributeModifier', () => {
    it('should return the correct attribute modifier', () => {
      expect(calcProvider.calculateAttributeModifier(8)).toBe(-2);
      expect(calcProvider.calculateAttributeModifier(10)).toBe(-1);
      expect(calcProvider.calculateAttributeModifier(12)).toBe(0);
      expect(calcProvider.calculateAttributeModifier(15)).toBe(1);
      expect(calcProvider.calculateAttributeModifier(18)).toBe(2);
    });
  });

  describe('getEquippedWeaponModifier', () => {
    it('should return the equipped weapon modifier value', () => {
      const weapons: Weapon[] = returnWeaponsStub();
      const modifier = calcProvider.getEquippedWeaponModifier(weapons);

      expect(modifier).toEqual(3);
    });
  });

  describe('calculateAge', () => {
    it('should return the correct age', () => {
      const knight: Knight = returnCreatedKnightStub();

      const age = calcProvider.calculateAge(knight);

      expect(age).toEqual(24);
    });
  });

  describe('calculateExperience', () => {
    it('should return 0 if age is less than 7', () => {
      const knight: Knight = returnCreatedBabyKnightStub();

      jest.spyOn(calcProvider, 'calculateAge').mockReturnValue(1);

      const experience = calcProvider.calculateExperience(knight);

      expect(experience).toBe(0);
    });

    it('should calculate experience for knights older than 7', () => {
      const knight: Knight = returnCreatedKnightStub();

      jest.spyOn(calcProvider, 'calculateAge').mockReturnValue(23);

      const experience = calcProvider.calculateExperience(knight);

      expect(experience).toBe(1414);
    });
  });

  describe('calculateAttack', () => {
    it('should calculate attack with modifiers', () => {
      const knight: Knight = returnCreatedKnightStub();

      const attack = calcProvider.calculateAttack(knight);
      expect(attack).toBe(11);
    });
  });
});
