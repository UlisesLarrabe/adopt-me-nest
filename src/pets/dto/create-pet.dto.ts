export class CreatePetDto {
  name: string;
  birthDate: Date;
  adopted: boolean;
  owner?: object[];
  specie: string;
  image: string;
}
