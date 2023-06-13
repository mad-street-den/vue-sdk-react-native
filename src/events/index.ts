import { Platform } from 'react-native';

import {
  ERROR_CODES,
  getTrackApiBasicParams,
  EVENT_MEDIUM,
  MAD_UUID,
  MSD_USER_ID,
  SDK_PLATFORM,
  DISCOVER_EVENTS_MAP,
  TrackApiBasicParams,
  API_SUCCESS_STATUS,
} from '../constants';
import { logger } from '../utils/logger';
import {
  MSD_DISCOVER_EVENTS_ENDPOINT,
  MSD_TRACK_ENDPOINT,
} from '../constants/config';
import { ApiMethods, apiCall } from '../api';
import { getFromStorage } from '../utils/storage';
import { constructDiscoverEventsMap } from '../utils/discover';
import { getBundleId } from '../native-bridge';

export const useEvents = () => {
  const track = async (eventName: string, params: object = {}) => {
    let configMapResponse = await getFromStorage(DISCOVER_EVENTS_MAP);
    let discoverEventsMap;
    if (configMapResponse) {
      discoverEventsMap = JSON.parse(configMapResponse);
    }
    try {
      if (!Object.keys(discoverEventsMap)?.length) {
        const response = await apiCall({
          url: MSD_DISCOVER_EVENTS_ENDPOINT,
          method: ApiMethods.GET,
        });
        const result = await response.json();
        if (result.data?.events) {
          await constructDiscoverEventsMap(result.data.events);
          configMapResponse = await getFromStorage(DISCOVER_EVENTS_MAP);
          if (configMapResponse) {
            discoverEventsMap = JSON.parse(configMapResponse);
          }
        }
      }
    } catch (error) {
      logger.error(`ERROR: ${error}`);
    }
    if (eventName?.length > 0) {
      try {
        const configMapForEvent = discoverEventsMap[eventName];
        const bundleId = await getBundleId();
        const eventApiBasicParamsMap: Record<string, string | number> = {};
        const trackApiBasicParamValueMap: Record<
          TrackApiBasicParams,
          string | number
        > = {
          blox_uuid: await getFromStorage(MAD_UUID),
          user_id: await getFromStorage(MSD_USER_ID),
          platform: SDK_PLATFORM,
          url: bundleId,
          medium: EVENT_MEDIUM,
          referrer: Platform.OS,
        };
        getTrackApiBasicParams().forEach((key) => {
          const value = trackApiBasicParamValueMap[key as TrackApiBasicParams];
          if (value) {
            eventApiBasicParamsMap[configMapForEvent?.[key] ?? key] = value;
          }
        });

        const eventParams = {
          event_name: eventName,
          ...eventApiBasicParamsMap,
          ...params,
        };
        if (!params || Object.keys(params).length === 0) {
          logger.error(
            `{ status: ${ERROR_CODES.ERR003.code}, message: ${ERROR_CODES.ERR003.message} }`
          );
        }
        const response = await apiCall({
          url: MSD_TRACK_ENDPOINT,
          method: ApiMethods.POST,
          params: eventParams,
        });
        if (response?.status === API_SUCCESS_STATUS) {
          const result = await response?.json();
          logger.info(JSON.stringify(result));
        }
      } catch (error) {
        logger.error(`ERROR: ${error}`);
      }
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
