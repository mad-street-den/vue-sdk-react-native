import { NativeModules } from 'react-native';

import { LINKING_ERROR } from '../constants';
import { logger } from '../utils/logger';

const { Msd } = NativeModules;

export const getBundleId = async (): Promise<string> => {
  try {
    if (Msd?.getBundleIdentifier) {
      const bundleIdentifier: string = await Msd.getBundleIdentifier();
      return bundleIdentifier;
    } else {
      logger.error(LINKING_ERROR);
      return '';
    }
  } catch (error) {
    return '';
  }
};

export const isNetConnected = async (): Promise<boolean> => {
  try {
    if (Msd?.isConnectedToInternet) {
      const isConnected: boolean = await Msd.isConnectedToInternet();
      return isConnected;
    } else {
      logger.error(LINKING_ERROR);
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const setItem = async (
  key: string,
  value: string
): Promise<string | undefined> => {
  try {
    if (Msd?.setItem) {
      await Msd.setItem(key, value);
      return value;
    } else {
      logger.error(LINKING_ERROR);
      return undefined;
    }
  } catch (error) {
    return undefined;
  }
};

export const getItem = async (key: string): Promise<string | undefined> => {
  try {
    if (Msd?.getItem) {
      const data: string = await Msd.getItem(key);
      return data;
    } else {
      logger.error(LINKING_ERROR);
      return undefined;
    }
  } catch (error) {
    return undefined;
  }
};
