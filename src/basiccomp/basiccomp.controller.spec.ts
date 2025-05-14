import { Test, TestingModule } from '@nestjs/testing';
import { BasiccompController } from './basiccomp.controller';

describe('BasiccompController', () => {
  let controller: BasiccompController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasiccompController],
    }).compile();

    controller = module.get<BasiccompController>(BasiccompController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
