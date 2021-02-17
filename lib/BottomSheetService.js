/**
 * Created by nghinv on Mon Jan 25 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React, { useEffect } from 'react';
import WrapBottomSheetView from './WrapBottomSheetView';
import WapBottomSheetViewNativeModal from './WrapBottomSheetViewNativeModal';
import { BottomSheetViewProps } from './BottomSheetView';

export interface BottomSheetServiceType {
  show: (content: BottomSheetViewProps) => void;
  hide: () => void;
  hideAll: () => void;
}

interface BottomSheetViewPropsType extends BottomSheetViewProps {
  reference?: (data: BottomSheetServiceType) => void;
}

// eslint-disable-next-line import/no-mutable-exports
let BottomSheet: BottomSheetServiceType;

export default function BottomSheetService({ children, nativeModal = true, reference, ...defaultProps }: BottomSheetViewPropsType) {
  useEffect(() => {
    reference && reference(BottomSheet);
  }, [reference]);

  return (
    <>
      {children}
      {
        nativeModal ? (
          <WapBottomSheetViewNativeModal {...defaultProps} nativeModal={nativeModal} ref={refs => { BottomSheet = refs; }} />
        ) : <WrapBottomSheetView {...defaultProps} nativeModal={nativeModal} ref={refs => { BottomSheet = refs; }} />
      }
    </>
  );
}

export { BottomSheet };
