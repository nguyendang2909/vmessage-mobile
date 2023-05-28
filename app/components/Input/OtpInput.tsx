import { colors } from 'app/theme';
import React, { FC, useRef, useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

export type FCProps = {
  code: string;
  setCode: (c: string) => void;
  maximumLength?: number;
};

export const OtpInput: FC<FCProps> = ({ code, setCode, maximumLength = 6 }) => {
  const inputRef = useRef();

  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

  const boxArray = new Array(maximumLength).fill(0);

  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    (inputRef as any).current.focus();
  };

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  const boxDigit = (_: number, index: number) => {
    const emptyInput = '';
    const digit = code[index] || emptyInput;

    const isCurrentValue = index === code.length;
    const isLastValue = index === maximumLength - 1;
    const isCodeComplete = code.length === maximumLength;

    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

    const StyledSplitBoxes =
      isInputBoxFocused && isValueFocused ? SplitBoxesFocused : SplitBoxes;

    return (
      <StyledSplitBoxes key={index}>
        <SplitBoxText>{digit}</SplitBoxText>
      </StyledSplitBoxes>
    );
  };

  const handleChangeText = text => {
    setCode(text.replace(/[^0-9]/g, ''));
  };

  return (
    <OTPInputContainer>
      <SplitOTPBoxesContainer onPress={handleOnPress}>
        {boxArray.map(boxDigit)}
      </SplitOTPBoxesContainer>
      <TextInputHidden
        keyboardType="numeric"
        value={code}
        onChangeText={handleChangeText}
        maxLength={maximumLength}
        ref={inputRef}
        onBlur={handleOnBlur}
      />
    </OTPInputContainer>
  );
};

export const OTPInputContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const TextInputHidden = styled.TextInput`
  position: absolute;
  opacity: 0;
`;

export const SplitBoxText = styled.Text`
  font-size: 20px;
  text-align: center;
`;

export const SplitBoxes = styled(View)(() => ({
  borderColor: colors.primary,
  borderWidth: 2,
  borderRadius: 5,
  padding: 12,
  minWidth: 50,
  minHeight: 50,
  maxHeight: 50,
  justifyContent: 'center',
  alignItems: 'center',
}));

export const SplitBoxesFocused = styled(SplitBoxes)`
  border-color: #ecdbba;
  background-color: grey;
`;

export const SplitOTPBoxesContainer = styled.Pressable`
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
`;
