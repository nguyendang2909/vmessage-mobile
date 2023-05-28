import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { apiSlice } from 'app/stores/api.store';
import { FormParams } from 'app/types/form-params.type';
import { useFormik } from 'formik';
import React, { FC, useEffect, useRef, useState } from 'react';
import { TextInput, TextStyle, ViewStyle } from 'react-native';

import { Button, Header, Screen, TextField } from '../components';
import { AppStackScreenProps, goBack } from '../navigators';
import { colors, spacing } from '../theme';

interface RegisterByPhoneNumberScreenProps
  extends AppStackScreenProps<'RegisterByPhoneNumber'> {}

export const RegisterByPhoneNumberScreen: FC<
  RegisterByPhoneNumberScreenProps
> = _props => {
  const authPasswordInput = useRef<TextInput>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const error = isSubmitted;
  const [submitCanRegister] = apiSlice.useCanRegisterMutation();
  const navigation = useNavigation();
  const formik = useFormik<FormParams.RegisterByPhoneNumber>({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
    },
    onSubmit: async values => {
      const { phoneNumber, firstName, lastName } = values;

      const canRegister = await submitCanRegister({ phoneNumber }).unwrap();
      console.log(canRegister);
      if (!canRegister.data?.canRegister) {
        console.log('Phone used');

        return;
      }

      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);

      navigation.navigate('RegisterOtpPhoneNumber', {
        otpConfirm: confirmation,
        user: { firstName, lastName, phoneNumber },
      });
    },
  });

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

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

      <Screen
        preset="auto"
        contentContainerStyle={$screenContentContainer}
        safeAreaEdges={['top', 'bottom']}
      >
        <TextField
          containerStyle={$textField}
          value={formik.values.firstName}
          onChangeText={formik.handleChange('firstName')}
          autoCapitalize="words"
          autoCorrect={false}
          keyboardType="default"
          labelTx="First name"
          placeholderTx="Enter your first name"
          status={error ? 'error' : undefined}
        />

        <TextField
          containerStyle={$textField}
          value={formik.values.lastName}
          onChangeText={formik.handleChange('lastName')}
          autoCapitalize="words"
          autoCorrect={false}
          keyboardType="default"
          labelTx="Last name"
          placeholderTx="Enter your last name"
          status={error ? 'error' : undefined}
        />

        <TextField
          containerStyle={$textField}
          value={formik.values.phoneNumber}
          onChangeText={formik.handleChange('phoneNumber')}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="phone-pad"
          labelTx="Phone number"
          placeholderTx="Enter your phone number"
          status={error ? 'error' : undefined}
          onSubmitEditing={() => authPasswordInput.current?.focus()}
        />

        <Button
          testID="register-button"
          tx="Next"
          style={$tapButton}
          preset="reversed"
          onPress={() => {
            formik.handleSubmit();
          }}
        />
      </Screen>
    </>
  );
};

const $screenContentContainer: ViewStyle = {
  // paddingVertical: spacing.huge,
  paddingHorizontal: spacing.large,
};

const $signIn: TextStyle = {
  marginBottom: spacing.small,
};

const $enterDetails: TextStyle = {
  marginBottom: spacing.large,
};

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.medium,
};

const $textField: ViewStyle = {
  marginBottom: spacing.large,
};

const $tapButton: ViewStyle = {
  marginTop: spacing.extraSmall,
};

// @demo remove-file
