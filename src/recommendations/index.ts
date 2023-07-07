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
  const [recommendationsByText, setRecommendationsByText] =
    useState<Array<object> | null>(null);

  const [recommendationsByModuleLoading, setRecommendationsByModuleLoading] =
    useState(false);
  const [recommendationsByPageLoading, setRecommendationsByPageLoading] =
    useState(false);
  const [
    recommendationsByStrategyLoading,
    setRecommendationsByStrategyLoading,
  ] = useState(false);
  const [recommendationsByTextLoading, setRecommendationsByTextLoading] =
    useState(false);

  const [recommendationsByModuleError, setRecommendationsByModuleError] =
    useState<IError | null>(null);
  const [recommendationsByPageError, setRecommendationsByPageError] =
    useState<IError | null>(null);
  const [recommendationsByStrategyError, setRecommendationsByStrategyError] =
    useState<IError | null>(null);
  const [recommendationsByTextError, setRecommendationsByTextError] =
    useState<IError | null>(null);

  const recommendationsSetterMap = {
    [RecommendationsBaseParams.module_name]: setRecommendationsByModule,
    [RecommendationsBaseParams.page_name]: setRecommendationsByPage,
    [RecommendationsBaseParams.strategy_name]: setRecommendationsByStrategy,
    [RecommendationsBaseParams.text_name]: setRecommendationsByText,
  };
  const recommendationsLoadingSetterMap = {
    [RecommendationsBaseParams.module_name]: setRecommendationsByModuleLoading,
    [RecommendationsBaseParams.page_name]: setRecommendationsByPageLoading,
    [RecommendationsBaseParams.strategy_name]:
      setRecommendationsByStrategyLoading,
    [RecommendationsBaseParams.text_name]: setRecommendationsByTextLoading,
  };

  const recommendationsErrorSetterMap = {
    [RecommendationsBaseParams.module_name]: setRecommendationsByModuleError,
    [RecommendationsBaseParams.page_name]: setRecommendationsByPageError,
    [RecommendationsBaseParams.strategy_name]:
      setRecommendationsByStrategyError,
    [RecommendationsBaseParams.text_name]: setRecommendationsByTextError,
  };

  const getRecommendations = async (
    baseParams: IGetRecommendationsBaseParams,
    properties: IGetRecommendationRequest,
    correlationId?: string | null
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
        platform: Platform.OS,
        url: bundleId,
        medium: SDK_MEDIUM,
        referrer: Platform.OS,
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
    correlationId?: string | null
  ) => {
    getRecommendations(
      {
        [RecommendationsBaseParams.strategy_name]: strategyReference,
      },
      properties,
      correlationId
    );
  };

  const getRecommendationsByModule = async (
    moduleReference: string,
    properties: IGetRecommendationRequest,
    correlationId?: string | null
  ) => {
    getRecommendations(
      {
        [RecommendationsBaseParams.module_name]: moduleReference,
      },
      properties,
      correlationId
    );
  };

  const getRecommendationsByPage = async (
    pageReference: string,
    properties: IGetRecommendationRequest,
    correlationId?: string | null
  ) => {
    getRecommendations(
      {
        [RecommendationsBaseParams.page_name]: pageReference,
      },
      properties,
      correlationId
    );
  };

  const getRecommendationsByText = async (
    textReference: string,
    properties: IGetRecommendationRequest,
    correlationId?: string | null
  ) => {
    getRecommendations(
      {
        [RecommendationsBaseParams.page_name]: textReference,
      },
      properties,
      correlationId
    );
  };

  return {
    getRecommendationsByStrategy,
    getRecommendationsByModule,
    getRecommendationsByPage,
    getRecommendationsByText,
    recommendations: {
      data: {
        recommendationsByModule,
        recommendationsByPage,
        recommendationsByStrategy,
        recommendationsByText,
      },
      isLoading: {
        isRecommendationsByModuleLoading: recommendationsByModuleLoading,
        isRecommendationsByPageLoading: recommendationsByPageLoading,
        isRecommendationsByStrategyLoading: recommendationsByStrategyLoading,
        isRecommendationsByTextLoading: recommendationsByTextLoading,
      },
      error: {
        recommendationsByModuleError: recommendationsByModuleError,
        recommendationsByPageError: recommendationsByPageError,
        recommendationsByStrategyError: recommendationsByStrategyError,
        recommendationsByTextError: recommendationsByTextError,
      },
    },
  };
};
