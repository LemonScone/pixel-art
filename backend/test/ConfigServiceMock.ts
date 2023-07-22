import { ConfigService } from '@nestjs/config';

const ConfigServiceMock = {
  provide: ConfigService,
  useValue: {
    get: jest.fn((key: string) => {
      switch (key) {
        case 'JWT_SECRET':
          return 'secret';
        case 'JWT_EXPIRATION_TIME':
          return '36000';
        case 'JWT_REFRESH_SECRET':
          return 'refresh_secret';
        case 'JWT_REFRESH_EXPIRATION_TIME':
          return '36000';
        default:
          return null;
      }
    }),
  },
};
export default ConfigServiceMock;
