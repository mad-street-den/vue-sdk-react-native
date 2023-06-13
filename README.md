# react-native-msd

msd

## Installation

```sh
npm install react-native-msd
```

## Usage

```js
import {init, setUser, useEvents, useRecommendations, useDiscoverEvents} from 'react-native-msd';

// sdk initialization

const token = 'sample token';
const baseUrl = 'sample baseurl';
const loggingEnabled = false; // if developer need sdk log change it to true
init({token, baseUrl, loggingEnabled});

// ...

// set user id after login stage

const userId = 'sample user id';
setUser({userId})

// recommendation functions usage 

const {getRecommendationByStrategy, getRecommendationByModule, getRecommendationByPage} = useRecommendations();

const requestParamsForStrategy = {
    param1: 'value1',
    param2: 'value2'
};
const strategyReference = 'sample module name';
getRecommendationByStrategy(strategyReference, requestParamsForStrategy);

const requestParamsForModule = {
    param1: 'value1',
    param2: 'value2'
};
const moduleReference = 'sample strategy name';
getRecommendationByModule(moduleReference, requestParamsForModule);

const requestParamsForPage = {
    param1: 'value1',
    param2: 'value2'
};
const pageReference = 'sample page name';
getRecommendationByModule(pageReference, requestParamsForPage);
    
// discovery function

const {discoverEvents} = useDiscoverEvents(); 

discoverEvents();

// events functions usage 

const {track} = useEvents();

const eventName = 'sample event name';
const eventPrams = {
    param1: 'value1',
    param2: 'value2'
}
track(eventName, eventPrams);

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---
