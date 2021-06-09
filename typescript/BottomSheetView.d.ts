/**
 * Created by nghinv on Wed Feb 17 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { ButtonActionSheetProps } from './Button';
import { BottomButtonActionSheetProps } from './BottomButton';
import { HeaderProps } from './Header';
import { SeparatorProps } from './Separator';

type ButtonBottomSheetType = {
  autoDismiss?: Boolean;
}

type OptionsBottomSheet = Array<BottomButtonActionSheetProps | ButtonBottomSheetType>

export interface BottomSheetViewProps {
  options?: OptionsBottomSheet;
  renderContent?: React.FC;
  renderBackground?: React.FC;
  borderRadius?: Number;
  width?: Number | String;
  nativeModal?: Boolean;
  backgroundColor?: String;
  separatorColor?: String;
  animationType?: 'spring' | 'timing';
  springAnimationConfig?: Object;
  timingAnimationConfig?: Object;
  onHide?: () => void;
  zIndex?: Number | null;
  header?: HeaderProps;
  headerProps?: HeaderProps;
  optionProps?: ButtonActionSheetProps;
  bottomButton?: BottomButtonActionSheetProps;
  bottomButtonProps?: BottomButtonActionSheetProps;
  testIDActionSheet?: String;
  accessibilityLabelActionSheet?: String;
  showStatusBar?: Boolean;
  checkedPosition?: Number;
  renderOptions?: React.FC | React.Component;
}

interface BottomSheetViewInterface extends React.FC<BottomSheetViewProps> {
  Button: React.FC<ButtonActionSheetProps>;
  BottomButton: React.FC<BottomButtonActionSheetProps>;
  Header: React.FC<HeaderProps>;
  Separator: React.FC<SeparatorProps>;
}

export const BottomSheetView: BottomSheetViewInterface;
