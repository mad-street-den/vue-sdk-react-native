import type { IGetRecommendationRequest } from './recommendations/types.ts';

declare module 'index' {
  export const useEvents: () => {
    track: (eventName: string, params?: object) => Promise<void>;
  };

  export const useRecommendations: () => {
    getRecommendationByStrategy: (
      strategyReference: string,
      properties: IGetRecommendationRequest
    ) => Promise<void>;
    getRecommendationByModule: (
      moduleReference: string,
      properties: IGetRecommendationRequest
    ) => Promise<void>;
    getRecommendationByPage: (
      pageReference: string,
      properties: IGetRecommendationRequest
    ) => Promise<void>;
    getRecommendationByText: (
      textReference: string,
      properties: IGetRecommendationRequest
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
  }) => Promise<void>;

  export const setUser: (options: { msdUserId: string }) => Promise<void>;
  export const resetUser: () => Promise<void>;
}
