import { useState } from 'react';

import {
  API_SUCCESS_STATUS,
  ERROR_CODES,
  MAD_UUID,
  MSD_USER_ID,
  SDK_PLATFORM,
} from '../constants';
import { apiCall, ApiMethods, IError } from '../api';
import type {
  IGetRecommendationRequest,
  IGetRecommendationBaseParams,
} from './types';
import { MSD_SEARCH_ENDPOINT } from '../constants/config';
import { getFromStorage } from '../utils/storage';

export const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState<object | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<IError | null>(null);

  const getRecommendation = async (
    baseParams: IGetRecommendationBaseParams,
    properties: IGetRecommendationRequest
  ) => {
    if (properties) {
      setLoading(true);
      const params = {
        blox_uuid: await getFromStorage(MAD_UUID),
        user_id: await getFromStorage(MSD_USER_ID),
        platform: SDK_PLATFORM,
        ...baseParams,
        ...properties,
      };

      try {
        const response = await apiCall({
          url: MSD_SEARCH_ENDPOINT,
          method: ApiMethods.POST,
          params,
        });
        const result = await response.json();
        setLoading(false);
        if (response?.status === API_SUCCESS_STATUS) {
          setRecommendations(result?.data || null);
        } else {
          setError(result);
        }
      } catch (err) {
        setLoading(false);
        setRecommendations(null);
        setError({
          errors: [
            {
              code: ERROR_CODES.ERR006.code,
              message: ERROR_CODES.ERR006.message,
            },
          ],
        });
      }
    } else {
      setRecommendations(null);
      setError({
        errors: [
          {
            code: ERROR_CODES.ERR004.code,
            message: ERROR_CODES.ERR004.message,
          },
        ],
      });
    }
  };

  const getRecommendationByStrategy = async (
    strategyReference: string,
    properties: IGetRecommendationRequest
  ) => {
    getRecommendation(
      {
        strategy_name: strategyReference,
      },
      properties
    );
  };

  const getRecommendationByModule = async (
    moduleReference: string,
    properties: IGetRecommendationRequest
  ) => {
    getRecommendation(
      {
        module_name: moduleReference,
      },
      properties
    );
  };

  const getRecommendationByPage = async (
    pageReference: string,
    properties: IGetRecommendationRequest
  ) => {
    getRecommendation(
      {
        page_name: pageReference,
      },
      properties
    );
  };

  const getRecommendationByText = async (
    textReference: string,
    properties: IGetRecommendationRequest
  ) => {
    getRecommendation(
      {
        text_name: textReference,
      },
      properties
    );
  };

  return {
    getRecommendationByStrategy,
    getRecommendationByModule,
    getRecommendationByPage,
    getRecommendationByText,
    recommendations: { data: recommendations, isLoading: loading, error },
  };
};
