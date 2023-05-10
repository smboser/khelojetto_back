import { Test, TestingModule } from '@nestjs/testing';
import { SetPowerService } from './set-power.service';

describe('SetPowerService', () => {
  let service: SetPowerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SetPowerService],
    }).compile();

    service = module.get<SetPowerService>(SetPowerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
