import { renderHook, act } from '@testing-library/react-hooks';
import { useDiscoverEvents } from '..';
import { apiCall } from '../../api';
import { ERROR_CODES } from '../../constants';

jest.mock('../../api');

describe('useDiscoverEvents', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch and set discover events', async () => {
    const mockDiscoverEventsResponse = {
      data: ['event1', 'event2'],
    };

    (apiCall as jest.MockedFunction<typeof apiCall>).mockResolvedValueOnce({
      status: 200,
      result: mockDiscoverEventsResponse,
    });

    const { result: _result, waitForNextUpdate } = renderHook(() =>
      useDiscoverEvents()
    );

    expect(_result.current.discoverEventsResponse.isLoading).toBe(false);
    expect(_result.current.discoverEventsResponse.data).toBeNull();
    expect(_result.current.discoverEventsResponse.error).toBeNull();

    act(() => {
      _result.current.discoverEvents();
    });

    expect(_result.current.discoverEventsResponse.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(_result.current.discoverEventsResponse.isLoading).toBe(false);
    expect(_result.current.discoverEventsResponse.data).toEqual(
      mockDiscoverEventsResponse.data
    );
    expect(_result.current.discoverEventsResponse.error).toBeNull();
  });

  it('should handle API call error', async () => {
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

    const { result: _result, waitForNextUpdate } = renderHook(() =>
      useDiscoverEvents()
    );

    expect(_result.current.discoverEventsResponse.isLoading).toBe(false);
    expect(_result.current.discoverEventsResponse.data).toBeNull();
    expect(_result.current.discoverEventsResponse.error).toBeNull();

    act(() => {
      _result.current.discoverEvents();
    });

    expect(_result.current.discoverEventsResponse.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(_result.current.discoverEventsResponse.isLoading).toBe(false);
    expect(_result.current.discoverEventsResponse.data).toBeNull();
    expect(_result.current.discoverEventsResponse.error).toEqual(mockError);
  });
});
