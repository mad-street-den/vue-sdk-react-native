import { ERROR_CODES, EVENT_MEDIUM } from '../constants';
import { logger } from '../utils/logger';
import { MSD_TRACK_ENDPOINT } from '../constants/config';
import { ApiMethods, apiCall } from '../api';
import { getBundleId } from '../native-bridge';

export const useEvents = () => {
  const track = async (eventName: string, params: object = {}) => {
    if (eventName?.length > 0) {
      const bundleId = await getBundleId();
      const eventParams = {
        medium: EVENT_MEDIUM,
        url: bundleId,
        event_name: eventName,
        timestamp: Date.now(),
        ...params,
      };
      if (!params || Object.keys(params).length === 0) {
        logger.error(
          `{ status: ${ERROR_CODES.ERR003.code}, message: ${ERROR_CODES.ERR003.message} }`
        );
      }
      await apiCall({
        url: MSD_TRACK_ENDPOINT,
        method: ApiMethods.POST,
        params: eventParams,
      });
    } else {
      logger.error(
        `{ status: ${ERROR_CODES.ERR002.code}, message: ${ERROR_CODES.ERR002.message} }`
      );
    }
  };
  return {
    track,
  };
};
