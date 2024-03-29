/**
 * Created by nghinv on Tue Jan 26 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle, TextProps, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedGestureHandler, withTiming } from 'react-native-reanimated';
import { Icon, IconProps } from '@nghinv/react-native-icons';
import { defaultTimingConfig, isNullOrUndefined, snapPoint } from '../utils';

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
  onPressRightButton?: (onDismissModal: Function) => {};
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

Header.defaultProps = {
  closeButton: true,
  anchorPoint: true,
  onPressRightButtonToDismiss: true,
  rightButtonDisabled: false,
  rightTitleColor: '#0066FF',
  backgroundColor: 'white',
};

export default function Header(props?: HeaderProps) {
  const {
    transY,
    title,
    titleColor,
    titleStyle,
    message,
    messageColor,
    messageStyle,
    style,
    titleProps,
    messageProps,
    closeButton,
    renderRightButton,
    onDismissModal,
    onPressRightButton,
    rightButtonTitle,
    rightButtonIcon,
    renderBackground,
    rightTitleColor,
    backgroundColor,
    borderRadius,
    closeButtonProps,
    rightButtonProps,
    closeIconProps,
    rightIconProps,
    anchorPoint,
    checkedPosition,
    onPressRightButtonToDismiss,
    rightButtonDisabled,
  } = props;

  const onPressRight = () => {
    onPressRightButtonToDismiss && onDismissModal && onDismissModal();
    onPressRightButton && onPressRightButton(checkedPosition);
  };

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      if (!transY) return;

      ctx.y = transY.value;
    },
    onActive: (event, ctx) => {
      if (!transY) return;

      const newTransY = ctx.y + event.translationY;
      if (newTransY > 0) {
        transY.value = newTransY;
      }
    },
    onFinish: (event) => {
      if (!transY) return;

      const snapPoits = [0, 300];
      const toSnap = snapPoint(transY.value, event.velocityY, snapPoits);
      if (toSnap === 0) {
        transY.value = withTiming(0, defaultTimingConfig);
      } else {
        runOnJS(onDismissModal)();
      }
    },
  });

  const ButtonRight = rightButtonDisabled ? View : TouchableOpacity;

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={style}>
        {
          anchorPoint && (
            <View style={[styles.anchorPoint, { backgroundColor }]}>
              {
                renderBackground && (
                  <View style={StyleSheet.absoluteFillObject}>
                    {typeof renderBackground === 'function' ? renderBackground() : renderBackground}
                  </View>
                )
              }
            </View>
          )
        }
        <View
          style={[
            styles.viewContent,
            {
              backgroundColor,
              borderTopLeftRadius: borderRadius,
              borderTopRightRadius: borderRadius,
            },
          ]}
        >
          {
            renderBackground && (
              <View style={StyleSheet.absoluteFillObject}>
                {typeof renderBackground === 'function' ? renderBackground() : renderBackground}
              </View>
            )
          }
          {
            closeButton ? (
              <TouchableOpacity {...closeButtonProps} onPress={onDismissModal} style={styles.viewButton}>
                <Icon name='clear' size={28} {...closeIconProps} />
              </TouchableOpacity>
            ) : <View style={styles.viewButton} />
          }
          <View style={[styles.viewMiddle, !isNullOrUndefined(rightButtonTitle) && { paddingLeft: 40 }]}>
            {
              !isNullOrUndefined(title) && <Text {...titleProps} style={[styles.txtTitle, { color: titleColor }, titleStyle]}>{title}</Text>
            }
            {
              !isNullOrUndefined(message) && <Text {...messageProps} style={[styles.txtMessage, { color: messageColor }, messageStyle]}>{message}</Text>
            }
          </View>
          {
            renderRightButton ? renderRightButton(onDismissModal) : !isNullOrUndefined(rightButtonTitle) ? (
              <ButtonRight {...rightButtonProps} onPress={onPressRight} style={[styles.viewButtonTitle, { opacity: rightButtonDisabled ? 0.4 : 1 }]}>
                <Text style={[styles.txtButton, { color: rightTitleColor }]}>{rightButtonTitle}</Text>
              </ButtonRight>
            ) : !isNullOrUndefined(rightButtonIcon) ? (
              <ButtonRight {...rightButtonProps} onPress={onPressRight} style={[styles.viewButton, { opacity: rightButtonDisabled ? 0.4 : 1 }]}>
                <Icon name={rightButtonIcon} size={28} {...rightIconProps} />
              </ButtonRight>
            ) : <View style={styles.viewButton} />
          }
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  anchorPoint: {
    width: 40,
    height: 6,
    marginBottom: 8,
    borderRadius: 3,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  viewContent: {
    flexDirection: 'row',
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    paddingVertical: 4,
  },
  viewMiddle: {
    paddingHorizontal: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewButtonTitle: {
    height: 48,
    width: 80,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 12,
  },
  txtTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  txtMessage: {
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 2,
  },
  txtButton: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
