import { IsArray, IsString } from 'class-validator';
export class CreateComFactoryDto {
  readonly name: string;
  serialNumber: string;
}
// src/com-factory/dto/get-compressors-by-serial.dto.ts

export class GetCompressorsBySerialDto {
  @IsArray()
  @IsString({ each: true })
  serialNumbers: string[];
}
