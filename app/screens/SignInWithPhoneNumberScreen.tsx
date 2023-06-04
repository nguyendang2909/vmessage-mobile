import { useNavigation } from '@react-navigation/native';
import { Header } from 'app/components/Screen/Header';
import { SignInWithPhoneNumberForm } from 'app/containers/Form/SignInWithPhoneNumberForm';
import { translate } from 'app/i18n';
import { flexGrow } from 'app/styles/flex-grow';
import { heightFull } from 'app/styles/height';
import { marginTop } from 'app/styles/margin';
import { paddingHorizontal, paddingVertical } from 'app/styles/padding';
import { textAlignCenter } from 'app/styles/text-align';
import { Box, ChevronLeftIcon, StatusBar, Text, View } from 'native-base';
import React, { FC } from 'react';

import { AppStackScreenProps } from '../navigators';
import { spacing } from '../theme';

interface FCProps extends AppStackScreenProps<'SignInWithPhoneNumber'> {}

export const SignInWithPhoneNumberScreen: FC<FCProps> = _props => {
  const { goBack } = useNavigation();

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Box safeAreaBottom style={heightFull}>
        <Header
          textTx="Sign in with phone number"
          leftIcon={ChevronLeftIcon}
          onPressLeftIcon={goBack}
        />
        <View
          style={[
            paddingHorizontal(spacing.large),
            paddingVertical(spacing.large),
          ]}
        >
          <Text>{translate('Please input the phone number to sign in')}</Text>
        </View>

        <View style={[marginTop(spacing.large), flexGrow]}>
          <View style={paddingHorizontal(spacing.large)}>
            <SignInWithPhoneNumberForm />
          </View>
        </View>
        <View>
          <Text style={textAlignCenter}>{translate('vMessage')}</Text>
        </View>
      </Box>
    </>
  );
};
