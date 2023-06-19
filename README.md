# react-native-msd

msd

# Table of Contents

<!-- MarkdownTOC -->

- [Overview](#overview)
- [Quick Start Guide](#quick-start-guide)
    - [Install MSD](#1-install-msd)
    - [Initialize Msd](#2-initialize-msd)
    - [Set user](#3-set-user)
    - [Recommendation methods](#4-recommendation-methods)
    - [Discover method](#5-discover-method)
    - [Track method](#6-track-method)
    - [Complete Code Example](#complete-code-example)
- [FAQ](#faq)
- [I want to know more!](#i-want-to-know-more)

<!-- /MarkdownTOC -->



## Introduction
Welcome to the official MSD react Native library.

## Quick Start Guide

MSD's React Native SDK is a wrapper around MSD apis.

<a name="installation"></a>
### 1. Install Mixpanel
#### Prerequisites
- React Native v0.6+
#### Steps
1. Under your app's root directory, install MSD React Native SDK. 
```
npm install msd-react-native
```
2. Under your application's ios folder, run
```
pod install
``` 

### 2. Initialize Msd
You must first initialize with your project token and msd base url. You can get your project token from [project settings](https://msd.com/settings/project).

```js
import { init } from 'msd-react-native';

const token = 'sample token';
const baseUrl = 'sample baseurl';
const loggingEnabled = false; // set it as true if developer want to see sdk logs

init({token, baseUrl, loggingEnabled});

```
Once you've called this method once, you can access all `msd` functions throughout the rest of your application.

### 3. Set user
You can set userId to msd sdk when after user login to the app. This useId will be stored in msd sdk and add this as a userId param on every subsequent api calls.

```js
import { setUser } from 'msd-react-native';

const userId = 'sample user id';
setUser({userId})

```
Also we can rest userId by calling `reset` user method.

```js
import { resetUser } from 'msd-react-native';

resetUser()

```
If user reset the userId, userId removed from MSD's storage and in sub sequent api calls don't have userId param.
### 4. Recommendation methods
Let's get started by Recommendation methods. We have a `useRecommendation` hook and it contain three methods for getting `msd` recommendations and one object for getting results.
They are `getRecommendationByStrategy`, `getRecommendationByModule` and `getRecommendationByPage`.
Results of these async methods are getting in the `recommendation` object.
```js

import { useRecommendations } from 'msd-react-native';


const {getRecommendationByStrategy, getRecommendationByModule, getRecommendationByPage} = useRecommendations();

// recommendation by strategy method usage 
const requestParamsForStrategy = {
    param1: 'value1',
    param2: 'value2'
};
const strategyReference = 'sample module name';
getRecommendationByStrategy(strategyReference, requestParamsForStrategy);

// recommendation by module method usage 
const requestParamsForModule = {
    param1: 'value1',
    param2: 'value2'
};
const moduleReference = 'sample strategy name';
getRecommendationByModule(moduleReference, requestParamsForModule);

// recommendation by page method usage 
const requestParamsForPage = {
    param1: 'value1',
    param2: 'value2'
};
const pageReference = 'sample page name';
getRecommendationByModule(pageReference, requestParamsForPage);
   
```
### 5. Discover method
Discover method of msd sdk is the supporting method of msd event method. Result of discover api gives the events list of your msd project.

```js

import {useDiscoverEvents } from 'msd-react-native';

// discovery method usage 
const {discoverEvents} = useDiscoverEvents(); 

discoverEvents();
```
You can see the events list in console if you set `loggingEnabled` as `true` in init call.
### 6. Track method
You can send an event from anywhere in your application. `useEvents` hook contain `track` method. 

```js

import {useEvents } from 'msd-react-native';

// events functions usage 
const {track} = useEvents();

```

### Complete Code Example
```js


import React, {useEffect} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {init, setUser, resetUser, useEvents, useRecommendations, useDiscoverEvents} from 'react-native-msd';


function App(): JSX.Element {
  
  useEffect(()=>{
    const token = 'Your token';
    const baseUrl = 'MSD baseUrl';
    init({token, baseUrl, loggingEnabled: false});
    setUser({userId: 'Your userId'});
  },[])


  const {recommendations, getRecommendationByStrategy} = useRecommendations();

  const getRecommendations = () => {
    const requestType = 'Type';
    const requestParams = {
      // Your request params
    };
    getRecommendationByStrategy(requestType, requestParams);
  };

  const {track} = useEvents();

  const trackEvent = () => {
    const eventName = 'sample event name';
    const requestParams = {
      // Your request params
    };
    track(eventName, requestParams);
  };

  const renderRecommendations = () => {
    return (
      <ScrollView horizontal>
        {recommendations?.data?.length > 0 &&
          recommendations?.data[0].data?.map((item: any) => (
            <View key={item?.title} style={styles.productCard}>
              <View>
                <Image
                  style={styles.productImage}
                  source={{uri: item.image_link}}
                />
              </View>
              <View>
                <Text numberOfLines={2} style={styles.productCardTitle}>
                  {item?.title}
                </Text>
                <Text style={styles.productPrice}>{`${item?.price}$`}</Text>
              </View>
            </View>
          ))}
      </ScrollView>
    );
  };

  const renderLoader = () => {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      {recommendations.isLoading && renderLoader()}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}>
        <View>
          <Button
            color="blue"
            onPress={getRecommendations}
            title="Get Recommendations"
          />
          <Button color="blue" onPress={trackEvent} title="Log Event" />
          {renderRecommendations()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
  }
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  productCard: {
    padding: 10,
    margin: 5,
    backgroundColor: '#D2E9E9',
    borderRadius: 5,
    width: 170,
  },
  productCardTitle: {
    color: '#545B77',
    fontWeight: '700',
    paddingTop: 8,
  },
  productPrice: {
    color: '#545B77',
    fontWeight: '400',
    paddingTop: 4,
  },
  productImage: {
    width: 150,
    height: 200,
    borderRadius: 3,
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});

export default App;


```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---
