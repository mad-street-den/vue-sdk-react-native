import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  initialize,
  setUser,
  getBloxUUID,
  setBloxUUID,
} from 'vue-sdk-react-native';

import ButtonPrimary from './buttonPrimary';

const Init = () => {
  const navigation = useNavigation();

  const [apiToken, setApiToken] = useState('Your api token');
  const [baseUrl, setBaseUrl] = useState('Your base url');
  const [userId, setUserId] = useState('Your sample user id');
  const [bloxId, setBloxId] = useState('Your sample blox uuid');

  const handleApiTokenChange = (text: string) => {
    setApiToken(text);
  };

  const handleBaseUrlChange = (text: string) => {
    setBaseUrl(text);
  };

  const handleUserIdChange = (text: string) => {
    setUserId(text);
  };

  const handleBloxIdChange = (text: string) => {
    setBloxId(text);
  };
  const getBloxUuid = async () => {
    const id = await getBloxUUID();
    console.log('Blox uuid:', id);
  };

  const setBloxUuid = async () => {
    await setBloxUUID(bloxId);
  };

  const handleInit = () => {
    initialize({token: apiToken, baseUrl, loggingEnabled: true});
  };

  const handleSetUser = () => {
    setUser({userId});
  };

  const navigateToRecommendation = () => {
    navigation.navigate('RecommendationScreen');
  };

  const navigateToEvents = () => {
    navigation.navigate('EventScreen');
  };

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <ScrollView>
        <View>
          <Text style={styles.title}>Vue SDK</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter API Token"
            value={apiToken}
            onChangeText={handleApiTokenChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Base URL"
            value={baseUrl}
            onChangeText={handleBaseUrlChange}
          />
          <ButtonPrimary onPress={handleInit} buttonText={'Submit token'} />
          <TextInput
            style={styles.input}
            placeholder="Enter Blox UUID"
            value={bloxId}
            onChangeText={handleBloxIdChange}
          />
          <ButtonPrimary onPress={setBloxUuid} buttonText={'Set Blox UUID'} />
          <ButtonPrimary onPress={getBloxUuid} buttonText={'Get Blox UUID'} />
          <TextInput
            style={styles.input}
            placeholder="Enter User Id"
            value={userId}
            onChangeText={handleUserIdChange}
          />
          <ButtonPrimary onPress={handleSetUser} buttonText={'Set user'} />
        </View>
        <View>
          <ButtonPrimary
            onPress={navigateToRecommendation}
            buttonText={'Test Recommendation'}
          />
          <ButtonPrimary
            onPress={navigateToEvents}
            buttonText={'Test Events'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'red',
    textAlign: 'center',
    padding: 10,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  input: {
    margin: 10,
    padding: 12,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});

export default Init;
