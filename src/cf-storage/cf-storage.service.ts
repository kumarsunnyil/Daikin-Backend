import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CfStorage, CfStorageDocument } from './entities/cf-storage.entity';
import { CreateCfStorageDto } from './dto/create-cf-storage.dto';
import { UpdateCfStorageDto } from './dto/update-cf-storage.dto';
// import {
//   ComFactory,
//   ComFactoryDocument,
// } from 'src/com-factory/entities/com-factory.entity';

// import { Status } from '../com-factory/enums/status.enums';

@Injectable()
export class CfStorageService {
  constructor(
    @InjectModel(CfStorage.name)
    private cfStorageModel: Model<CfStorageDocument>,
    // @InjectModel(ComFactory.name)
    // private comFactoryModel: Model<ComFactoryDocument>,
  ) {}

  async create(data: CreateCfStorageDto): Promise<CfStorage> {
    const created = new this.cfStorageModel({
      ...data,
      compressorSerialNumber: new Types.ObjectId(data.compressorSerialNumber),
      registeredBy: new Types.ObjectId(data.registeredBy),
      pickedBy: data.pickedBy ? new Types.ObjectId(data.pickedBy) : undefined,
    });

    return created.save();
  }

  async findAll(): Promise<CfStorage[]> {
    return this.cfStorageModel
      .find()
      .populate('compressorSerialNumber registeredBy pickedBy')
      .exec();
  }

  async findOne(id: string): Promise<CfStorage> {
    return this.cfStorageModel
      .findById(id)
      .populate('compressorSerialNumber registeredBy pickedBy')
      .exec();
  }

  async update(id: string, data: UpdateCfStorageDto): Promise<CfStorage> {
    const updatedData: any = { ...data };

    if (data.compressorSerialNumber)
      updatedData.compressorSerialNumber = new Types.ObjectId(
        data.compressorSerialNumber,
      );

    if (data.registeredBy)
      updatedData.registeredBy = new Types.ObjectId(data.registeredBy);

    if (data.pickedBy) updatedData.pickedBy = new Types.ObjectId(data.pickedBy);

    return this.cfStorageModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
  }

  async delete(id: string): Promise<any> {
    return this.cfStorageModel.findByIdAndDelete(id).exec();
  }
  async createPickListForComStorage() {
    // this.cfStorageModel.find().populate('comfoperator');
    console.log('in the Service Code');
    // return this.comFactoryModel
    //   .find({ status: Status.Scanned })
    //   .sort({ createdAt: 1 });

    // return;
  }
}
