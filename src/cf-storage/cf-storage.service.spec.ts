import { Test, TestingModule } from '@nestjs/testing';
import { CfStorageService } from './cf-storage.service';

describe('CfStorageService', () => {
  let service: CfStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CfStorageService],
    }).compile();

    service = module.get<CfStorageService>(CfStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
