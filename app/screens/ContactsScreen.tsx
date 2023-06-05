import {
  alignItemsCenter,
  flexGrow,
  height,
  paddingHorizontal,
} from 'app/styles';
import { colors, spacing } from 'app/theme';
import {
  Actionsheet,
  Box,
  HStack,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'native-base';
import React, { FC, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const ContactsScreen: FC = () => {
  const [isOpenAddFriend, setOpenAddFriend] = useState<boolean>(false);

  const handleOpenAddFriend = () => {
    setOpenAddFriend(true);
  };

  const handleCloseAddFriend = () => {
    setOpenAddFriend(false);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Box safeAreaTop backgroundColor={colors.primary}></Box>
      <View bg={colors.primary} style={height(spacing.huge)}>
        <HStack
          style={[paddingHorizontal(spacing.large), alignItemsCenter, flexGrow]}
        >
          <View>
            <MaterialIcons name="search" size={30} color="white" />
          </View>
          <View style={flexGrow}>
            <Text>asdasd</Text>
          </View>
          <View>
            <TouchableOpacity onPress={handleOpenAddFriend}>
              <MaterialIcons name="person-add" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </HStack>
      </View>

      <Actionsheet isOpen={isOpenAddFriend} onClose={handleCloseAddFriend}>
        <Actionsheet.Content height="full">
          <Actionsheet.Item>Option 1</Actionsheet.Item>
          <Actionsheet.Item>Option 2</Actionsheet.Item>
          <Actionsheet.Item>Option 3</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>

      <ScrollView>
        <View>
          <Text>asdasd</Text>
          <Text>asdasd</Text>
        </View>
        <View>
          <Text>asdasd</Text>
          <Text>asdasd</Text>
        </View>
        <View>
          <Text>asdasd</Text>
          <Text>asdasd</Text>
        </View>
        <View>
          <Text>asdasd</Text>
          <Text>asdasd</Text>
        </View>
        <View>
          <Text>asdasd</Text>
          <Text>asdasd</Text>
        </View>
        <View>
          <Text>asdasd</Text>
          <Text>asdasd</Text>
        </View>
        <View>
          <Text>asdasd</Text>
          <Text>asdasd</Text>
        </View>
        <View>
          <Text>asdasd</Text>
          <Text>asdasd</Text>
        </View>
        <View>
          <Text>asdasd</Text>
          <Text>asdasd</Text>
        </View>
        <View>
          <Text>asdasd</Text>
          <Text>asdasd</Text>
        </View>
        <View>
          <Text>asdasd</Text>
          <Text>asdasd</Text>
        </View>
        <View>
          <Text>asdasd</Text>
          <Text>asdasd</Text>
        </View>
        <View>
          <Text>asdasd</Text>
          <Text>asdasd</Text>
        </View>
        <View>
          <Text>asdasd</Text>
          <Text>asdasd</Text>
        </View>
        <View>
          <Text>asdasd</Text>
          <Text>asdasd</Text>
        </View>
        <View>
          <Text>asdasd</Text>
          <Text>asdasd</Text>
        </View>
        <View>
          <Text>asdasd</Text>
          <Text>asdasd</Text>
        </View>
      </ScrollView>
    </>
  );
};
