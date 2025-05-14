import { Test, TestingModule } from '@nestjs/testing';
import { BasiccompService } from './basiccomp.service';

describe('BasiccompService', () => {
  let service: BasiccompService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasiccompService],
    }).compile();

    service = module.get<BasiccompService>(BasiccompService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
