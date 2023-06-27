// api.test.js
import fetchMock from 'jest-fetch-mock';
import { apiCall, ApiMethods } from '..';
import { isNetConnected } from '../../native-bridge';
import { getFromStorage } from '../../utils/storage';
import { MSD_API_KEY, ERROR_CODES, MSD_BASE_URL } from '../../constants';

jest.mock('../../native-bridge');
jest.mock('../../utils/storage');
jest.mock('../../utils/logger');

describe('apiCall', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  const baseUrl = 'http://baseUrl';
  const apiKey = 'api-key';

  it('should make a successful API call', async () => {
    const testEndPoint = 'test-endpoint';
    const sampleResult = JSON.stringify({
      data: 'sample data',
    });

    const sampleResponse = {
      result: { data: 'sample data' },
      status: 200,
    };

    (
      isNetConnected as jest.MockedFunction<typeof isNetConnected>
    ).mockResolvedValue(true);
    (getFromStorage as jest.MockedFunction<typeof getFromStorage>)
      .mockResolvedValueOnce(apiKey)
      .mockResolvedValueOnce(baseUrl);

    fetchMock.mockResponseOnce(sampleResult, {
      status: 200,
    });

    const result = await apiCall({
      url: testEndPoint,
      method: ApiMethods.GET,
    });

    expect(isNetConnected).toHaveBeenCalled();
    expect(getFromStorage).toHaveBeenNthCalledWith(1, MSD_API_KEY);
    expect(getFromStorage).toHaveBeenNthCalledWith(2, MSD_BASE_URL);
    expect(fetchMock).toHaveBeenCalledWith(`${baseUrl}/${testEndPoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      signal: expect.any(AbortSignal),
    });
    expect(result).toEqual(sampleResponse);
  });

  it('should handle network connection error', async () => {
    const testEndPoint = 'test-endpoint';

    (
      isNetConnected as jest.MockedFunction<typeof isNetConnected>
    ).mockResolvedValue(false);
    (getFromStorage as jest.MockedFunction<typeof getFromStorage>)
      .mockResolvedValueOnce(apiKey)
      .mockResolvedValueOnce(baseUrl);

    const result = await apiCall({
      url: testEndPoint,
      method: ApiMethods.GET,
      params: {},
      headers: {},
    });

    expect(isNetConnected).toHaveBeenCalled();
    expect(getFromStorage).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(result).toEqual({
      status: ERROR_CODES.ERR005.code,
      result: {
        status: ERROR_CODES.ERR005.code,
        message: ERROR_CODES.ERR005.message,
      },
    });
  });

  it('should handle API call error 500', async () => {
    const testEndPoint = 'invalid-endpoint';
    const sampleResponse = JSON.stringify({ data: 'Server unavailable' });
    (
      isNetConnected as jest.MockedFunction<typeof isNetConnected>
    ).mockResolvedValue(true);
    (getFromStorage as jest.MockedFunction<typeof getFromStorage>)
      .mockResolvedValue(baseUrl)
      .mockResolvedValue(apiKey);

    fetchMock.mockResponseOnce(sampleResponse, {
      status: 500,
    });

    const result = await apiCall({
      url: testEndPoint,
      method: ApiMethods.GET,
      params: {},
      headers: {},
    });

    expect(isNetConnected).toHaveBeenCalled();
    expect(getFromStorage).toHaveBeenNthCalledWith(1, MSD_API_KEY);
    expect(getFromStorage).toHaveBeenNthCalledWith(2, MSD_BASE_URL);
    expect(fetchMock).toHaveBeenCalledWith(`${baseUrl}/${testEndPoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      signal: expect.any(AbortSignal),
    });
    expect(result).toEqual({
      status: ERROR_CODES.ERR0012.code,
      result: {
        status: ERROR_CODES.ERR0012.code,
        message: ERROR_CODES.ERR0012.message,
      },
    });
  });
});
