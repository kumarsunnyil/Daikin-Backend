import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Status } from '../enums/status.enums';

export type ComFactoryDocument = ComFactory & Document;

@Schema({ timestamps: true }) // Adds createdAt and updatedAt automatically
export class ComFactory {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false, unique: true })
  serialNumber: string;

  @Prop()
  location: string;

  // Status = READY = Ready for movement to storage | MOVED = Moved to storage area after scanning by the operator
  @Prop({ enum: Status, required: false, default: Status.Ready })
  status: Status;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  manager: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: false })
  scannedBy: MongooseSchema.Types.ObjectId;

  @Prop({
    default: Date.now,
  })
  dispatchedAt: Date;

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

export const ComFactorySchema = SchemaFactory.createForClass(ComFactory);
