import {
  // BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  // UploadedFile,
  // UseInterceptors,
} from '@nestjs/common';
import { ComFactoryService } from './com-factory.service';
import { ComFactory } from './entities/com-factory.entity';
import { GetCompressorsBySerialDto } from './dto/create-com-factory.dto';
// import { FileInterceptor } from '@nestjs/platform-express';

@Controller('com-factory')
export class ComFactoryController {
  constructor(private readonly comFactoryService: ComFactoryService) {}

  @Post()
  create(@Body() body: any) {
    // return this.comFactoryService.create(body);
    return this.comFactoryService.create(body);
  }

  @Get('list')
  findAll() {
    return this.comFactoryService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.comFactoryService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comFactoryService.remove(id);
  }

  @Get('picklist')
  async createPickListForComStorage(): Promise<ComFactory[]> {
    console.log('test');
    return this.comFactoryService.createPickListForComStorage();
  }

  @Patch('/scanFactoryQR/:serialNumber/scanned')
  moveToFactoryStorage(@Param('serialNumber') serialNumber: string) {
    return this.comFactoryService.moveToFactoryStorage(serialNumber);
  }

  @Get('operators')
  findAllComFactoryOperator() {
    return this.comFactoryService.findAllComFactoryOperator();
  }
  @Get('scanned')
  findAllScanned() {
    return this.comFactoryService.findAllScanned();
  }

  /**
   * Gets all Compressors from Compressor Factory
   * @returns
   */
  // async getCompressorsFromFactory(@Query('prefix') prefix: string) {
  //   return this.comFactoryService.getCompressorsFromFactory(prefix);
  // }

  @Post('allcompressors')
  async getCompressorsFromFactory(@Body('prefixes') prefixes: string[]) {
    console.log('here in controller');
    return this.comFactoryService.getCompressorsFromFactory(prefixes);
  }

  @Post('compressors/details')
  async getCompressorsBySerialNumbers(@Body() dto: GetCompressorsBySerialDto) {
    return this.comFactoryService.findCompressorsBySerialNumbers(
      dto.serialNumbers,
    );
  }

  // @Post('scan-qr')
  // @UseInterceptors(FileInterceptor('file'))
  // async scanQRCode(@UploadedFile() file: Express.Multer.File) {
  //   if (!file) {
  //     throw new BadRequestException('No file uploaded');
  //   }

  //   return this.comFactoryService.decodeAndMapQRCode(file.buffer);
  // }
}
