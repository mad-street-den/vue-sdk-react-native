<p align="center">
  <img src="https://vue.ai/images/logo/vue-logo-light.svg" alt="Vue React Native Library"/>
</p>

# Table of Contents
<!-- MarkdownTOC -->
- [Overview](#overview)
- [Quick Start Guide](#quick-start-guide)
    - [Install Vue SDK](#1-install-vue-sdk)
    - [Initialize Vue SDK](#2-initialize-vue-sdk)
    - [Discover Events](#3-discover-events)
    - [Track Event](#4-track-event)
    - [Get Recommendations](#5-get-recommendations)
    - [Set User](#6-set-user)
    - [Reset User Profile](#7-reset-user-profile)
    - [Complete Code Example](#complete-code-example)
- [FAQ](#faq)
- [I want to know more!](#i-want-to-know-more)

<!-- /MarkdownTOC -->


<a name="introduction"></a>
## Overview

VueSDK is a library/SDK providing all the functions and utilities required to help you build and integrate all the recommendations and search offered by Vue.AI. To know about the detailed set of use cases available - please [visit this link](https://support.vue.ai/docs/DXM%20Hub/Strategy).

## Quick Start Guide

### 1. Install Vue SDK
You will need your project token for initializing your library. You can get your project token from [project settings](https://www.madstreetden.com/contact-us/).

#### Prerequisites
- React Native v0.6+
#### Steps
1. Under your app's root directory, install vue-sdk-react-native. 
```
npm install vue-sdk-react-native
```
2. Under your application's ios folder, run
```
pod install
``` 


### 2. Initialize Vue Sdk
You must first initialize with your project token and Vue Sdk base url. You can get your project token from [project settings](https://support.getblox.ai/docs/cli).

```js
import { initialize } from 'vue-sdk-react-native';

const token = 'YOUR_TOKEN';
const baseUrl = 'GIVEN_VUE_SDK_BASE_URL';
const loggingEnabled = true; // set it as true if developer wants to see sdk logs

initialize({ token, baseUrl, loggingEnabled });

```
Once you've called this method once, you can access all `Vue SDK` functions throughout the rest of your application.


### 3. Discover Events

To ensure accurate and comprehensive event tracking, it is recommended to call the discoverEvents function before invoking the track function in your SDK integration. The discoverEvents function retrieves the essential information related to track events, such as event names, properties, and default properties. This step allows you to populate the necessary data and configure the event tracking accordingly.
```js

import { useDiscoverEvents } from 'vue-sdk-react-native';

const {
  discoverEvents,
  discoverEventsResponse: { data, isLoading, error }
} = useDiscoverEvents();

// Discover method
discoverEvents();
```
The `discoverEventsResponse` field returned by the `useDiscoverEvents` hook is an object containing the following properties:

`data`: The discover events data returned by the API. This property will be null initially and will be updated once the API call is completed successfully.

`isLoading`: A boolean value indicating whether the discover events data is currently being loaded from the API. It will be true while the API call is in progress, and false once the data is fetched or an error occurs.

`error`: An error object, if any, that occurred during the API call. This property will be null if there are no errors.

You can see the events list in console if you set `loggingEnabled` as `true` in initialize call.

### 4. Track Event

To track custom events using our SDK, you can utilize the track function. This function allows you to capture specific actions or interactions within your application and gather valuable data for analysis.

Here's an example of how to use the track function:
You can send an event from anywhere in your application. `useEvents` hook contain `track` method. 

```js

import { useEvents } from 'vue-sdk-react-native';

// track event function 
const { track } = useEvents();
const eventName = 'YOUR_CUSTOM_EVENT_NAME';
const requestParams = {
// Your request params
  YOUR_KEY: 'YOUR_VALUE'
};
const correlationId = 'YOUR_CORRELATION_ID';
track(eventName, requestParams, correlationId)

```

The SDK automatically includes several properties when tracking events, eliminating the need for users to manually add them. These properties are essential for comprehensive event tracking and provide valuable insights into user interactions. Here are some of the properties that are automatically added by the SDK:

<!-- TABLE_GENERATE_START -->

| key           | Description                            | Example Value
| ------------- | -------------------------------------  | ---------------------------- |
| blox_uuid     | Device UUID generated                  | 5fbeac07-f385-4145-a690-e98571ae985e
| platform      | Platform of the user                   | android or ios
| medium        | Medium from where requests are sent    | application
| referrer      | same values as platform for mobile app | android or ios
| user_id       | user id passed while calling setUser   | 81bf1152-ce89-4954-b38e-f81875258f6e
| url           | Bundle id of the application           | com.example.myapp

<!-- TABLE_GENERATE_END -->


### 5. Get Recommendations

The getRecommendations function in the SDK allows you to retrieve recommendations based on specific search criteria and properties. This function provides a convenient way to fetch recommendations and receive the results asynchronously.

Let's get started by Recommendation methods. We have a `useRecommendation` hook and it contain three methods for getting `Vue SDK` recommendations and one object for getting results.
They are `getRecommendationsByStrategy`, `getRecommendationsByModule` and `getRecommendationsByPage`.
Results of these async methods are getting in the `recommendation` object.
```js

import { useRecommendations } from 'vue-sdk-react-native';

const {
    getRecommendationsByStrategy,
    getRecommendationsByModule,
    getRecommendationsByPage,
    recommendations: { data, isLoading, error }
  } = useRecommendations();
```

#### 1. Get Recommendations by Page

```js
const requestParamsForPage = {
  param1: 'VALUE_1',
  param2: 'VALUE_2'
};
const pageReference = 'YOUR_PAGE_NAME';
const correlationId = 'YOUR_CORRELATION_ID';
getRecommendationsByModule(pageReference, requestParamsForPage, correlationId);
```


#### 2. Get Recommendations by Module

```js
const requestParamsForModule = {
  param1: 'VALUE_1',
  param2: 'VALUE_2'
};
const moduleReference = 'YOUR_MODULE_NAME';
const correlationId = 'YOUR_CORRELATION_ID';
getRecommendationsByModule(moduleReference, requestParamsForModule, correlationId);

```

#### 3. Get Recommendations by Strategy
```js
const requestParamsForStrategy = {
  param1: 'VALUE_1',
  param2: 'VALUE_2'
};
const strategyReference = 'YOUR_STRATEGY_NAME';
const correlationId = 'YOUR_CORRELATION_ID';
getRecommendationsByStrategy(strategyReference, requestParamsForStrategy, correlationId);
```
The `recommendations` field returned by the `useRecommendations` hook is an object containing the following properties:

`data`: An object that holds the recommendations data returned by the API. It includes the following properties:
* `recommendationsByModule`: An array of recommendations specific to modules.
* `recommendationsByPage`: An array of recommendations specific to pages.
* `recommendationsByStrategy`: An array of recommendations specific to strategies.

`isLoading`: An object representing the loading states for different recommendations. It includes the following properties:
* `isRecommendationsByModuleLoading`: A boolean value indicating whether the recommendations by module are currently being loaded.
* `isRecommendationsByPageLoading`: A boolean value indicating whether the recommendations by page are currently being loaded.
* `isRecommendationsByStrategyLoading`: A boolean value indicating whether the recommendations by strategy are currently being loaded.

`error`: An object representing the errors that occurred during the API calls for different recommendations. It includes the following properties:
* `recommendationsByModuleError`: An error object, if any, that occurred while fetching recommendations by module.
* `recommendationsByPageError`: An error object, if any, that occurred while fetching recommendations by page.
* `recommendationsByStrategyError`: An error object, if any, that occurred while fetching recommendations by strategy.

The SDK automatically includes several properties when tracking events, eliminating the need for users to manually add them. Here are some of the properties that are automatically added by the SDK:

<!-- TABLE_GENERATE_START -->

| key           | Description                            | Example Value
| ------------- | -------------------------------------  | ---------------------------- |
| blox_uuid     | Device UUID generated                  | 5fbeac07-f385-4145-a690-e98571ae985e
| platform      | Platform of the user                   | ios
| medium        | Medium from where requests are sent    | application
| user_id       | user id passed while calling setUser   | 81bf1152-ce89-4954-b38e-f81875258f6e
| url           | Bundle id of the application           | com.example.myapp

<!-- TABLE_GENERATE_END -->

### 6. Set User

The setUser function in the SDK allows you to associate a user ID with subsequent API calls after the user has logged in. This user ID is used to track user-specific events and behaviors, providing personalized experiences and accurate analytics.

```js
import { setUser } from 'vue-sdk-react-native';

const userId = 'YOUR_USER_ID';
setUser({ userId })
```

### 7. Reset User Profile

The resetUser function in the SDK allows you to clear the user information and reset the SDK state when the user logs out of your application. This ensures that any user-specific data and tracking are cleared and no longer associated with the user.

```js
import { resetUser } from 'vue-sdk-react-native';

resetUser()

```
### Complete Code Example
Here's a runnable code example that covers everything in this quickstart guide.
```js



import React, { useEffect } from 'react';
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
import { initialize, setUser, useEvents, useRecommendations } from 'vue-sdk-react-native';

function App(): JSX.Element {
  useEffect(() => {
    const token = 'YOUR_TOKEN';
    const baseUrl = 'GIVEN_VUE_SDK_BASE_URL';
    initialize({token, baseUrl, loggingEnabled: true });
    setUser({userId: 'YOUR_USER_ID'});
  }, []);

  const {
    recommendations: {
      data: {
        recommendationsByModule,
        recommendationsByPage,
        recommendationsByStrategy
      },
      isLoading: {
        isRecommendationsByModuleLoading,
        isRecommendationsByPageLoading,
        isRecommendationsByStrategyLoading
      }
    },
    getRecommendationsByStrategy,
    getRecommendationsByModule,
    getRecommendationsByPage,
  } = useRecommendations();

  const getRecommendations = () => {
    const strategyName = 'YOUR_STRATEGY_NAME';
    const requestParams = {
      // Your request params
      YOUR_KEY: 'YOUR_VALUE'
    };
    const correlationId = 'YOUR_CORRELATION_ID';
    getRecommendationsByStrategy(strategyName, requestParams, correlationId);
  };

  const { track } = useEvents();

  const trackEvent = () => {
    const eventName = 'YOUR_CUSTOM_EVENT_NAME';
    const requestParams = {
      // Your request params
      YOUR_KEY: 'YOUR_VALUE',
    };
    const correlationId = 'YOUR_CORRELATION_ID';
    track(eventName, requestParams, correlationId);
  };

  const renderRecommendationsByStrategy = () => {
    return (
      <ScrollView horizontal>
        {recommendationsByStrategy?.[0]?.data?.map((item: any) => (
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
      {isRecommendationsByModuleLoading && renderLoader()}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}>
        <View>
          <Button
            color="blue"
            onPress={getRecommendations}
            title="Get Recommendations By Strategy"
          />
          <Button color="blue" onPress={trackEvent} title="Log Event" />
          {renderRecommendationsByStrategy()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
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

### I want to know more!

No worries, here are some links that you will find useful:
* **[Advanced React Native Guide](https://reactnative.dev/docs/environment-setup)**

Have any questions? Reach out to SDK [Support](https://support.getblox.ai/docs/cli) to speak to someone smart, quickly.
