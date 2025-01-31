import { Injectable } from '@nestjs/common';
import { Knight } from '../models/knights.schema';
import { Weapon } from '../interfaces/weapon.interface';

@Injectable()
export class KnightsCalculationProvider {
  calculateExperience(knight: Knight) {
    const age: number = this.calculateAge(knight);

    if (age < 7) return 0;

    return Math.floor((age - 7) * Math.pow(22, 1.45));
  }

  calculateAttack(knight: Knight) {
    const keyAttr: string = knight.keyAttribute;
    const keyAttrValue: number = knight.attributes[keyAttr];

    return (
      10 +
      this.calculateAttributeModifier(keyAttrValue) +
      this.getEquippedWeaponModifier(knight.weapons)
    );
  }

  calculateAttributeModifier(attributeValue: number): number {
    if (attributeValue <= 8) return -2;
    if (attributeValue <= 10) return -1;
    if (attributeValue <= 12) return 0;
    if (attributeValue <= 15) return 1;
    if (attributeValue <= 18) return 2;
    return 3;
  }

  getEquippedWeaponModifier(weapons: Array<Weapon>): number {
    const equippedWeapon: Weapon = weapons.find((weapon) => weapon.equipped);
    return equippedWeapon.mod;
  }

  calculateAge(knight: Knight) {
    const birthYear: number = new Date(knight.birthday).getFullYear();
    const currentYear: number = new Date().getFullYear();
    const age: number = currentYear - birthYear;
    return age;
  }
}
