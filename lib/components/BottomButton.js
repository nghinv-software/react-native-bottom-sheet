/**
 * Created by nghinv on Sat Jan 09 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';

export interface BottomButtonActionSheetProps {
  style?: ViewStyle;
  title: String;
  titleColor?: String;
  borderRadius?: Number;
  backgroundColor?: String;
  titleStyle?: TextStyle;
  onPress?: () => void;
  testIDButton?: String;
  accessibilityLabelButton?: String;
  testIDTitle?: String;
  accessibilityLabelTitle?: String;
}

BottomButton.defaultProps = {
  titleColor: 'white',
  backgroundColor: '#0066FF',
  borderRadius: 10,
};

export default function BottomButton(props?: BottomButtonActionSheetProps) {
  const {
    title,
    style,
    titleStyle,
    titleColor,
    onPress,
    backgroundColor,
    borderRadius,
    testIDButton,
    accessibilityLabelButton,
    testIDTitle,
    accessibilityLabelTitle,
    checkedPosition,
  } = props;

  const onBottomButtonPress = () => {
    onPress && onPress(checkedPosition);
  };

  return (
    <TouchableOpacity
      testID={testIDButton}
      accessibilityLabel={accessibilityLabelButton}
      activeOpacity={0.8}
      onPress={onBottomButtonPress}
      style={[styles.container, { backgroundColor, borderRadius }, style]}
    >
      <Text
        testID={testIDTitle}
        accessibilityLabel={accessibilityLabelTitle}
        style={[styles.title, { color: titleColor }, titleStyle]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '500',
  },
});
