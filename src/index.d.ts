import type {
  IGetRecommendationRequest,
  VueSDKConfig,
} from './recommendations/types.ts';

declare module 'index' {
  export const useEvents: () => {
    track: (
      eventName: string,
      params?: object,
      correlationId?: string | null
    ) => Promise<void>;
  };

  export const useRecommendations: () => {
    getRecommendationsByStrategy: (
      strategyReference: string,
      properties: IGetRecommendationRequest,
      correlationId?: string | null,
      vueSdkConfig?: VueSDKConfig
    ) => Promise<void>;
    getRecommendationsByModule: (
      moduleReference: string,
      properties: IGetRecommendationRequest,
      correlationId?: string | null,
      vueSdkConfig?: VueSDKConfig
    ) => Promise<void>;
    getRecommendationsByPage: (
      pageReference: string,
      properties: IGetRecommendationRequest,
      correlationId?: string | null,
      vueSdkConfig?: VueSDKConfig
    ) => Promise<void>;
    recommendations: {
      data: {
        recommendationsByModule: Array<object>;
        recommendationsByPage: Array<object>;
        recommendationsByStrategy: Array<object>;
      };
      isLoading: {
        isRecommendationsByModuleLoading: boolean;
        isRecommendationsByPageLoading: boolean;
        isRecommendationsByStrategyLoading: boolean;
      };
      error: {
        recommendationsByModuleError: object | null;
        recommendationsByPageError: object | null;
        recommendationsByStrategyError: object | null;
      };
    };
  };

  export const useDiscoverEvents: () => {
    discoverEvents: () => Promise<void>;
    discoverEventsResponse: object;
  };

  export const initialize: (options: {
    token: string;
    baseUrl: string;
    loggingEnabled?: boolean;
  }) => Promise<void>;

  export const setUser: (options: { msdUserId: string }) => Promise<void>;
  export const resetUser: () => Promise<void>;
  export const setBloxUUID: (bloxUuid: string) => Promise<void>;
  export const getBloxUUID: () => Promise<void>;
}
