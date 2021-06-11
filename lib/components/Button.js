/**
 * Created by nghinv on Sat Jan 09 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, IconType } from '@nghinv/react-native-icons';
import { isNullOrUndefined } from '../utils';

export interface ButtonActionSheetProps {
  title?: String;
  onPress?: () => void;
  checked?: Boolean;
  titleColor?: String;
  iconCheckColor?: String;
  leftIconName?: String;
  leftIconColor?: String;
  leftIconType?: IconType;
  renderRight?: () => void;
  testIDButton?: String;
  accessibilityLabelButton?: String;
  testIDTitle?: String;
  accessibilityLabelTitle?: String;
  titleCenter?: Boolean;
}

Button.defaultProps = {
  titleColor: '#323B46',
  iconCheckColor: '#0066FF',
  leftIconColor: '#0066FF',
  titleCenter: false,
};

export default function Button(props?: ButtonActionSheetProps) {
  const {
    title,
    onPress,
    checked,
    titleColor,
    iconCheckColor,
    leftIconName,
    leftIconColor,
    leftIconType,
    renderRight,
    testIDButton,
    accessibilityLabelButton,
    testIDTitle,
    accessibilityLabelTitle,
    titleCenter,
  } = props;
  return (
    <TouchableOpacity
      testID={testIDButton}
      accessibilityLabel={accessibilityLabelButton}
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.container, isNullOrUndefined(checked) && !leftIconName && !renderRight && titleCenter && { justifyContent: 'center' }]}
    >
      {
        leftIconName && (
          <Icon
            style={styles.leftIcon}
            type={leftIconType}
            name={leftIconName}
            color={leftIconColor}
            size={32}
          />
        )
      }
      <Text
        testID={testIDTitle}
        accessibilityLabel={accessibilityLabelTitle}
        numberOfLines={2}
        style={[styles.txtTitle, { color: titleColor }, (!isNullOrUndefined(checked) || renderRight || !titleCenter) && { flex: 1 }]}
      >
        {title}
      </Text>
      {renderRight && renderRight()}
      {
        checked && (
          <Icon
            style={styles.icon}
            name='check'
            color={iconCheckColor}
            size={24}
          />
        )
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 54,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
  },
  leftIcon: {
    marginRight: 8,
  },
  txtTitle: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 24,
  },
  icon: {
    marginLeft: 8,
  },
});
