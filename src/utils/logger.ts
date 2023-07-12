import { RequestParam } from '../api/types';
import { MSD_IS_LOG_ENABLED } from '../constants';
import { getFromStorage } from './storage';

enum LogLevel {
  INFO,
  ERROR,
}

const levelLogFns = {
  [LogLevel.INFO]: console.log,
  [LogLevel.ERROR]: console.error,
};

export const logger = {
  log: async (level: LogLevel.INFO | LogLevel.ERROR, message: string) => {
    const timestamp = new Date().toISOString();
    const levelString = LogLevel[level]?.toUpperCase();
    const levelLogFn = levelLogFns[level];
    const isLogEnabled = await getFromStorage(MSD_IS_LOG_ENABLED);
    if (isLogEnabled === 'true') {
      levelLogFn(`[${timestamp}] [${levelString}] ${message}`);
    }
  },
  error: function (error: string) {
    this.log(LogLevel.ERROR, error);
  },
  info: function (message: string) {
    this.log(LogLevel.INFO, message);
  },
};

export const printAPIRequestResponse = (args: {
  requestParams: RequestParam & { url: string };
  responseData: object;
  response: Response | null;
  error: Error | null;
}) => {
  const { requestParams, responseData, response, error } = args;
  // Print API request details
  logger.info('\n------Request------');
  if (requestParams.url) {
    logger.info(`URL: ${requestParams.url}`);
  }

  if (requestParams.method) {
    logger.info(`HTTP Method: ${requestParams.method}`);
  }

  if (requestParams.headers) {
    logger.info('Headers:');
    for (const [key, value] of Object.entries(requestParams.headers ?? {})) {
      logger.info(`${key}: ${value}`);
    }
  }

  if (requestParams.body) {
    logger.info(`Body: ${requestParams.body}`);
  }

  // Print API response details
  logger.info('\n------Response------');
  logger.info(`Response Status Code: ${response?.status}`);

  const responseHeaders = response?.headers as any as {
    map: { [key: string]: string };
  };
  if (responseHeaders) {
    logger.info('Response Headers:');
    for (const [key, value] of Object.entries(responseHeaders.map ?? {})) {
      logger.info(`${key}: ${value}`);
    }
  }

  if (responseData) {
    logger.info(`Response Body: ${JSON.stringify(responseData)}\n`);
  }

  if (error) {
    logger.info(`Error: ${JSON.stringify(error)}\n`);
  }
};
