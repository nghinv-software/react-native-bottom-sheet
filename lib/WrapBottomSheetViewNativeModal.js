/**
 * Created by nghinv on Mon Jan 25 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React, { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import BottomSheetView from './BottomSheetView';

function WrapBottomSheetViewNativeModal(props, ref) {
  const [bottomSheetContent, setBottomSheetContent] = useState(undefined);
  const bottomSheetRef = useRef({});

  useImperativeHandle(ref, () => ({
    show: (content) => {
      setBottomSheetContent({
        ...content,
        onHide: () => {
          content && content.onHide && content.onHide();
          setBottomSheetContent(undefined);
        },
      });
      bottomSheetRef.current.show();
    },
    hide: () => {
      bottomSheetRef.current.hide();
    },
    hideAll: () => {
      bottomSheetRef.current.close();
    },
  }));

  return (
    <BottomSheetView
      {...props}
      {...(bottomSheetContent || {})}
      nativeModal
      ref={bottomSheetRef}
    />
  );
}

export default React.memo(forwardRef(WrapBottomSheetViewNativeModal));
