import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComFactory, ComFactorySchema } from './entities/com-factory.entity';
import { ComFactoryService } from './com-factory.service';
import { ComFactoryController } from './com-factory.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ComFactory.name, schema: ComFactorySchema },
    ]),
  ],
  controllers: [ComFactoryController],
  providers: [ComFactoryService],
  exports: [ComFactoryService],
})
export class ComFactoryModule {}
