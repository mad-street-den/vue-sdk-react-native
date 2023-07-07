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

export enum RecommendationsBaseParams {
  strategy_name = 'strategy_name',
  module_name = 'module_name',
  page_name = 'page_name',
  text_name = 'text_name',
}

export type IGetRecommendationsBaseParams =
  | {
      [RecommendationsBaseParams.strategy_name]: string;
    }
  | {
      [RecommendationsBaseParams.module_name]: string;
    }
  | {
      [RecommendationsBaseParams.page_name]: string;
    }
  | {
      [RecommendationsBaseParams.text_name]: string;
    };
