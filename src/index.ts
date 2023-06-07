import {
  MSD_BASE_URL,
  ERROR_CODES,
  MSD_API_KEY,
  MSD_USER_ID,
  MSD_IS_LOG_ENABLED,
} from './constants';
import { useEvents } from './events';
import { useRecommendations } from './recommendations';
import { logger } from './utils/logger';
import { generateAndSaveMadId, saveToStorage } from './utils/storage';

const init = async ({
  token,
  baseUrl,
  loggingEnabled = false,
}: {
  token: string;
  baseUrl: string;
  loggingEnabled: boolean;
}) => {
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
    logger.error(
      `{ status: ${ERROR_CODES.ERR007.code}, message: ${ERROR_CODES.ERR007.message} }`
    );
  }
  await saveToStorage(MSD_IS_LOG_ENABLED, loggingEnabled.toString());
  await generateAndSaveMadId();
};

const setUser = async ({ userId }: { userId: string }) => {
  if (userId?.length > 0) {
    await saveToStorage(MSD_USER_ID, userId);
  } else {
    logger.error(
      `{ status: ${ERROR_CODES.ERR008.code}, message: ${ERROR_CODES.ERR008.message} }`
    );
  }
};

export { init, setUser, useEvents, useRecommendations };
