import {
  MSD_BASE_URL,
  MAD_UUID,
  MSD_API_KEY,
  MSD_USER_ID,
  SDK_PLATFORM,
  TIMEOUT_DURATION,
  ERROR_CODES,
} from '../constants';
import { isNetConnected } from '../utils/network';
import { getFromStorage } from '../utils/storage';
import { logger } from '../utils/logger';
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
      throw new Error(
        `{ status: ${ERROR_CODES.ERR005.code}, message: ${ERROR_CODES.ERR005.message} }`
      );
    }

    const defaultHeaders = await getDefaultHeaders();
    const requestParam: RequestParam = {
      method,
      headers: {
        ...defaultHeaders,
        ...headers,
      },
    };

    const apiParams = {
      ...params,
      blox_uuid: await getFromStorage(MAD_UUID),
      user_id: await getFromStorage(MSD_USER_ID),
      platform: SDK_PLATFORM,
    };

    requestParam.body = JSON.stringify(apiParams);
    const baseUrl = await getFromStorage(MSD_BASE_URL);
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), TIMEOUT_DURATION);
    const response = await fetch(`${baseUrl}/${url}`, {
      ...requestParam,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    logger.error(`ERROR: ${error}`);
    return { errors: error };
  }
};

export type { IError };
export { ApiMethods };
