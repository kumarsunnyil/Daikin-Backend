import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/entities/user.entity';
import {
  ComFactoryDocument,
  ComFactory,
} from '../com-factory/entities/com-factory.entity';

import { HashingService } from '../iam/auth/hashing/hashing.service';
import { usersSeedData, compressorsSeedData } from './seed-data';
// import { CreateComFactoryDto } from 'src/com-factory/dto/create-com-factory.dto';
// import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeederService {
  private readonly defaultPassword = '12345678';
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(ComFactory.name)
    private comFactoryModel: Model<ComFactoryDocument>,
    private readonly hashingService: HashingService,
  ) {}

  private async seedUsers() {
    await this.userModel.deleteMany({});
    const hashedPassword = await this.hashingService.hash(this.defaultPassword);

    const users = usersSeedData.map((user) => ({
      ...user,
      password: hashedPassword,
    }));

    await this.userModel.insertMany(users);
  }

  private async seedCompressors() {
    await this.comFactoryModel.deleteMany({});
    await this.comFactoryModel.insertMany(compressorsSeedData);
  }

  async seed() {
    await this.seedUsers();
    await this.seedCompressors();
    console.log('Seeding complete');
  }

  private async generateUniqueSerialNumber(): Promise<string> {
    let unique = false;
    let serialNumber = '';

    while (!unique) {
      // serialNumber = `CF-${uuidv4().slice(0, 8).toUpperCase()}`;
      serialNumber = `${Date.now()}${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, '0')}`;
      const exists = await this.comFactoryModel.findOne({ serialNumber });
      if (!exists) {
        unique = true;
      }
    }

    return serialNumber;
  }
}

/**
 * npx ts-node src/seeder.ts
 * Package.json
 * "scripts": {
  "seed": "ts-node src/seeder.ts"
}
 */
