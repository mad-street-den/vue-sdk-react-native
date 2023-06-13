export interface IDiscoverEventsResponse {
  ['account-metadata']?: AccountMetadata | null;
  pages?: Page[] | null;
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

interface Page {
  android?: PageDetails | null;
  clientId?: string | null;
  createdTs?: string | null;
  desktop?: PageDetails | null;
  id?: string | null;
  ios?: PageDetails | null;
  mobile?: PageDetails | null;
  name?: string | null;
  type?: string | null;
  updated_ts?: string | null;
}

interface PageDetails {
  analytics?: Analytics | null;
  created_date?: string | null;
  custom_parameters?: string | null;
  event_listeners?: string | null;
  extras?: string | null;
  field_identifiers?: FieldIdentifier[] | null;
  id?: number | null;
  name?: string | null;
  page_identifier?: PageIdentifier | null;
  parent_page?: number | null;
  platform?: number | null;
  preview_url?: string | null;
  slots?: Slot[] | null;
  status?: string | null;
  type?: string | null;
  updated_date?: string | null;
  url?: string | null;
  user_identifier?: UserIdentifier | null;
  uuidIdentifier?: UserIdentifier | null;
}

interface UserIdentifier {
  hash?: boolean | null;
  conditions?: Condition[] | null;
}

interface Condition {
  type?: string | null;
}

interface Slot {
  client_id?: string | null;
  extras?: string | null;
  id?: number | null;
  name?: string | null;
  page_id?: number | null;
  placement?: Placement | null;
  slot_behaviour?: string | null;
}

interface Placement {
  path?: string | null;
  type?: string | null;
  position?: string | null;
}

interface FieldIdentifier {
  catalog_id?: string | null;
  conditions?: FieldCondition[] | null;
  field?: string | null;
  multi_occurrence?: boolean | null;
  primary_key?: boolean | null;
}

interface FieldCondition {
  type?: string | null;
  value?: string | null;
}

interface PageIdentifier {
  conditions?: PageCondition[] | null;
  operation?: string | null;
}

interface PageCondition {
  type?: string | null;
  value?: string | null;
  predicate?: string | null;
}

interface Analytics {
  events?: AnalyticsEvent[] | null;
}

interface AnalyticsEvent {
  action?: string | null;
  event_meta?: string | null;
  event_name?: string | null;
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
