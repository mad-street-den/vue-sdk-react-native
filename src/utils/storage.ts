import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'uuidv4';

import { MAD_UUID } from '../constants';
import { logger } from './logger';

export const saveToStorage = async (key: string, value: string) => {
  try {
    const result = await AsyncStorage.setItem(key, value);
    return result;
  } catch (err) {
    logger.error(`Error while save ${key} to storage, ${err}`);
    return null;
  }
};

export const getFromStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (err) {
    logger.error(`Error while get ${key} from storage, ${err}`);
    return null;
  }
};

export const generateAndSaveMadId = async () => {
  let madUuid = await getFromStorage(MAD_UUID);
  if (!madUuid) {
    madUuid = uuid();
    await saveToStorage(MAD_UUID, madUuid);
    logger.info(`madId: ${madUuid}`);
  }
};
