import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({ example: 'Tommy' })
  first_name: string;
  @ApiProperty({ example: 'Turner' })
  last_name: string;
  @ApiProperty({ example: 'Tommy@email.com' })
  email: string;
  @ApiProperty({ example: 'Tommy123' })
  password: string;
  @ApiProperty({ example: 'user' })
  role: string;
  @ApiProperty({ example: '[]' })
  pets: object[];
}
