import { Platform } from 'react-native';

export const MSD_SEARCH_ENDPOINT = 'search';
export const MSD_TRACK_ENDPOINT = 'events/track';
export const MSD_DISCOVER_EVENTS_ENDPOINT = `search/configs/metadata-pages?platform=${Platform.OS}`;
