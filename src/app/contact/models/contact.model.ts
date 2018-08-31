export interface Contact {
  id: number;
  name: {
    first: string;
    last: string;
  };
  phone: string[];
}

export const labels = {
  'name.first': 'First name',
  'name.last': 'Last name',
  phone: 'Phones'
};
