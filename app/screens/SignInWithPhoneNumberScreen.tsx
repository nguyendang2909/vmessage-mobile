import { SignInWithPhoneNumberForm } from 'app/containers/Form/SignInWithPhoneNumberForm';
import { heightFull } from 'app/styles/height';
import { justifyContentCenter } from 'app/styles/justifyContent';
import { paddingHorizontal } from 'app/styles/padding';
import { Box } from 'native-base';
import React, { FC } from 'react';

import { AppStackScreenProps } from '../navigators';
import { spacing } from '../theme';

interface FCProps extends AppStackScreenProps<'SignInWithPhoneNumber'> {}

export const SignInWithPhoneNumberScreen: FC<FCProps> = _props => {
  return (
    <>
      <Box
        safeAreaTop
        safeAreaBottom
        style={[
          heightFull,
          paddingHorizontal(spacing.large),
          justifyContentCenter,
        ]}
      >
        <SignInWithPhoneNumberForm />
      </Box>
    </>
  );
};
