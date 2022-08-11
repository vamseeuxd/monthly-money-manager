import {IsString, IsEmail} from 'class-validator';

export class CreateCardDto {
  @IsString()
  public number: string;

  @IsString()
  public name: string;

}
