import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../../../../lib';
import { AppModule } from '../app.module';

describe('Optional Generic()', () => {
  let app: INestApplication;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule.default()],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`should allow a key of the interface`, () => {
    const configService = moduleRef.get<ConfigService<{ port: string }>>(
      ConfigService,
    );

    const port = configService.get('port');
    expect(port).toBeTruthy();
  });

  it(`should allow any key without a generic`, () => {
    const configService = moduleRef.get<ConfigService>(ConfigService);
    const port = configService.get('port');

    expect(port).toBeTruthy();
  });

  afterEach(async () => {
    await app.close();
  });
});