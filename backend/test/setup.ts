import { clearDB } from './test.helper';

global.afterEach(async () => {
  await clearDB();
});
