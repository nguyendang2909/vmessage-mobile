import { colors } from 'app/theme';
import { Box, StatusBar } from 'native-base';
import React, { FC } from 'react';

export const ProfileScreen: FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Box safeAreaTop backgroundColor={colors.primary}></Box>
    </>
  );
};
