import { EventData } from '../discover/types';
import { DISCOVER_EVENTS_MAP, getTrackApiBasicParams } from '../constants';
import { saveToStorage } from './storage';

export const constructDiscoverEventsMap = async (
  discoverResponse: EventData[]
) => {
  const discoverEventsMap: Record<string, any> = {};
  discoverResponse?.forEach((item) => {
    if (item?.event_name) {
      discoverEventsMap[item.event_name] = {};
      const trackApiBasicParams = getTrackApiBasicParams();
      item.events_schema?.forEach((schemaItem) => {
        if (
          item?.event_name &&
          schemaItem?.meta &&
          schemaItem?.source_field &&
          trackApiBasicParams.includes(schemaItem?.meta)
        ) {
          discoverEventsMap[item.event_name][schemaItem.meta] =
            schemaItem.source_field;
        }
      });
    }
  });
  if (Object.keys(discoverEventsMap)?.length) {
    await saveToStorage(DISCOVER_EVENTS_MAP, JSON.stringify(discoverEventsMap));
  }
};
