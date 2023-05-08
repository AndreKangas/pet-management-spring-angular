import { PetTypes } from "./petTypes.model";

export class Pet {
    id?: number;
    name?: string;
    identificationCode?: string;
    type?: PetTypes;
    furColor?: string;
    userId?: number;
  }
  