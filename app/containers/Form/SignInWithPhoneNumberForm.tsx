import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { translate } from 'app/i18n';
import { apiSlice } from 'app/stores/api.store';
import { marginBottom } from 'app/styles/margin';
import { spacing } from 'app/theme';
import { FormParams } from 'app/types/form-params.type';
import { useFormik } from 'formik';
import { Button, Input, View } from 'native-base';
import React, { FC, useEffect } from 'react';

export const SignInWithPhoneNumberForm: FC = () => {
  const { navigate } = useNavigation();

  const [submitIsExistUser] = apiSlice.useIsExistUserMutation();

  function onAuthStateChanged(user: unknown) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, []);

  const formik = useFormik<FormParams.SignInWithPhoneNumber>({
    initialValues: {
      phoneNumber: '',
    },
    onSubmit: async values => {
      const { phoneNumber } = values;
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      navigate('SignInWithOtpPhoneNumber', {
        otpConfirm: confirmation,
        user: { phoneNumber },
      });
    },
  });

  return (
    <View>
      <View style={marginBottom(spacing.large)}>
        <Input
          testID="phoneNumber"
          onChangeText={formik.handleChange('phoneNumber')}
          placeholder={translate('Enter your phone number')}
          onBlur={formik.handleBlur('phoneNumber')}
        ></Input>
      </View>

      <View>
        <Button onPress={() => formik.handleSubmit()}>Next</Button>
      </View>
    </View>
  );
};
