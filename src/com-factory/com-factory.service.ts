import {
  ConflictException,
  Injectable,
  // NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// const Jimp = require('jimp');
// import Jimp from 'jimp';
// import * as Jimp from 'jimp';
import { Model } from 'mongoose';
import { ComFactory, ComFactoryDocument } from './entities/com-factory.entity';
import { CreateComFactoryDto } from './dto/create-com-factory.dto';
import { Status } from './enums/status.enums';
import * as QRCode from 'qrcode';
// import * as QrCodeReader from 'qrcode-reader';

@Injectable()
export class ComFactoryService {
  constructor(
    @InjectModel(ComFactory.name)
    private comFactoryModel: Model<ComFactoryDocument>,
  ) {}

  async create(data: CreateComFactoryDto): Promise<ComFactory> {
    let serialNumber = data.serialNumber;

    // If serialNumber is not provided, generate one
    console.log(data);
    serialNumber = await this.generateUniqueSerialNumber();
    const exists = await this.comFactoryModel.findOne({ serialNumber });
    if (exists) {
      throw new ConflictException('Serial number already exists');
    }
    const location = `CF-${Math.floor(Math.random() * (999 - 101 + 1)) + 101}`;
    const created = new this.comFactoryModel({
      ...data,
      serialNumber,
      location,
    });
    console.log(created);
    return created.save();
  }

  findAll() {
    return this.comFactoryModel
      .find({ status: Status.Ready })
      .sort({ createdAt: 1 });
    // .populate('manager');
  }

  findOne(id: string) {
    return this.comFactoryModel.findById(id).populate('manager');
  }

  update(id: string, updateData: Partial<ComFactory>) {
    return this.comFactoryModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
  }

  remove(id: string) {
    return this.comFactoryModel.findByIdAndDelete(id);
  }

  private async generateUniqueSerialNumber(): Promise<string> {
    let unique = false;
    let serialNumber = '';

    while (!unique) {
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

  async createPickListForComStorage(): Promise<ComFactory[]> {
    console.log('B4 Query');
    const result = this.comFactoryModel
      .find()
      .sort({ createdAt: 1 }) // Sort by oldest first - FIFO
      .limit(10) // Limit to 10 results
      .exec();
    console.log('Aftr Query, ', result);
    return result;
  }

  moveToFactoryStorage(serialNumber: string) {
    console.log('in the Service Code');
    return this.comFactoryModel.findOneAndUpdate(
      { serialNumber },
      { status: Status.Scanned },
      { new: true },
    );
  }

  findAllComFactoryOperator() {
    return this.comFactoryModel.find().populate('comfoperator');
  }

  findAllScanned() {
    return this.comFactoryModel
      .find({ status: Status.Scanned })
      .sort({ createdAt: 1 });
    // .populate('manager');
  }

  // async getCompressorsFromFactory(
  //   prefix: string,
  // ): Promise<{ serialNumber: string; location: string }[]> {
  //   const regexPattern = `^${prefix}-`; // e.g., "^A-"
  //   const compressors = await this.comFactoryModel
  //     .find(
  //       {
  //         name: 'Compressor Factory',
  //         // status: 'READY',
  //         location: { $regex: regexPattern, $options: 'i' },
  //       },
  //       'serialNumber location', // Select only these fields
  //     )
  //     .sort({ createdAt: 1 }) // Sort by oldest first - FIFO
  //     .limit(14)
  //     .exec();
  //   return compressors.map((item) => ({
  //     serialNumber: item.serialNumber,
  //     location: item.location,
  //   }));
  // }

  /*** */

  async getCompressorsFromFactory(
    prefixes: string[],
  ): Promise<{ serialNumber: string; location: string }[]> {
    const regexConditions = prefixes.map((prefix) => ({
      location: { $regex: `^${prefix}-`, $options: 'i' }, // Match location starting with prefix
    }));
    console.log('regexConditions: ', regexConditions);

    const compressors = await this.comFactoryModel
      .find(
        {
          $or: regexConditions, // Match any of the prefixes
        },
        'serialNumber location',
      )
      .sort({ createdAt: 1 })
      .limit(14)
      .exec();

    return compressors.map((item) => ({
      serialNumber: item.serialNumber,
      location: item.location,
    }));
  }

  async findCompressorsBySerialNumbers(serialNumbers: string[]) {
    const compressors = await this.comFactoryModel
      .find({
        serialNumber: { $in: serialNumbers },
      })
      .lean(); // Make sure you use .lean() to return plain objects

    // Generate QR codes for each compressor
    const withQRCodes = await Promise.all(
      compressors.map(async (comp) => {
        const serialQR = await QRCode.toDataURL(comp.serialNumber);
        const locationQR = await QRCode.toDataURL(comp.location);

        return {
          ...comp,
          qrSerial: serialQR,
          qrLocation: locationQR,
        };
      }),
    );

    return withQRCodes;

    // return this.comFactoryModel.find({
    //   serialNumber: { $in: serialNumbers },
    // });
  }

  // async decodeAndMapQRCode(imageBuffer: Buffer) {
  //   const image = await Jimp.read(imageBuffer);

  //   return new Promise(async (resolve, reject) => {
  //     const qr = new QrCodeReader();

  //     qr.callback = async (err, value) => {
  //       if (err || !value) {
  //         return reject('Could not decode QR Code');
  //       }

  //       const data = value.result.trim();

  //       // Try to find compressor by serial number or location
  //       const compressor = await this.comFactoryModel.findOne({
  //         $or: [{ serialNumber: data }, { location: data }],
  //       });

  //       if (!compressor) {
  //         return reject(
  //           new NotFoundException('Compressor not found for scanned QR'),
  //         );
  //       }

  //       resolve({
  //         matchedBy:
  //           data === compressor.serialNumber ? 'serialNumber' : 'location',
  //         compressor,
  //       });
  //     };

  //     qr.decode(image.bitmap);
  //   });
  // }
}
