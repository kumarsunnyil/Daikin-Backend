import { Test, TestingModule } from '@nestjs/testing';
import { ComFactoryController } from './com-factory.controller';

describe('ComFactoryController', () => {
  let controller: ComFactoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComFactoryController],
    }).compile();

    controller = module.get<ComFactoryController>(ComFactoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
