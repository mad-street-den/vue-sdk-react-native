import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useEvents, useDiscoverEvents} from 'vue-sdk-react-native';

import ButtonPrimary from './buttonPrimary';

const EventScreen = () => {
  const {discoverEvents} = useDiscoverEvents();
  const {track} = useEvents();
  const pageCorrelationId = '3a93346b-6236-4fb6-8a40-4301f9c78533';

  const discover = () => {
    discoverEvents();
  };

  const trackPageView = () => {
    track('PageView', {
      page_type: 'pdp',
      page_name: 'PDP',
      source_prodid: '39596296700022',
    },
    pageCorrelationId );
  };

  const trackPageViewForHome = () => {
    track('PageView', {
      page_type: "Home",
      page_name: "Home",
    },
    pageCorrelationId );
  };

  const trackOrderConfirmation = () => {
    track('Buy', {
      page_type: 'oc',
      page_name: 'order Confirmation',
      product_id: ['39596296700022'],
      source_prodid: '39596296700022',
      product_price: [125.50],
      order_id: "AE75634",
      quantity: [2],
      price: ['125.00'],
    },
    pageCorrelationId);
  };

  const trackModuleClick = () => {
    track('ModuleClick', {
    page_type: "pdp",
    page_name: "PDP",
    product_id: "5789256482843",
    clicked_product_id: "39946630725750",
    position_of_reco: 1,
    slot_id: "android_slot2",
    module_id: "a5777370-b133-426a-ae3a-5a883a787130",
    strategy_id: "04092a30-22e2-4565-83ee-3ffd83cb6375"
    },
    pageCorrelationId);
  };

  const trackModuleView = () => {
    track('ModuleView', {
      page_type: "pdp",
      page_name: "PDP",
      product_id: "5789256482843",
      slot_id: "android_slot2",
      module_id: "a5777370-b133-426a-ae3a-5a883a787130"
      },
      pageCorrelationId);
  };

  const trackRightSwipe = () => {
    track('rightSwipe', {
      page_type: "pdp",
      page_name: "PDP",
      product_id: "5789256482843",
      slot_id: "android_slot2",
      module_id: "a5777370-b133-426a-ae3a-5a883a787130"
    },
    pageCorrelationId);
  };

  const trackLeftSwipe = () => {
    track('leftSwipe', {
      page_type: "pdp",
      page_name: "PDP",
      product_id: "5789256482843",
      slot_id: "android_slot2",
      module_id: "a5777370-b133-426a-ae3a-5a883a787130"
    },
    pageCorrelationId);
  };

  const trackAdd2cart = () => {
    track('Add2cart', {
      page_type: "pdp",
      page_name: "PDP",
      product_id: "5789256482843",
      clicked_product_id: "39946630725750"
    },
    pageCorrelationId);
  };

  const trackPlaceOrder = () => {
    track('placeOrder', {
      "page_type": "pdp",
      "page_name": "PDP",
      "product_id": "5789256482843"
    },
    pageCorrelationId);
  };

  const trackRemoveFromCart = () => {
    track('Removefromcart', {
      page_type: "pdp",
      page_name: "PDP",
      product_id: "5789256482843",
      clicked_product_id: "39946630725750"
    },
    pageCorrelationId);
  };

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}>
        <ButtonPrimary onPress={discover} buttonText={'Discover'} />
        <ButtonPrimary onPress={trackPageView} buttonText={'Page View'} />
        <ButtonPrimary onPress={trackPageViewForHome} buttonText={'Page View For Home'} />
        <ButtonPrimary onPress={trackOrderConfirmation} buttonText={'Order Confirmation'} />
        <ButtonPrimary onPress={trackModuleClick} buttonText={'Module Click'} />
        <ButtonPrimary onPress={trackModuleView} buttonText={'Module View'} />
        <ButtonPrimary onPress={trackRightSwipe} buttonText={'Right Swipe'} />
        <ButtonPrimary onPress={trackLeftSwipe} buttonText={'Left Swipe'} />
        <ButtonPrimary onPress={trackAdd2cart} buttonText={'Add To Cart'} />
        <ButtonPrimary onPress={trackPlaceOrder} buttonText={'Place Order'} />
        <ButtonPrimary onPress={trackRemoveFromCart} buttonText={'Remove From Cart'} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
  },
});

export default EventScreen;
