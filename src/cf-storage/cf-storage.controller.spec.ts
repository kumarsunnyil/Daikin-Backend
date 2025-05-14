import { Test, TestingModule } from '@nestjs/testing';
import { CfStorageController } from './cf-storage.controller';

describe('CfStorageController', () => {
  let controller: CfStorageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CfStorageController],
    }).compile();

    controller = module.get<CfStorageController>(CfStorageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
