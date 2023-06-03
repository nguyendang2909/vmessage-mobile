import { translate, TxKeyPath } from 'app/i18n';
import { alignItemsCenter } from 'app/styles/alignItems';
import { colors, spacing } from 'app/theme';
import { Box, HStack, IconButton, Text, View } from 'native-base';
import React, { FC } from 'react';

type FCProps = {
  bg?: string;
  textTx?: TxKeyPath;
  leftIcon?: JSX.Element;
  leftIconOnPress?: () => void;
};

export const Header: FC<FCProps> = ({
  bg,
  textTx,
  leftIcon,
  leftIconOnPress,
}) => {
  return (
    <View>
      <Box safeAreaTop backgroundColor={colors.primary} />
      <Box bg={bg || colors.primary} style={{ minHeight: spacing.huge }}>
        <HStack>
          <HStack style={alignItemsCenter}>
            {!!leftIcon && (
              <IconButton icon={leftIcon} onPress={leftIconOnPress} />
            )}
            {!!textTx && <Text>{translate(textTx)}</Text>}
          </HStack>
        </HStack>
      </Box>
    </View>
  );
};
