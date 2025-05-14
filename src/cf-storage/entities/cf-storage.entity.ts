import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CfStorageDocument = CfStorage & Document;

@Schema({ timestamps: true }) // automatically adds createdAt and updatedAt
export class CfStorage {
  @Prop({ type: Types.ObjectId, ref: 'Compressor', required: true })
  compressorSerialNumber: Types.ObjectId;

  @Prop({ required: true })
  physicalID: string;

  @Prop({ required: true })
  physicalName: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  registeredBy: Types.ObjectId;

  @Prop({ type: Date, required: true })
  recievedOn: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  pickedBy: Types.ObjectId;

  @Prop({ type: Date, required: false })
  dispatchedOn: Date;
}

export const CfStorageSchema = SchemaFactory.createForClass(CfStorage);
