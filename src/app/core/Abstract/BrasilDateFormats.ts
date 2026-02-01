import { provideNativeDateAdapter } from '@angular/material/core';

export const BRAZIL_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY', // como o usuário digita manualmente
  },
  display: {
    dateInput: 'DD/MM/YYYY', // como aparece no input
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY', // <- permite digitar 18/01/2026
  },
  display: {
    dateInput: 'DD/MM/YYYY', // <- mostra assim no input
    monthYearLabel: 'MMM yyyy', // ex: jan 2026
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};
