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
      json: jest.fn().mockResolvedValueOnce(mockDiscoverEventsResponse),
    });

    const { result, waitForNextUpdate } = renderHook(() => useDiscoverEvents());

    expect(result.current.discoverEventsResponse.isLoading).toBe(false);
    expect(result.current.discoverEventsResponse.data).toBeNull();
    expect(result.current.discoverEventsResponse.error).toBeNull();

    act(() => {
      result.current.discoverEvents();
    });

    expect(result.current.discoverEventsResponse.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.discoverEventsResponse.isLoading).toBe(false);
    expect(result.current.discoverEventsResponse.data).toEqual(
      mockDiscoverEventsResponse.data
    );
    expect(result.current.discoverEventsResponse.error).toBeNull();
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

    const { result, waitForNextUpdate } = renderHook(() => useDiscoverEvents());

    expect(result.current.discoverEventsResponse.isLoading).toBe(false);
    expect(result.current.discoverEventsResponse.data).toBeNull();
    expect(result.current.discoverEventsResponse.error).toBeNull();

    act(() => {
      result.current.discoverEvents();
    });

    expect(result.current.discoverEventsResponse.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.discoverEventsResponse.isLoading).toBe(false);
    expect(result.current.discoverEventsResponse.data).toBeNull();
    expect(result.current.discoverEventsResponse.error).toEqual(mockError);
  });
});
