import { useNavigation } from '@react-navigation/native';
import { OtpInput } from 'app/components/Input/OtpInput';
import { Header } from 'app/components/Screen/Header';
import { translate } from 'app/i18n';
import { apiSlice } from 'app/stores/api.store';
import { flexGrow } from 'app/styles/flex-grow';
import { heightFull } from 'app/styles/height';
import { paddingHorizontal, paddingVertical } from 'app/styles/padding';
import { spacing } from 'app/theme';
import {
  Box,
  Button,
  ChevronLeftIcon,
  FormControl,
  HStack,
  StatusBar,
  Text,
} from 'native-base';
import React, { FC, useState } from 'react';
import { Keyboard, Pressable, View } from 'react-native';

import { AppStackScreenProps } from '../navigators';

interface FCProps extends AppStackScreenProps<'SignInWithOtpPhoneNumber'> {}

export const SignInWithOtpPhoneNumberScreen: FC<FCProps> = props => {
  const { goBack } = useNavigation();
  const maximumCodeLength = 6;
  const [submitSignInPhoneNumber] = apiSlice.useSignInWithPhoneNumberMutation();
  const [isSubmiting, setIsSubmitting] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [otpCode, setOTPCode] = useState('');
  const { otpConfirm, user } = props.route.params;
  const handleSignUp = async () => {
    setError(false);
    setIsSubmitting(true);
    try {
      const credential = await otpConfirm.confirm(otpCode);
      if (!credential) {
        return;
      }
      const idToken = await credential.user.getIdToken();
      await submitSignInPhoneNumber({
        ...user,
        token: idToken,
      }).unwrap();
    } catch (err) {
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Box style={heightFull} safeAreaBottom>
        <Pressable style={flexGrow} onPress={Keyboard.dismiss}>
          <Header
            textTx="Input OTP"
            leftIcon={ChevronLeftIcon}
            onPressLeftIcon={goBack}
          ></Header>

          <Box style={[flexGrow, paddingHorizontal(spacing.large)]}>
            <View style={paddingVertical(spacing.large)}>
              <Text>
                {translate(
                  'Do not share verification code to protect your account',
                )}
              </Text>
            </View>

            <HStack space="2" style={paddingVertical(spacing.large)}>
              <FormControl isInvalid={isError}>
                <OtpInput
                  code={otpCode}
                  setCode={setOTPCode}
                  maximumLength={maximumCodeLength}
                />
                <FormControl.ErrorMessage>
                  {isError && translate('Wrong verification code, try again!')}
                </FormControl.ErrorMessage>
              </FormControl>
            </HStack>
            {/* <View>
              <Text>Resend OTP</Text>
            </View> */}
            <View style={paddingVertical(spacing.large)}>
              <Button
                isLoading={isSubmiting}
                disabled={otpCode.length !== 6}
                testID="register-button"
                onPress={handleSignUp}
              >
                {translate('Sign in')}
              </Button>
            </View>
          </Box>
          <View>
            <Text textAlign="center">{translate('vMessage')}</Text>
          </View>
        </Pressable>
      </Box>
    </>
  );
};
