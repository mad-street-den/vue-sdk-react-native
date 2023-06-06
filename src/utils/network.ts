import NetInfo from '@react-native-community/netinfo';

export const isNetConnected = async () => {
  const netInfoState = await NetInfo.fetch();
  return netInfoState?.isConnected;
};
