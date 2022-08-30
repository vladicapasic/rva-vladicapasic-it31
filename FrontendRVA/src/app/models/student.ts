import { Projekat } from './projekat';
import { Grupa } from './grupa';
export class Student {
  id: number;
  ime: string;
  prezime: string;
  brojIndeksa: string;
  grupa: Grupa;
  projekat: Projekat;
}