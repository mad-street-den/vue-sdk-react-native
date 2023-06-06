export type IGetRecommendationRequest = {
  catalogs: object;
  module_name?: string;
  medium?: string;
  integration_mode?: string;
  max_content?: number;
  min_content?: number;
  page_num?: number;
  skip_cache?: boolean;
  explain?: boolean;
  config?: object;
  min_bundles?: number;
  max_bundles?: number;
  unbundle?: boolean;
};

export type IGetRecommendationBaseParams =
  | {
      strategy_name: string;
    }
  | {
      module_name: string;
    }
  | {
      page_name: string;
    }
  | {
      text_name: string;
    };
