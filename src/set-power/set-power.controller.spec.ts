import { Test, TestingModule } from '@nestjs/testing';
import { SetPowerController } from './set-power.controller';

describe('SetPowerController', () => {
  let controller: SetPowerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SetPowerController],
    }).compile();

    controller = module.get<SetPowerController>(SetPowerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
