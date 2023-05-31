import { useNavigation } from '@react-navigation/native';
import { translate } from 'app/i18n';
import { appActions } from 'app/stores/persisted-app.store';
import { FormControl, Input, WarningOutlineIcon } from 'native-base';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { TextInput, TextStyle, View, ViewStyle } from 'react-native';
import { useDispatch } from 'react-redux';

import {
  Button,
  Header,
  Icon,
  Screen,
  TextField,
  TextFieldAccessoryProps,
} from '../components';
import { AppStackScreenProps } from '../navigators';
import { colors, spacing } from '../theme';

interface LoginScreenProps extends AppStackScreenProps<'Login'> {}

export const LoginScreen: FC<LoginScreenProps> = function LoginScreen(_props) {
  const dispatch = useDispatch();

  const { navigate } = useNavigation();

  const authPasswordInput = useRef<TextInput>();

  const [authPassword, setAuthPassword] = useState('');
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attemptsCount, setAttemptsCount] = useState(0);

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    setAuthPassword('ign1teIsAwes0m3');
  }, []);

  const error = isSubmitted;

  function login() {
    setIsSubmitted(true);
    setAttemptsCount(attemptsCount + 1);

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.
    setIsSubmitted(false);
    setAuthPassword('');

    dispatch(appActions.setLogin());

    // We'll mock this with a fake token.
  }

  // const formik = useFormik<FormParams.LoginByEmail>({
  //   initialValues: {},
  // });

  const signUp = () => {
    navigate('RegisterByPhoneNumber');
  };

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? 'view' : 'hidden'}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        );
      },
    [isAuthPasswordHidden],
  );

  useEffect(() => {
    return () => {
      setAuthPassword('');
    };
  }, []);

  return (
    <>
      <Header
        backgroundColor={colors.primary}
        titleMode="flex"
        leftText="Sign up"
      ></Header>
      <Screen
        preset="auto"
        contentContainerStyle={$screenContentContainer}
        safeAreaEdges={['top', 'bottom']}
      >
        <View style={$screenContent}>
          <FormControl isRequired>
            <FormControl.Label>{translate('Phone number')}</FormControl.Label>
            <Input type="text" placeholder="Enter your phone number" />
            <FormControl.HelperText>
              Must be atleast 6 characters.
            </FormControl.HelperText>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Atleast 6 characters are required.
            </FormControl.ErrorMessage>
          </FormControl>
          <TextField
            containerStyle={$textField}
            autoCapitalize="none"
            autoComplete="tel"
            autoCorrect={false}
            keyboardType="phone-pad"
            labelTx="loginScreen.emailFieldLabel"
            placeholderTx="loginScreen.emailFieldPlaceholder"
            status={error ? 'error' : undefined}
            onSubmitEditing={() => authPasswordInput.current?.focus()}
          />

          {/* <TextField
            ref={authPasswordInput}
            value={authPassword}
            onChangeText={setAuthPassword}
            containerStyle={$textField}
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect={false}
            secureTextEntry={isAuthPasswordHidden}
            labelTx="loginScreen.passwordFieldLabel"
            placeholderTx="loginScreen.passwordFieldPlaceholder"
            onSubmitEditing={login}
            RightAccessory={PasswordRightAccessory}
          /> */}

          <Button
            testID="login-button"
            tx="loginScreen.tapToSignIn"
            style={$tapButton}
            preset="reversed"
            onPress={login}
          />
        </View>
        <View style={$screenFooter}>
          <Button
            testID="sign-up-button"
            tx="Sign up"
            style={$signUpButton}
            onPress={signUp}
          />
        </View>
      </Screen>
    </>
  );
};

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.huge,
  paddingHorizontal: spacing.large,
  height: '100%',
  display: 'flex',
  // backgroundColor: colors.primary,
};

const $screenContent: ViewStyle = {
  flexGrow: 1,
};

const $screenFooter: ViewStyle = {};

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

const $signUpButton: ViewStyle = {};

const $signUpView: ViewStyle = {
  marginTop: spacing.massive,
};

const $registerText: TextStyle = {
  textAlign: 'right',
};

// @demo remove-file
