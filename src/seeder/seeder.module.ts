import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeederService } from './seeder.service';
import { User, UserSchema } from '../users/entities/user.entity';
// import {
//   Compressor,
//   CompressorSchema,
// } from '../basiccomp/entities/basiccomp.entity';
import { HashingModule } from '../iam/auth/hashing.module';
import {
  ComFactory,
  ComFactorySchema,
} from '../com-factory/entities/com-factory.entity';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/daikin_db'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      // { name: Compressor.name, schema: CompressorSchema },
      { name: ComFactory.name, schema: ComFactorySchema },
    ]),
    HashingModule,
  ],
  providers: [SeederService],
})
export class SeederModule {}
