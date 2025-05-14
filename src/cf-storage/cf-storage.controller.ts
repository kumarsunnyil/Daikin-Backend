import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CfStorageService } from './cf-storage.service';
// import { CfStorage } from './entities/cf-storage.entity';

import { CreateCfStorageDto } from './dto/create-cf-storage.dto';
import { UpdateCfStorageDto } from './dto/update-cf-storage.dto';
// import { CfStorage } from './entities/cf-storage.entity';
// import { ComFactory } from 'src/com-factory/entities/com-factory.entity';

@Controller('cf-storage')
export class CfStorageController {
  constructor(private readonly service: CfStorageService) {}

  /**
   * scan and Register the compressor at the Comprosser Storage Area
   * @param data
   * @returns
   */
  @Post()
  async create(@Body() data: CreateCfStorageDto) {
    return this.service.create(data);
  }
  @Get()
  async findAll() {
    return this.service.findAll();
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return this.service.findOne(id);
  // }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateCfStorageDto) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  // @Get('picklist')
  // async createPickListForComStorage(): Promise<ComFactory[]> {
  //   console.log('test');
  //   return this.service.createPickListForComStorage();
  // }
}
