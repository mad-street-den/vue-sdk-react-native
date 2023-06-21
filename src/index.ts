import { apiCall, ApiMethods } from './api';
import {
  MSD_BASE_URL,
  ERROR_CODES,
  MSD_API_KEY,
  MSD_USER_ID,
  MSD_IS_LOG_ENABLED,
  MSD_DISCOVER_EVENTS_ENDPOINT,
} from './constants';
import { useDiscoverEvents } from './discover';
import { EventData } from './discover/types';
import { useEvents } from './events';
import { useRecommendations } from './recommendations';
import {
  constructDiscoverEventsMap,
  logger,
  generateAndSaveMadId,
  saveToStorage,
  validateUrl,
} from './utils';

const init = async ({
  token,
  baseUrl,
  loggingEnabled = false,
}: {
  token: string;
  baseUrl: string;
  loggingEnabled?: boolean;
}) => {
  if (token?.length > 0) {
    await saveToStorage(MSD_API_KEY, token);
  } else {
    logger.error(
      `{ status: ${ERROR_CODES.ERR001.code}, message: ${ERROR_CODES.ERR001.message} }`
    );
  }
  if (baseUrl?.length > 0 && validateUrl(baseUrl)) {
    await saveToStorage(MSD_BASE_URL, baseUrl);
  } else {
    logger.error(
      `{ status: ${ERROR_CODES.ERR007.code}, message: ${ERROR_CODES.ERR007.message} }`
    );
  }
  await saveToStorage(MSD_IS_LOG_ENABLED, loggingEnabled.toString());
  await generateAndSaveMadId();
  try {
    const response = await apiCall({
      url: MSD_DISCOVER_EVENTS_ENDPOINT,
      method: ApiMethods.GET,
    });
    if (response) {
      if (response?.status === 200) {
        const result = await response.json();
        if (result.data?.events) {
          constructDiscoverEventsMap(result.data.events as EventData[]);
        }
      } else {
        logger.error(JSON.stringify(response));
      }
    }
  } catch (error: any) {
    logger.error(
      `{ status: ${ERROR_CODES.ERR0011.code}, message: ${ERROR_CODES.ERR0011.message} }`
    );
  }
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

const resetUser = async () => {
  await saveToStorage(MSD_USER_ID, '');
};

export {
  init,
  setUser,
  resetUser,
  useEvents,
  useRecommendations,
  useDiscoverEvents,
};
