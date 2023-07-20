import { Platform } from 'react-native';

export { ERROR_CODES } from './errorCodes';
export {
  MSD_DISCOVER_EVENTS_ENDPOINT,
  MSD_SEARCH_ENDPOINT,
  MSD_TRACK_ENDPOINT,
} from './config';

export const MSD_BASE_URL = 'MSD_BASE_URL';
export const MSD_API_KEY = 'MSD_API_KEY';
export const MSD_USER_ID = 'MSD_USER_ID';
export const MAD_UUID = 'MAD_UUID';
export const MSD_IS_LOG_ENABLED = 'MSD_IS_LOG_ENABLED';
export const TIMEOUT_DURATION = 10000;
export const SDK_MEDIUM = 'application';
export const NETWORK_TEST_URL = 'https://www.google.com';
export const API_SUCCESS_STATUS = 200;
export const DISCOVER_EVENTS_MAP = 'DISCOVER_EVENTS_MAP';

export enum TrackApiBasicParams {
  user_id = 'user_id',
  blox_uuid = 'blox_uuid',
  platform = 'platform',
  url = 'url',
  medium = 'medium',
  referrer = 'referrer',
}

export const getTrackApiBasicParams = () => {
  return Object.keys(TrackApiBasicParams);
};

export const LINKING_ERROR =
  `The package 'vue-sdk-react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';
