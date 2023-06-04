/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams, // @demo remove-current-line
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useAppSelector } from 'app/hooks/useAppSelector';
import { HomeNavigator, HomeTabParamList } from 'app/navigators/HomeNavigator';
import { SignInScreen } from 'app/screens/SignInScreen';
import { SignInWithOtpPhoneNumberScreen } from 'app/screens/SignInWithOtpPhoneNumberScreen';
import { SignInWithPhoneNumberScreen } from 'app/screens/SignInWithPhoneNumberScreen';
import React from 'react';
import { useColorScheme } from 'react-native';

import Config from '../config';
import { DemoTabParamList } from './DemoNavigator'; // @demo remove-current-line
import { navigationRef, useBackButtonHandler } from './navigationUtilities';

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Home: NavigatorScreenParams<HomeTabParamList>;
  Demo: NavigatorScreenParams<DemoTabParamList>;
  SignInWithPhoneNumber: undefined;
  SignInWithOtpPhoneNumber: {
    otpConfirm: FirebaseAuthTypes.ConfirmationResult;
    user: {
      phoneNumber: string;
    };
  };
  SignIn: undefined;
};

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes;

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  const isAuthenticated = !!useAppSelector(state => state.app.accessToken);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isAuthenticated ? 'Demo' : 'SignIn'} // @demo remove-current-line
    >
      {isAuthenticated ? (
        <>
          {/* <Stack.Screen name="Demo" component={DemoNavigator} /> */}
          <Stack.Screen name="Home" component={HomeNavigator} />
        </>
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen
            name="SignInWithPhoneNumber"
            component={SignInWithPhoneNumberScreen}
          />
          <Stack.Screen
            name="SignInWithOtpPhoneNumber"
            component={SignInWithOtpPhoneNumberScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme();

  useBackButtonHandler(routeName => exitRoutes.includes(routeName));

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  );
};
