export interface Employee {
  firstName: string;
  lastName: string;
  eMail: string;
  ntLogin: string;
  unit: {
    name: string;
  };
  languageCode: 'de' | 'fr' | 'it';
  employeeNr: string;
}
