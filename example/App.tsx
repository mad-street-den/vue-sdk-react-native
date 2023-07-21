import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RecommendationScreen from './src/recommendationScreen';
import EventScreen from './src/eventScreen';
import Init from './src/init';

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Init"
          component={Init}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RecommendationScreen"
          component={RecommendationScreen}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="EventScreen"
          component={EventScreen}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
