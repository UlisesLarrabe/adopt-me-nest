import { ApiProperty } from '@nestjs/swagger';

export class CreatePetDto {
  @ApiProperty({ example: 'Kratos' })
  name: string;
  @ApiProperty({ example: '2025-03-02' })
  birthDate: Date;
  @ApiProperty({ example: 'false' })
  adopted: boolean;
  @ApiProperty({ example: '[]' })
  owner?: object[];
  @ApiProperty({ example: 'Cat' })
  specie: string;
  @ApiProperty({ example: '' })
  image: string;
}
