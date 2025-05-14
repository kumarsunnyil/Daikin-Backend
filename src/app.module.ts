import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IamModule } from './iam/iam.module';
import { BasiccompModule } from './basiccomp/basiccomp.module';
import { BasiccompService } from './basiccomp/basiccomp.service';
import { ComFactoryModule } from './com-factory/com-factory.module';
import { CfStorageModule } from './cf-storage/cf-storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    IamModule,
    BasiccompModule,
    ComFactoryModule,
    CfStorageModule,
  ],
  controllers: [AppController],
  providers: [AppService, BasiccompService],
})
export class AppModule {}
