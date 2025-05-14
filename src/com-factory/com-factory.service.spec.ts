import { Test, TestingModule } from '@nestjs/testing';
import { ComFactoryService } from './com-factory.service';

describe('ComFactoryService', () => {
  let service: ComFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComFactoryService],
    }).compile();

    service = module.get<ComFactoryService>(ComFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
