import { NETWORK_TEST_URL } from '../constants';

export const isNetConnected = async () => {
  try {
    const response = await fetch(NETWORK_TEST_URL, { method: 'HEAD' });
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
