import { translate, TxKeyPath } from 'app/i18n';
import { alignItemsCenter } from 'app/styles';
import { colors, spacing } from 'app/theme';
import { Box, HStack, IconButton, Text, View } from 'native-base';
import React, { FC } from 'react';

type FCProps = {
  bg?: string;
  textTx?: TxKeyPath;
  leftIcon?: FC<{ color: string }>;
  onPressLeftIcon?: () => void;
};

export const Header: FC<FCProps> = ({
  bg,
  textTx,
  leftIcon: LeftIcon,
  onPressLeftIcon,
}) => {
  return (
    <View>
      <Box safeAreaTop backgroundColor={colors.primary} />
      <Box bg={bg || colors.primary} style={{ minHeight: spacing.huge }}>
        <HStack>
          <HStack style={alignItemsCenter}>
            {!!LeftIcon && (
              <IconButton
                color="white"
                icon={<LeftIcon color="light" />}
                onPress={onPressLeftIcon}
              />
            )}
            {!!textTx && <Text color="light">{translate(textTx)}</Text>}
          </HStack>
        </HStack>
      </Box>
    </View>
  );
};
