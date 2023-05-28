import { OtpInput } from 'app/components/Input/OtpInput';
import { translate } from 'app/i18n';
import { apiSlice } from 'app/stores/api.store';
import { spacing } from 'app/theme';
import { Button } from 'native-base';
import React, { FC, useState } from 'react';
import { Keyboard, Pressable, StyleSheet, View, ViewStyle } from 'react-native';

import { AppStackScreenProps } from '../navigators';

interface ScreenProps extends AppStackScreenProps<'RegisterOtpPhoneNumber'> {}

export const RegisterOtpPhoneNumberScreen: FC<ScreenProps> = props => {
  const maximumCodeLength = 6;

  const [submitRegisterByPhoneNumber] =
    apiSlice.useRegisterByPhoneNumberMutation();

  const [otpCode, setOTPCode] = useState('');

  const { otpConfirm, user } = props.route.params;

  const handleSignUp = async () => {
    const credential = await otpConfirm.confirm(otpCode);

    if (!credential) {
      return;
    }

    const idToken = await credential.user.getIdToken();

    await submitRegisterByPhoneNumber({
      ...user,
      token: idToken,
    }).unwrap();
  };

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <View>
        <View style={{ padding: spacing.large }}>
          <OtpInput
            code={otpCode}
            setCode={setOTPCode}
            maximumLength={maximumCodeLength}
          />
        </View>

        <View style={styles.signUpButtonView}>
          <Button
            disabled={otpCode.length !== 6}
            // isLoading
            testID="register-button"
            // tx="Next"
            style={styles.signUpButton}
            // preset="reversed"
            onPress={handleSignUp}
          >
            {translate('Sign up')}
          </Button>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  signUpButton: {
    // paddingHorizontal: spacing.large,
    // width: '100%',
  },
  signUpButtonView: {
    paddingHorizontal: spacing.large,
  },
});

const $screenContentContainer: ViewStyle = {
  // paddingVertical: spacing.huge,
  // paddingHorizontal: spacing.large,
};
