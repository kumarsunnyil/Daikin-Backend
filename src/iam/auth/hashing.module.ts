import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';

@Module({
  providers: [HashingService],
  exports: [HashingService], // Export it so other modules can use it
})
export class HashingModule {}
