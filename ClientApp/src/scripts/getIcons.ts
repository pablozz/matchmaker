import {
  mdiBasketball,
  mdiGenderFemale,
  mdiGenderMale,
  mdiGenderMaleFemale,
  mdiSignalCellular1,
  mdiSignalCellular2,
  mdiSignalCellular3,
  mdiSoccer,
  mdiVolleyball
} from '@mdi/js';
import { IIcon } from '../types/icons';

export const pickCategoryIcon = (category: string): IIcon => {
  switch (category) {
    case 'Krepšinis':
      return { title: 'Krepšinis', path: mdiBasketball };
    case 'Tinklinis':
      return { title: 'Tinklinis', path: mdiVolleyball };
    case 'Futbolas':
      return { title: 'Futbolas', path: mdiSoccer };
    default:
      return { title: '', path: '' };
  }
};

export const pickGenderIcon = (gender: string): IIcon => {
  switch (gender) {
    case 'Vyrai':
      return {
        title: 'Vyrai',
        path: mdiGenderMale
      };
    case 'Moterys':
      return {
        title: 'Moterys',
        path: mdiGenderFemale
      };
    case 'Mišri grupė':
      return {
        title: 'Mišri grupė',
        path: mdiGenderMaleFemale
      };
    default:
      return { title: '', path: '' };
  }
};

export const pickLevelIcon = (level: number): IIcon => {
  switch (level) {
    case 1:
      return { title: 'Pradedantysis', path: mdiSignalCellular1 };
    case 2:
      return { title: 'Mėgėjas', path: mdiSignalCellular2 };
    case 3:
      return { title: 'Pažengęs', path: mdiSignalCellular3 };
    default:
      return { title: '', path: '' };
  }
};
