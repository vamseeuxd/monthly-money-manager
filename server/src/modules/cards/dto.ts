import {IsString} from 'class-validator';

export class CreateDto {
  @IsString()
  public number: string;

  @IsString()
  public name: string;

}
