import { SignInWithPhoneNumberForm } from 'app/containers/Form/SignInWithPhoneNumberForm';
import { paddingHorizontal } from 'app/styles/padding';
import { View } from 'native-base';
import React, { FC } from 'react';

import { Header, Screen } from '../components';
import { AppStackScreenProps, goBack } from '../navigators';
import { colors, spacing } from '../theme';

interface FCProps extends AppStackScreenProps<'SignInWithPhoneNumber'> {}

export const SignInWithPhoneNumberScreen: FC<FCProps> = _props => {
  return (
    <>
      <Header
        backgroundColor={colors.primary}
        titleMode="flex"
        leftText="Sign up"
        leftIcon="back"
        onLeftPress={() => {
          goBack();
        }}
      ></Header>

      <Screen preset="auto" safeAreaEdges={['top', 'bottom']}>
        <View style={paddingHorizontal(spacing.large)}>
          <SignInWithPhoneNumberForm />
        </View>
      </Screen>
    </>
  );
};
