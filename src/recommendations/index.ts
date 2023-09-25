import { useState } from 'react';
import { Platform } from 'react-native';

import {
  API_SUCCESS_STATUS,
  ERROR_CODES,
  MAD_UUID,
  MSD_USER_ID,
  MSD_SEARCH_ENDPOINT,
  SDK_MEDIUM,
} from '../constants';
import { apiCall, ApiMethods, IError } from '../api';
import {
  IGetRecommendationRequest,
  IGetRecommendationsBaseParams,
  RecommendationsBaseParams,
  VueSDKConfig,
} from './types';
import { getFromStorage } from '../utils';
import { getBundleId } from '../native-bridge';

export const useRecommendations = () => {
  const [recommendationsByModule, setRecommendationsByModule] =
    useState<Array<object> | null>(null);
  const [recommendationsByPage, setRecommendationsByPage] =
    useState<Array<object> | null>(null);
  const [recommendationsByStrategy, setRecommendationsByStrategy] =
    useState<Array<object> | null>(null);

  const [recommendationsByModuleLoading, setRecommendationsByModuleLoading] =
    useState(false);
  const [recommendationsByPageLoading, setRecommendationsByPageLoading] =
    useState(false);
  const [
    recommendationsByStrategyLoading,
    setRecommendationsByStrategyLoading,
  ] = useState(false);

  const [recommendationsByModuleError, setRecommendationsByModuleError] =
    useState<IError | null>(null);
  const [recommendationsByPageError, setRecommendationsByPageError] =
    useState<IError | null>(null);
  const [recommendationsByStrategyError, setRecommendationsByStrategyError] =
    useState<IError | null>(null);

  const recommendationsSetterMap = {
    [RecommendationsBaseParams.module_name]: setRecommendationsByModule,
    [RecommendationsBaseParams.page_name]: setRecommendationsByPage,
    [RecommendationsBaseParams.strategy_name]: setRecommendationsByStrategy,
  };
  const recommendationsLoadingSetterMap = {
    [RecommendationsBaseParams.module_name]: setRecommendationsByModuleLoading,
    [RecommendationsBaseParams.page_name]: setRecommendationsByPageLoading,
    [RecommendationsBaseParams.strategy_name]:
      setRecommendationsByStrategyLoading,
  };

  const recommendationsErrorSetterMap = {
    [RecommendationsBaseParams.module_name]: setRecommendationsByModuleError,
    [RecommendationsBaseParams.page_name]: setRecommendationsByPageError,
    [RecommendationsBaseParams.strategy_name]:
      setRecommendationsByStrategyError,
  };

  const getRecommendations = async (
    baseParams: IGetRecommendationsBaseParams,
    properties: IGetRecommendationRequest,
    correlationId?: string | null,
    vueSdkConfig?: VueSDKConfig
  ) => {
    const baseParamKey = Object.keys(baseParams)[0];
    // recommendationsData Setter
    const setRecommendations =
      recommendationsSetterMap[baseParamKey as RecommendationsBaseParams];
    const setRecommendationsLoading =
      recommendationsLoadingSetterMap[
        baseParamKey as RecommendationsBaseParams
      ];
    const setRecommendationsError =
      recommendationsErrorSetterMap[baseParamKey as RecommendationsBaseParams];
    if (properties) {
      setRecommendationsLoading?.(true);
      setRecommendations?.(null);
      setRecommendationsError?.(null);
      const bundleId = await getBundleId();
      const userId = await getFromStorage(MSD_USER_ID);
      const params = {
        blox_uuid: await getFromStorage(MAD_UUID),
        ...(userId ? { user_id: userId } : {}),
        platform: vueSdkConfig?.platform ?? Platform.OS,
        url: vueSdkConfig?.url ?? bundleId,
        medium: vueSdkConfig?.medium ?? SDK_MEDIUM,
        referrer: vueSdkConfig?.referrer ?? Platform.OS,
        ...baseParams,
        ...properties,
      };

      try {
        const response = await apiCall({
          url: MSD_SEARCH_ENDPOINT,
          method: ApiMethods.POST,
          params,
          ...(correlationId
            ? { headers: { 'x-correlation-id': correlationId } }
            : {}),
        });
        setRecommendationsLoading?.(false);
        if (response) {
          const { status, result } = response;
          if (status === API_SUCCESS_STATUS) {
            setRecommendations?.(result?.data || null);
            setRecommendationsError?.(null);
          } else {
            setRecommendations?.(null);
            setRecommendationsError?.(result);
          }
        }
      } catch (err) {
        setRecommendationsLoading?.(false);
        setRecommendations?.(null);
        setRecommendationsError?.({
          errors: [
            {
              code: ERROR_CODES.ERR0011.code,
              message: ERROR_CODES.ERR0011.message,
            },
          ],
        });
      }
    } else {
      setRecommendationsLoading?.(false);
      setRecommendations?.(null);
      setRecommendationsError?.({
        errors: [
          {
            code: ERROR_CODES.ERR004.code,
            message: ERROR_CODES.ERR004.message,
          },
        ],
      });
    }
  };

  const getRecommendationsByStrategy = async (
    strategyReference: string,
    properties: IGetRecommendationRequest,
    correlationId?: string | null,
    vueSdkConfig?: VueSDKConfig
  ) => {
    getRecommendations(
      {
        [RecommendationsBaseParams.strategy_name]: strategyReference,
      },
      properties,
      correlationId,
      vueSdkConfig
    );
  };

  const getRecommendationsByModule = async (
    moduleReference: string,
    properties: IGetRecommendationRequest,
    correlationId?: string | null,
    vueSdkConfig?: VueSDKConfig
  ) => {
    getRecommendations(
      {
        [RecommendationsBaseParams.module_name]: moduleReference,
      },
      properties,
      correlationId,
      vueSdkConfig
    );
  };

  const getRecommendationsByPage = async (
    pageReference: string,
    properties: IGetRecommendationRequest,
    correlationId?: string | null,
    vueSdkConfig?: VueSDKConfig
  ) => {
    getRecommendations(
      {
        [RecommendationsBaseParams.page_name]: pageReference,
      },
      properties,
      correlationId,
      vueSdkConfig
    );
  };

  return {
    getRecommendationsByStrategy,
    getRecommendationsByModule,
    getRecommendationsByPage,
    recommendations: {
      data: {
        recommendationsByModule,
        recommendationsByPage,
        recommendationsByStrategy,
      },
      isLoading: {
        isRecommendationsByModuleLoading: recommendationsByModuleLoading,
        isRecommendationsByPageLoading: recommendationsByPageLoading,
        isRecommendationsByStrategyLoading: recommendationsByStrategyLoading,
      },
      error: {
        recommendationsByModuleError: recommendationsByModuleError,
        recommendationsByPageError: recommendationsByPageError,
        recommendationsByStrategyError: recommendationsByStrategyError,
      },
    },
  };
};
