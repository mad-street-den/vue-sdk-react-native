import {
  MSD_BASE_URL,
  MSD_API_KEY,
  TIMEOUT_DURATION,
  ERROR_CODES,
} from '../constants';
import { isNetConnected } from '../native-bridge';
import { getFromStorage } from '../utils';
import type { ApiCallParams, IError, RequestParam } from './types';

enum ApiMethods {
  POST = 'POST',
  GET = 'GET',
}

const getDefaultHeaders = async (): Promise<HeadersInit_> => {
  const apiKey = await getFromStorage(MSD_API_KEY);
  return {
    'Content-Type': 'application/json',
    'x-api-key': apiKey || '',
  };
};

export const apiCall = async ({
  url,
  method,
  params = {},
  headers = {},
}: ApiCallParams): Promise<any> => {
  try {
    const isConnected = await isNetConnected();
    if (!isConnected) {
      return {
        status: ERROR_CODES.ERR005.code,
        result: {
          status: ERROR_CODES.ERR005.code,
          message: ERROR_CODES.ERR005.message,
        },
      };
    } else {
      const defaultHeaders = await getDefaultHeaders();
      const requestParam: RequestParam = {
        method,
        headers: {
          ...defaultHeaders,
          ...headers,
        },
      };

      if (Object.keys(params).length) {
        requestParam.body = JSON.stringify(params);
      }
      const baseUrl = await getFromStorage(MSD_BASE_URL);
      if (!baseUrl) {
        console.error(
          `{ status: ${ERROR_CODES.ERR0013.code}, message: ${ERROR_CODES.ERR0013.message} }`
        );
        return {
          status: ERROR_CODES.ERR0013.code,
          result: {
            status: ERROR_CODES.ERR0013.code,
            message: ERROR_CODES.ERR0013.message,
          },
        };
      }
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), TIMEOUT_DURATION);
      const response = await fetch(`${baseUrl}/${url}`, {
        ...requestParam,
        signal: controller.signal,
      });
      clearTimeout(id);
      try {
        if (response.status >= 500 && response.status <= 599) {
          return {
            status: ERROR_CODES.ERR0012.code,
            result: {
              status: ERROR_CODES.ERR0012.code,
              message: ERROR_CODES.ERR0012.message,
            },
          };
        }
        const result = await response.json();
        if (response.status === 200) {
          if (!result || !result.data) {
            return {
              status: ERROR_CODES.ERR009.code,
              result: {
                status: ERROR_CODES.ERR009.code,
                message: ERROR_CODES.ERR009.message,
              },
            };
          }
          return { result, status: response.status };
        } else {
          if (!!result && typeof result === 'object') {
            return { result, status: response.status };
          } else {
            return {
              status: ERROR_CODES.ERR0011.code,
              result: {
                status: ERROR_CODES.ERR0011.code,
                message: ERROR_CODES.ERR0011.message,
              },
            };
          }
        }
      } catch (err) {
        return {
          status: ERROR_CODES.ERR0010.code,
          result: {
            status: ERROR_CODES.ERR0010.code,
            message: ERROR_CODES.ERR0010.message,
          },
        };
      }
    }
  } catch (error: any) {
    if (error.message === 'Aborted') {
      return {
        status: ERROR_CODES.ERR006.code,
        result: {
          status: ERROR_CODES.ERR006.code,
          message: ERROR_CODES.ERR006.message,
        },
      };
    } else {
      return {
        status: ERROR_CODES.ERR0012.code,
        result: {
          status: ERROR_CODES.ERR0012.code,
          message: ERROR_CODES.ERR0012.message,
        },
      };
    }
  }
};

export type { IError };
export { ApiMethods };
