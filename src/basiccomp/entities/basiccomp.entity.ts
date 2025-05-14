import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompressorDocument = Compressor & Document;

@Schema()
export class Compressor {
  // @Prop({ required: true, unique: true })
  // compressorId: string;

  @Prop({ required: true })
  modelNumber: string;

  @Prop({ required: true })
  manufacturer: string;

  @Prop({ required: true })
  serialNumber: string;

  @Prop({ required: true })
  location: string; // " Compressor Factory, Compressor Storage, Chiller Factory"

  @Prop({
    required: true,
    default: Date.now,
  })
  createdAt: Date;
  @Prop({
    required: true,
    default: Date.now,
  })
  updateddAt: Date;
}

export const CompressorSchema = SchemaFactory.createForClass(Compressor);
