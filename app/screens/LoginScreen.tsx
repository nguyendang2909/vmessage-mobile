import { appActions } from 'app/stores/persisted-app.store';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { TextInput, TextStyle, ViewStyle } from 'react-native';
import { useDispatch } from 'react-redux';

import {
  Button,
  Icon,
  Screen,
  Text,
  TextField,
  TextFieldAccessoryProps,
} from '../components';
import { AppStackScreenProps } from '../navigators';
import { colors, spacing } from '../theme';

interface LoginScreenProps extends AppStackScreenProps<'Login'> {}

export const LoginScreen: FC<LoginScreenProps> = function LoginScreen(_props) {
  const dispatch = useDispatch();

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
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={['top', 'bottom']}
    >
      <Text
        testID="login-heading"
        tx="loginScreen.signIn"
        preset="heading"
        style={$signIn}
      />
      <Text
        tx="loginScreen.enterDetails"
        preset="subheading"
        style={$enterDetails}
      />
      {attemptsCount > 2 && (
        <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />
      )}

      <TextField
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="loginScreen.emailFieldLabel"
        placeholderTx="loginScreen.emailFieldPlaceholder"
        status={error ? 'error' : undefined}
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
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
      />

      <Button
        testID="login-button"
        tx="loginScreen.tapToSignIn"
        style={$tapButton}
        preset="reversed"
        onPress={login}
      />
    </Screen>
  );
};

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.huge,
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
