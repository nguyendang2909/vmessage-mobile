import { Header } from 'app/components';
import { SignInWithPhoneNumberButton } from 'app/containers/Button/SignInWithPhoneNumberButton';
import { AppStackScreenProps } from 'app/navigators';
import { heightFull } from 'app/styles/height';
import { justifyContentCenter } from 'app/styles/justifyContent';
import { paddingHorizontal } from 'app/styles/padding';
import { colors, spacing } from 'app/theme';
import { View } from 'native-base';
import React, { FC } from 'react';

interface FCProps extends AppStackScreenProps<'Login'> {}

export const SignInScreen: FC<FCProps> = () => {
  return (
    <>
      <Header
        backgroundColor={colors.primary}
        titleMode="flex"
        leftTx="vMessage"
      ></Header>

      <View
        style={[
          heightFull,
          justifyContentCenter,
          paddingHorizontal(spacing.large),
        ]}
      >
        <SignInWithPhoneNumberButton />
      </View>
    </>
  );
};
