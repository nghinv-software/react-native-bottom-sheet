/**
 * Created by nghinv on Mon Jan 25 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, BackHandler } from 'react-native';
import Animated, { Easing, Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { defaultSpringConfig, defaultTimingConfig, isNullOrUndefined } from './utils';
import ModalCustom from './components/ModalCustom';
import Overlay, { OverlayProps } from './components/Overlay';
import Separator, { SeparatorProps } from './components/Separator';
import Button, { ButtonActionSheetProps } from './components/Button';
import BottomButton, { BottomButtonActionSheetProps } from './components/BottomButton';
import Header, { HeaderProps } from './components/Header';

type ButtonBottomSheetType = {
  autoDismiss?: Boolean;
}
type OptionsBottomSheet = Array<ButtonActionSheetProps | ButtonBottomSheetType>

export interface BottomSheetViewProps {
  options: OptionsBottomSheet;
  renderContent?: React.FC;
  renderBackground?: React.FC;
  borderRadius?: Number;
  width?: Number | String;
  nativeModal: Boolean;
  backgroundColor?: String;
  separatorColor?: String;
  animationType?: 'spring' | 'timing';
  springAnimationConfig: Object;
  timingAnimationConfig: Object;
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
  overlayProps?: OverlayProps;
  checkPosition?: Number;
  renderOptions?: React.FC | React.Component;
}

interface BottomSheetViewInterface extends React.FC<BottomSheetViewProps> {
  Button: React.FC<ButtonActionSheetProps>;
  BottomButton: React.FC<BottomButtonActionSheetProps>;
  Header: React.FC<HeaderProps>;
  Separator: React.FC<SeparatorProps>;
}

const SCREEN = Dimensions.get('window');

function BottomSheetViewComponent(props?: BottomSheetViewProps, ref: React.Ref) {
  const {
    options,
    width,
    renderContent,
    nativeModal,
    backgroundColor,
    separatorColor,
    animationType,
    springAnimationConfig,
    timingAnimationConfig,
    avoidKeyboard,
    onHide,
    renderBackground,
    borderRadius,
    header,
    headerProps,
    optionProps,
    bottomButton,
    zIndex,
    testIDActionSheet,
    accessibilityLabelActionSheet,
    showStatusBar,
    overlayProps,
    bottomButtonProps,
    renderOptions,
  } = props;
  const [visible, setVisible] = useState(props.visible);
  const [checkedPosition, setCheckedPosition] = useState(props.checkedPosition);
  const progress = useSharedValue(0);
  const transY = useSharedValue(0);
  const backHandler = useRef();
  const _mounted = useRef(false);

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
    },
    hide: () => {
      onDismissModal();
    },
  }));

  useEffect(() => {
    if (visible) {
      backHandler.current = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
      if (animationType === 'spring') {
        progress.value = withSpring(1, springAnimationConfig);
      } else {
        progress.value = withTiming(1, timingAnimationConfig);
      }
    }
  }, [visible]);

  useEffect(() => {
    _mounted.current = true;

    return () => {
      _mounted.current = false;
    };
  }, []);

  const handleBackButton = () => {
    onDismissModal();
    return true;
  };

  const onDismissModal = useCallback(() => {
    if (backHandler.current) {
      backHandler.current.remove();
      backHandler.current = null;
    }

    progress.value = withTiming(0, { duration: 150, easing: Easing.linear }, () => {
      runOnJS(oncancel)();
    });
  }, []);

  const oncancel = useCallback(() => {
    _mounted.current && setVisible(false);
    onHide && onHide();
  }, [onHide]);

  const contentStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: interpolate(progress.value, [0, 1], [SCREEN.height, 0], Extrapolate.CLAMP) },
        { translateY: transY.value },
      ],
    };
  });

  const safeArea = useSafeAreaInsets();
  const hadHeader = !isNullOrUndefined(header);

  return (
    <ModalCustom
      nativeModal={nativeModal}
      visible={visible}
      avoidKeyboard={avoidKeyboard}
      onDismiss={onDismissModal}
      zIndex={zIndex}
    >
      <Overlay {...overlayProps} showStatusBar={showStatusBar} progress={progress} onPress={onDismissModal} />
      <View pointerEvents='box-none' style={styles.container}>
        <Animated.View
          testID={testIDActionSheet}
          accessibilityLabel={accessibilityLabelActionSheet}
          pointerEvents='box-none'
          style={contentStyle}
        >
          {
            renderContent ? renderContent() : (
              <View pointerEvents='box-none' style={[styles.viewContent, { width }]}>
                <View style={[styles.viewTop]}>
                  {
                    hadHeader && (
                      <>
                        <Header
                          backgroundColor={backgroundColor}
                          {...headerProps}
                          {...header}
                          checkedPosition={checkedPosition}
                          transY={transY}
                          onDismissModal={onDismissModal}
                          renderBackground={renderBackground}
                          borderRadius={borderRadius}
                        />
                        <Separator backgroundColor={separatorColor} />
                      </>
                    )
                  }
                  <View
                    style={{ backgroundColor }}
                  >
                    {
                      renderBackground && (
                        <View style={StyleSheet.absoluteFillObject}>
                          {typeof renderBackground === 'function' ? renderBackground() : renderBackground}
                        </View>
                      )
                    }
                    {renderOptions && (typeof renderOptions === 'function' ? renderOptions() : renderOptions)}
                    {
                      !renderOptions && Array.isArray(options) && options.length > 0 && (
                        <Animated.ScrollView
                          showsVerticalScrollIndicator={false}
                          scrollEventThrottle={16}
                          bounces={false}
                          style={{
                            maxHeight: SCREEN.height - (hadHeader ? 64 : 0) - 16 - 24 - (safeArea.top + safeArea.bottom),
                          }}
                          contentContainerStyle={{ paddingBottom: safeArea.bottom }}
                        >
                          {
                            options.map((option, idx) => (
                              <React.Fragment key={String(idx)}>
                                {
                                  idx > 0 && idx < options.length && <Separator style={styles.separator} backgroundColor={separatorColor} />
                                }
                                <Button
                                  {...optionProps}
                                  {...option}
                                  checked={!isNullOrUndefined(checkedPosition) ? checkedPosition === idx : option.checked}
                                  onPress={() => {
                                    option.autoDismiss !== false && onDismissModal();
                                    if (!isNullOrUndefined(checkedPosition)) {
                                      setCheckedPosition(idx);
                                    }
                                    if (nativeModal) {
                                      setTimeout(() => {
                                        option.onPress && option.onPress(onDismissModal);
                                      }, 200);
                                    } else {
                                      option.onPress && option.onPress(onDismissModal);
                                    }
                                  }}
                                />
                              </React.Fragment>
                            ))
                          }
                          {
                            !isNullOrUndefined(bottomButton) && (
                              <View style={styles.viewBottomTitle}>
                                <BottomButton
                                  {...bottomButtonProps}
                                  {...bottomButton}
                                  checkedPosition={checkedPosition}
                                />
                              </View>
                            )
                          }
                        </Animated.ScrollView>
                      )
                    }
                  </View>
                </View>
              </View>
            )
          }
        </Animated.View>
      </View>
    </ModalCustom>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  viewContent: {
    overflow: 'hidden',
    alignSelf: 'center',
  },
  viewTop: {
    overflow: 'hidden',
  },
  row: {
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    marginHorizontal: 12,
  },
  viewBottomTitle: {
    padding: 12,
  },
});

const BottomSheetView: BottomSheetViewInterface = React.memo(forwardRef(BottomSheetViewComponent));

BottomSheetView.defaultProps = {
  backgroundColor: 'white',
  animationType: 'timing',
  options: [],
  borderRadius: 15,
  width: Math.min(SCREEN.width, 450),
  nativeModal: true,
  visible: false,
  springAnimationConfig: defaultSpringConfig,
  timingAnimationConfig: defaultTimingConfig,
};

// Component ActionSheet Header
BottomSheetView.Header = Header;

// Component ActionSheet Button
BottomSheetView.Button = Button;

// Component ActionSheet Separator
BottomSheetView.Separator = Separator;

// Component ActionSheet BottomButton
BottomSheetView.BottomButton = BottomButton;

export default BottomSheetView;
