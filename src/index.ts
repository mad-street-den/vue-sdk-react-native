import { MSD_BASE_URL, ERROR_CODES, MSD_API_KEY, USER_ID } from './constants';
import { logger } from './utils/logger';
import { generateAndSaveMadId, saveToStorage } from './utils/storage';

const init = async ({ token, baseUrl }: { token: string; baseUrl: string }) => {
  if (token?.length > 0) {
    await saveToStorage(MSD_API_KEY, token);
  } else {
    logger.error(
      `{ status: ${ERROR_CODES.ERR001.code}, message: ${ERROR_CODES.ERR001.message} }`
    );
  }
  if (baseUrl?.length > 0) {
    await saveToStorage(MSD_BASE_URL, baseUrl);
  } else {
    logger.error(`{message: Empty baseUrl}`);
  }
  await generateAndSaveMadId();
};

const setUser = async ({ userId }: { userId: string }) => {
  if (userId?.length > 0) {
    await saveToStorage(USER_ID, userId);
  } else {
    logger.error(`{message: Empty userId}`);
  }
};

export { init, setUser };
