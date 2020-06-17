export const convertMonth = (month: string) => {
  switch(month) {
    case 'janeiro':
      return 0;
    case 'fevereiro':
      return 1;
    case 'marco':
      return 2;
    case 'abril':
      return 3;
    case 'maio':
      return 4;
    case 'junho':
      return 5;
    case 'julho':
      return 6;
    case 'agosto':
      return 7;
    case 'setembro':
      return 8;
    case 'outubro':
      return 9;
    case 'novembro':
      return 10;
    case 'dezembro':
      return 11;
  }
}
