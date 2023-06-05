import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { translate } from 'app/i18n';
import { AppStackScreenProps } from 'app/navigators';
import { ContactsScreen } from 'app/screens/ContactsScreen';
import { MessagesScreen } from 'app/screens/MessagesScreen';
import { NotesScreen } from 'app/screens/NotesScreen';
import { ProfileScreen } from 'app/screens/ProfileScreen';
import { backgroundColor, borderTopColor } from 'app/styles';
import { colors, spacing } from 'app/theme';
import React, { FC } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
            <MaterialCommunityIcons
              name="chat"
              color={focused ? colors.primary : colors.palette.neutral500}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          tabBarLabel: translate('Contacts'),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="contacts"
              color={focused ? colors.primary : colors.palette.neutral500}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notes"
        component={NotesScreen}
        options={{
          tabBarLabel: translate('Notes'),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="note"
              color={focused ? colors.primary : colors.palette.neutral500}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: translate('Profile'),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account"
              color={focused ? colors.primary : colors.palette.neutral500}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
