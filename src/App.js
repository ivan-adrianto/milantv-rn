import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import {Provider} from 'react-redux';
import store from './redux/store';
import {navigationRef} from './helpers/RootNavigation';

const config = {
  screens: {
    MainApp: {
      screens: {
        HomeTab: {
          screens: {
            MovieDetail: {
              path: 'detail/:id',
              parse: {
                id: id => id,
              },
            },
          },
        },
      },
    },
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer
        ref={navigationRef}
        linking={{
          prefixes: ['https://milantv.com'],
          config,
        }}>
        <Router />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
