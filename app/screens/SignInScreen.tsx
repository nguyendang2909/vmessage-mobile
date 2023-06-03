import { SignInWithPhoneNumberButton } from 'app/containers/Button/SignInWithPhoneNumberButton';
import { translate } from 'app/i18n';
import { AppStackScreenProps } from 'app/navigators';
import { heightFull } from 'app/styles/height';
import { justifyContentCenter } from 'app/styles/justifyContent';
import { marginTop } from 'app/styles/margin';
import { paddingHorizontal } from 'app/styles/padding';
import { colors, spacing } from 'app/theme';
import { Box, Button, HStack, Text, View } from 'native-base';
import React, { FC } from 'react';

interface FCProps extends AppStackScreenProps<'SignIn'> {}

export const SignInScreen: FC<FCProps> = () => {
  return (
    <>
      <Box safeAreaTop bg={colors.primary} />
      <HStack
        px="4"
        py="4.5"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        // maxW="350"
      >
        <Text color={colors.primary}>{translate('vMessage')}</Text>
      </HStack>

      <View
        style={[
          heightFull,
          justifyContentCenter,
          paddingHorizontal(spacing.large),
        ]}
      >
        <View>
          <SignInWithPhoneNumberButton />
        </View>
        <View style={marginTop(spacing.large)}>
          <Button variant="outline" disabled>
            asda
          </Button>
        </View>
      </View>
    </>
  );
};
