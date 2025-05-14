import { PartialType } from '@nestjs/mapped-types';
import { CreateCfStorageDto } from './create-cf-storage.dto';

export class UpdateCfStorageDto extends PartialType(CreateCfStorageDto) {}
