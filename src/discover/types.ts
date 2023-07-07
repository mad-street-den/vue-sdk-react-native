export interface IDiscoverEventsResponse {
  ['account-metadata']?: AccountMetadata | null;
  events?: EventData[] | null;
}

interface AccountMetadata {
  blox_api_url?: string | null;
  client_id?: string | null;
  created_ts?: string | null;
  currency?: string | null;
  currency_code?: string | null;
  id?: string | null;
  language?: string | null;
  pdp_target_same?: boolean | null;
  updated_ts?: string | null;
}

export interface EventData {
  action?: string | null;
  event_meta?: string | null;
  event_name?: string | null;
  events_schema?: EventSchema[] | null;
}

interface EventSchema {
  catalog_id?: string | null;
  catalog_key?: string | null;
  data_type?: string | null;
  explode_field?: boolean | null;
  mandatory?: boolean | null;
  meta?: string | null;
  source_field?: string | null;
}
