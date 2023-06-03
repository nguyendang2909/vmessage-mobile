import { useNavigation } from '@react-navigation/native';
import { Header } from 'app/components/Screen/Header';
import { SignInWithPhoneNumberForm } from 'app/containers/Form/SignInWithPhoneNumberForm';
import { flexGrow } from 'app/styles/flex-grow';
import { heightFull } from 'app/styles/height';
import { justifyContentCenter } from 'app/styles/justifyContent';
import { paddingHorizontal } from 'app/styles/padding';
import { Box, ChevronLeftIcon } from 'native-base';
import React, { FC } from 'react';

import { AppStackScreenProps } from '../navigators';
import { spacing } from '../theme';

interface FCProps extends AppStackScreenProps<'SignInWithPhoneNumber'> {}

export const SignInWithPhoneNumberScreen: FC<FCProps> = _props => {
  const { goBack } = useNavigation();

  return (
    <>
      <Box safeAreaBottom style={heightFull}>
        <Header
          textTx="Sign in with phone number"
          leftIcon={<ChevronLeftIcon />}
          leftIconOnPress={goBack}
        />
        <Box
          style={[
            flexGrow,
            paddingHorizontal(spacing.large),
            justifyContentCenter,
          ]}
        >
          <SignInWithPhoneNumberForm />
        </Box>
      </Box>
    </>
  );
};
