import {
  IsNotEmpty,
  IsString,
  IsMongoId,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateCfStorageDto {
  @IsMongoId()
  @IsNotEmpty()
  compressorSerialNumber: string;

  @IsString()
  @IsNotEmpty()
  physicalID: string;

  @IsString()
  @IsNotEmpty()
  physicalName: string;

  @IsMongoId()
  @IsNotEmpty()
  registeredBy: string;

  @IsDateString()
  @IsNotEmpty()
  recievedOn: string;

  @IsMongoId()
  @IsOptional()
  pickedBy?: string;

  @IsDateString()
  @IsOptional()
  dispatchedOn?: string;
}
