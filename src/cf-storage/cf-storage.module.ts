import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CfStorage, CfStorageSchema } from './entities/cf-storage.entity';
import { CfStorageService } from './cf-storage.service';
import { CfStorageController } from './cf-storage.controller';
import { ComFactoryModule } from 'src/com-factory/com-factory.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CfStorage.name, schema: CfStorageSchema },
    ]),
    ComFactoryModule,
  ],
  providers: [CfStorageService],
  controllers: [CfStorageController],
  exports: [CfStorageService],
})
export class CfStorageModule {}
