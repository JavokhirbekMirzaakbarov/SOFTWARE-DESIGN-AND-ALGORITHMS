import { mockClient, mockExecutor } from './mocks';

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fetchExecutor = () => sleep(500)
  .then(() => mockExecutor);

export const fetchClient = () => sleep(700)
  .then(() => mockClient);
