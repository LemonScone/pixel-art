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
        case 'JWT_RESET_PASSWORD_SECRET':
          return 'secret';
        case 'JWT_RESET_PASSWORD_EXPIRATION_TIME':
          return '10800000';
        case 'EMAIL_ADDRESS':
          return 'no-reply@gridapixel.com';
        case 'EMAIL_PASSWORD':
          return '1234';
        case 'CLIENT_URL':
          return 'http://localhost:3000';

        default:
          return null;
      }
    }),
  },
};
export default ConfigServiceMock;
