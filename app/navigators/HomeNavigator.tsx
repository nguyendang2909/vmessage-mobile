import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'app/components';
import { translate } from 'app/i18n';
import { AppStackScreenProps } from 'app/navigators';
import { MessagesScreen } from 'app/screens/MessagesScreen';
import { backgroundColor, borderTopColor } from 'app/styles';
import { colors, spacing, typography } from 'app/theme';
import { ChevronLeftIcon } from 'native-base';
import React, { FC } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type HomeTabParamList = {
  Messages: undefined;
  Contacts: undefined;
  Notes: undefined;
  Profile: undefined;
};

interface FCProps extends AppStackScreenProps<'Home'> {}

const Tab = createBottomTabNavigator<HomeTabParamList>();

export const HomeNavigator: FC<FCProps> = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          backgroundColor(colors.background),
          borderTopColor(colors.transparent),
          { height: bottom + 70 },
        ],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: typography.primary.medium,
          lineHeight: 16,
          flex: 1,
        },
        tabBarItemStyle: {
          paddingTop: spacing.medium,
        },
      }}
    >
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarLabel: translate('Messages'),
          tabBarIcon: ({ focused }) => (
            <Icon
              icon="components"
              color={focused ? colors.tint : ''}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={MessagesScreen}
        options={{
          tabBarLabel: translate('Contacts'),
          tabBarIcon: ({ focused }) => (
            <ChevronLeftIcon color={focused ? colors.primary : ''} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
