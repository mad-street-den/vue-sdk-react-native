import type { IGetRecommendationRequest } from './recommendations/types.ts';

declare module 'index' {
  export const useEvents: () => {
    track: (
      eventName: string,
      params?: object,
      correlationId?: string | null
    ) => Promise<void>;
  };

  export const useRecommendations: () => {
    getRecommendationByStrategy: (
      strategyReference: string,
      properties: IGetRecommendationRequest,
      correlationId?: string | null
    ) => Promise<void>;
    getRecommendationByModule: (
      moduleReference: string,
      properties: IGetRecommendationRequest,
      correlationId?: string | null
    ) => Promise<void>;
    getRecommendationByPage: (
      pageReference: string,
      properties: IGetRecommendationRequest,
      correlationId?: string | null
    ) => Promise<void>;
    getRecommendationByText: (
      textReference: string,
      properties: IGetRecommendationRequest,
      correlationId?: string | null
    ) => Promise<void>;
    recommendations: {
      data: {
        recommendationsByModule: Array<object>;
        recommendationsByPage: Array<object>;
        recommendationsByStrategy: Array<object>;
        recommendationsByText: Array<object>;
      };
      isLoading: {
        isRecommendationsByModuleLoading: boolean;
        isRecommendationsByPageLoading: boolean;
        isRecommendationsByStrategyLoading: boolean;
        isRecommendationsByTextLoading: boolean;
      };
      error: {
        recommendationsByModuleError: object | null;
        recommendationsByPageError: object | null;
        recommendationsByStrategyError: object | null;
        recommendationsByTextError: object | null;
      };
    };
  };

  export const useDiscoverEvents: () => {
    discoverEvents: () => Promise<void>;
    discoverEventsResponse: object;
  };

  export const init: (options: {
    token: string;
    baseUrl: string;
    loggingEnabled?: boolean;
  }) => Promise<void>;

  export const setUser: (options: { msdUserId: string }) => Promise<void>;
  export const resetUser: () => Promise<void>;
}
