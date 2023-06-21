import { useState } from 'react';

import { apiCall, ApiMethods, IError } from '../api';
import {
  API_SUCCESS_STATUS,
  ERROR_CODES,
  MSD_DISCOVER_EVENTS_ENDPOINT,
} from '../constants';
import { IDiscoverEventsResponse } from './types';

export const useDiscoverEvents = () => {
  const [discoverResponse, setDiscoverResponse] =
    useState<IDiscoverEventsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<IError | null>(null);

  const discoverEvents = async () => {
    setLoading(true);
    try {
      const response = await apiCall({
        url: MSD_DISCOVER_EVENTS_ENDPOINT,
        method: ApiMethods.GET,
      });
      if (response) {
        const result = await response.json();
        if (response?.status === API_SUCCESS_STATUS) {
          setDiscoverResponse(result?.data || null);
        } else {
          setError(result);
        }
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setDiscoverResponse(null);
      setError({
        errors: [
          {
            code: ERROR_CODES.ERR0011.code,
            message: ERROR_CODES.ERR0011.message,
          },
        ],
      });
    }
  };
  return {
    discoverEvents,
    discoverEventsResponse: {
      data: discoverResponse,
      isLoading: loading,
      error,
    },
  };
};
