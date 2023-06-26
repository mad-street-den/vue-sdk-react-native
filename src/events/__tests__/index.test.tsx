import { act, renderHook } from '@testing-library/react-hooks';
import { useEvents } from '..';
import { apiCall } from '../../api';
import { logger } from '../../utils/logger';
import { ERROR_CODES } from '../../constants';

jest.mock('../../api');
jest.mock('../../utils/logger');
jest.mock('../../native-bridge');

describe('useEvents', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should track an event successfully', async () => {
    const eventName = 'sample-event';
    const params = { param1: 'value1', param2: 'value2' };
    const mockApiResponse = { message: 'success' };

    (apiCall as jest.MockedFunction<typeof apiCall>).mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValue(mockApiResponse),
    });

    const { result } = renderHook(() => useEvents());
    await act(async () => {
      await result.current.track(eventName, params, '');
    });
  });

  it('should handle error when event name is empty', async () => {
    const { result } = renderHook(() => useEvents());

    await act(async () => {
      await result.current.track('', {}, '');
    });

    expect(logger.error).toHaveBeenCalledWith(
      `{ status: ${ERROR_CODES.ERR002.code}, message: ${ERROR_CODES.ERR002.message} }`
    );
  });

  it('should handle error when params are empty', async () => {
    const eventName = 'sample-event';

    const { result } = renderHook(() => useEvents());
    await act(async () => {
      await result.current.track(eventName, {}, '');
    });

    expect(logger.error).toHaveBeenCalledWith(
      `{ status: ${ERROR_CODES.ERR003.code}, message: ${ERROR_CODES.ERR003.message} }`
    );
  });

  it('should handle error when discovering events fails', async () => {
    const eventName = 'sample-event';
    const params = { param1: 'value1', param2: 'value2' };

    (apiCall as jest.MockedFunction<typeof apiCall>).mockRejectedValueOnce(
      'Discover events error'
    );

    const { result } = renderHook(() => useEvents());
    await act(async () => {
      await result.current.track(eventName, params, '');
    });

    expect(logger.error).toHaveBeenCalledWith(
      `{ status: ${ERROR_CODES.ERR0010.code}, message: ${ERROR_CODES.ERR0010.message} }`
    );
  });
});
