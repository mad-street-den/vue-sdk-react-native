import AsyncStorage from '@react-native-async-storage/async-storage';

import { MAD_UUID } from '../constants';
import { logger } from './logger';

const cache: Record<string, any> = {};

export const saveToStorage = async (key: string, value: string) => {
  try {
    cache[key] = value;
    const result = await AsyncStorage.setItem(key, value);
    return result;
  } catch (err) {
    logger.error(`Error while save ${key} to storage, ${err}`);
    return null;
  }
};

export const getFromStorage = async (key: string) => {
  try {
    if (cache[key]) {
      return cache[key];
    } else {
      const value = await AsyncStorage.getItem(key);
      cache[key] = value;
      return value;
    }
  } catch (err) {
    logger.error(`Error while get ${key} from storage, ${err}`);
    return null;
  }
};

export const generateAndSaveMadId = async () => {
  let madUuid = await getFromStorage(MAD_UUID);
  if (!madUuid) {
    madUuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // eslint-disable-next-line no-bitwise, prettier/prettier
      const r = Math.random() * 16 | 0 ;
      // eslint-disable-next-line no-bitwise, prettier/prettier
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    await saveToStorage(MAD_UUID, madUuid);
  }
};
