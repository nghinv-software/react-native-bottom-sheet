/**
 * Created by nghinv on Wed Feb 17 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import { TextStyle, ViewStyle, TextProps, TouchableOpacityProps } from 'react-native';
import Animated from 'react-native-reanimated';
import { IconProps } from '@nghinv/react-native-icons';

export interface HeaderProps {
  title?: String;
  titleColor?: String;
  titleStyle?: TextStyle;
  messageColor?: String;
  messageStyle?: TextStyle;
  message?: String;
  style?: ViewStyle;
  titleProps?: TextProps;
  messageProps?: TextProps;
  closeButton?: Boolean;
  renderRightButton?: React.FC;
  transY?: Animated.SharedValue<Number>;
  onPressRightButton?: (checkPosition?: Number) => void;
  rightButtonIcon?: String;
  rightButtonTitle?: String;
  rightTitleColor?: String;
  backgroundColor?: String;
  closeIconProps?: IconProps;
  rightIconProps?: IconProps;
  closeButtonProps?: TouchableOpacityProps;
  rightButtonProps?: TouchableOpacityProps;
  anchorPoint?: Boolean;
  onPressRightButtonToDismiss?: Boolean;
  rightButtonDisabled?: Boolean;
}
