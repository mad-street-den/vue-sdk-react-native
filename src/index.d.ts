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
    recommendations: object;
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
