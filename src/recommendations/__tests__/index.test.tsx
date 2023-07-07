import { renderHook, act } from '@testing-library/react-hooks';
import { useRecommendations } from '../index';
import { apiCall } from '../../api';
import { getFromStorage } from '../../utils/storage';
import { MSD_SEARCH_ENDPOINT, ERROR_CODES } from '../../constants';

jest.mock('../../api');
jest.mock('../../utils/storage');

describe('useRecommendations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const blox_uuid = 'http://baseUrl';
  const user_id = 'user-id';

  it('should fetch recommendations by module successfully', async () => {
    const mockRecommendationsByModuleResponse = {
      data: ['recommendation1'],
    };
    (getFromStorage as jest.MockedFunction<typeof getFromStorage>)
      .mockResolvedValueOnce(user_id)
      .mockResolvedValueOnce(blox_uuid)
      .mockResolvedValueOnce(user_id);

    (apiCall as jest.MockedFunction<typeof apiCall>).mockResolvedValue({
      status: 200,
      result: mockRecommendationsByModuleResponse,
    });

    const { result: _result, waitForNextUpdate } = renderHook(() =>
      useRecommendations()
    );

    act(() => {
      _result.current.getRecommendationsByModule(
        'module_1',
        {
          catalogs: {},
        },
        ''
      );
    });

    expect(
      _result.current.recommendations.isLoading.isRecommendationsByModuleLoading
    ).toBe(true);

    await waitForNextUpdate();

    expect(apiCall).toHaveBeenCalledTimes(1);
    expect(apiCall).toHaveBeenCalledWith({
      url: MSD_SEARCH_ENDPOINT,
      method: 'POST',
      params: {
        blox_uuid: expect.any(String),
        user_id: expect.any(String),
        platform: expect.any(String),
        medium: expect.any(String),
        referrer: expect.any(String),
        url: expect.any(String),
        module_name: 'module_1',
        catalogs: {},
      },
    });

    expect(
      _result.current.recommendations.data.recommendationsByModule
    ).toEqual(mockRecommendationsByModuleResponse.data);
    expect(
      _result.current.recommendations.isLoading.isRecommendationsByModuleLoading
    ).toBe(false);
    expect(
      _result.current.recommendations.error.recommendationsByModuleError
    ).toBe(null);
  });

  it('should handle API error when fetching recommendations by module', async () => {
    const mockError = {
      errors: [
        {
          code: ERROR_CODES.ERR0011.code,
          message: ERROR_CODES.ERR0011.message,
        },
      ],
    };
    (apiCall as jest.MockedFunction<typeof apiCall>).mockRejectedValueOnce(
      mockError
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useRecommendations()
    );

    expect(
      result.current.recommendations.isLoading.isRecommendationsByModuleLoading
    ).toBe(false);
    expect(
      result.current.recommendations.data.recommendationsByModule
    ).toBeNull();
    expect(
      result.current.recommendations.error.recommendationsByModuleError
    ).toBeNull();

    act(() => {
      result.current.getRecommendationsByModule(
        'module_1',
        { catalogs: {} },
        ''
      );
    });

    expect(
      result.current.recommendations.isLoading.isRecommendationsByModuleLoading
    ).toBe(true);

    await waitForNextUpdate();

    expect(apiCall).toHaveBeenCalledTimes(1);

    expect(result.current.recommendations.data.recommendationsByModule).toBe(
      null
    );
    expect(
      result.current.recommendations.isLoading.isRecommendationsByModuleLoading
    ).toBe(false);
    expect(
      result.current.recommendations.error.recommendationsByModuleError
    ).toEqual(mockError);
  });

  it('should fetch recommendations by strategy successfully', async () => {
    const mockRecommendationsByStrategyResponse = {
      data: ['recommendation1'],
    };
    (getFromStorage as jest.MockedFunction<typeof getFromStorage>)
      .mockResolvedValueOnce(user_id)
      .mockResolvedValueOnce(blox_uuid)
      .mockResolvedValueOnce(user_id);

    (apiCall as jest.MockedFunction<typeof apiCall>).mockResolvedValue({
      status: 200,
      result: mockRecommendationsByStrategyResponse,
    });

    const { result: _result, waitForNextUpdate } = renderHook(() =>
      useRecommendations()
    );

    act(() => {
      _result.current.getRecommendationsByStrategy(
        'strategy_1',
        {
          catalogs: {},
        },
        ''
      );
    });

    expect(
      _result.current.recommendations.isLoading
        .isRecommendationsByStrategyLoading
    ).toBe(true);

    await waitForNextUpdate();

    expect(apiCall).toHaveBeenCalledTimes(1);
    expect(apiCall).toHaveBeenCalledWith({
      url: MSD_SEARCH_ENDPOINT,
      method: 'POST',
      params: {
        blox_uuid: expect.any(String),
        user_id: expect.any(String),
        platform: expect.any(String),
        medium: expect.any(String),
        referrer: expect.any(String),
        url: expect.any(String),
        strategy_name: 'strategy_1',
        catalogs: {},
      },
    });

    expect(
      _result.current.recommendations.data.recommendationsByStrategy
    ).toEqual(mockRecommendationsByStrategyResponse.data);
    expect(
      _result.current.recommendations.isLoading
        .isRecommendationsByStrategyLoading
    ).toBe(false);
    expect(
      _result.current.recommendations.error.recommendationsByStrategyError
    ).toBe(null);
  });

  it('should handle API error when fetching recommendations by strategy', async () => {
    const mockError = {
      errors: [
        {
          code: ERROR_CODES.ERR0011.code,
          message: ERROR_CODES.ERR0011.message,
        },
      ],
    };
    (apiCall as jest.MockedFunction<typeof apiCall>).mockRejectedValueOnce(
      mockError
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useRecommendations()
    );

    expect(
      result.current.recommendations.isLoading
        .isRecommendationsByStrategyLoading
    ).toBe(false);
    expect(
      result.current.recommendations.data.recommendationsByStrategy
    ).toBeNull();
    expect(
      result.current.recommendations.error.recommendationsByStrategyError
    ).toBeNull();

    act(() => {
      result.current.getRecommendationsByStrategy(
        'strategy_1',
        {
          catalogs: {},
        },
        ''
      );
    });

    expect(
      result.current.recommendations.isLoading
        .isRecommendationsByStrategyLoading
    ).toBe(true);

    await waitForNextUpdate();

    expect(apiCall).toHaveBeenCalledTimes(1);

    expect(result.current.recommendations.data.recommendationsByStrategy).toBe(
      null
    );
    expect(
      result.current.recommendations.isLoading
        .isRecommendationsByStrategyLoading
    ).toBe(false);
    expect(
      result.current.recommendations.error.recommendationsByStrategyError
    ).toEqual(mockError);
  });

  it('should fetch recommendations by page successfully', async () => {
    const mockRecommendationsByPageResponse = {
      data: ['recommendation1'],
    };
    (getFromStorage as jest.MockedFunction<typeof getFromStorage>)
      .mockResolvedValueOnce(user_id)
      .mockResolvedValueOnce(blox_uuid)
      .mockResolvedValueOnce(user_id);

    (apiCall as jest.MockedFunction<typeof apiCall>).mockResolvedValue({
      status: 200,
      result: mockRecommendationsByPageResponse,
    });

    const { result: _result, waitForNextUpdate } = renderHook(() =>
      useRecommendations()
    );

    act(() => {
      _result.current.getRecommendationsByPage(
        'page_1',
        {
          catalogs: {},
        },
        ''
      );
    });

    expect(
      _result.current.recommendations.isLoading.isRecommendationsByPageLoading
    ).toBe(true);

    await waitForNextUpdate();

    expect(apiCall).toHaveBeenCalledTimes(1);
    expect(apiCall).toHaveBeenCalledWith({
      url: MSD_SEARCH_ENDPOINT,
      method: 'POST',
      params: {
        blox_uuid: expect.any(String),
        user_id: expect.any(String),
        platform: expect.any(String),
        page_name: 'page_1',
        medium: expect.any(String),
        referrer: expect.any(String),
        url: expect.any(String),
        catalogs: {},
      },
    });

    expect(_result.current.recommendations.data.recommendationsByPage).toEqual(
      mockRecommendationsByPageResponse.data
    );
    expect(
      _result.current.recommendations.isLoading.isRecommendationsByPageLoading
    ).toBe(false);
    expect(
      _result.current.recommendations.error.recommendationsByPageError
    ).toBe(null);
  });

  it('should handle API error when fetching recommendations by page', async () => {
    const mockError = {
      errors: [
        {
          code: ERROR_CODES.ERR0011.code,
          message: ERROR_CODES.ERR0011.message,
        },
      ],
    };
    (apiCall as jest.MockedFunction<typeof apiCall>).mockRejectedValueOnce(
      mockError
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useRecommendations()
    );

    expect(
      result.current.recommendations.isLoading.isRecommendationsByPageLoading
    ).toBe(false);
    expect(
      result.current.recommendations.data.recommendationsByPage
    ).toBeNull();
    expect(
      result.current.recommendations.error.recommendationsByPageError
    ).toBeNull();

    act(() => {
      result.current.getRecommendationsByPage('page_1', { catalogs: {} }, '');
    });

    expect(
      result.current.recommendations.isLoading.isRecommendationsByPageLoading
    ).toBe(true);

    await waitForNextUpdate();

    expect(apiCall).toHaveBeenCalledTimes(1);

    expect(result.current.recommendations.data.recommendationsByPage).toBe(
      null
    );
    expect(
      result.current.recommendations.isLoading.isRecommendationsByPageLoading
    ).toBe(false);
    expect(
      result.current.recommendations.error.recommendationsByPageError
    ).toEqual(mockError);
  });
});
