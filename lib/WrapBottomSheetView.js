/**
 * Created by nghinv on Mon Jan 25 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import React, { forwardRef, useImperativeHandle, useState, useRef, useCallback, useEffect } from 'react';
import BottomSheetView from './BottomSheetView';

function WrapBottomSheetView(props, ref) {
  const [bottomSheetsContent, setBottomSheetsContent] = useState([]);
  const bottomSheetRef = useRef({});
  const bottomSheetCount = useRef(0);
  const currentZIndex = useRef(undefined);

  const setVisible = useCallback((value, id) => {
    if (value) {
      setBottomSheetsContent(currentBottomSheets => currentBottomSheets.map(bottomSheet => (bottomSheet.id === id ? { ...bottomSheet, visible: value } : bottomSheet)));
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(bottomSheetsContent) && bottomSheetsContent.length === 0) {
      currentZIndex.current = undefined;
    }
  }, [bottomSheetsContent]);

  useImperativeHandle(ref, () => ({
    show: (content) => {
      bottomSheetCount.current++;
      const id = bottomSheetCount.current;
      if (content && content.zIndex !== undefined) {
        currentZIndex.current = content.zIndex;
      }
      setBottomSheetsContent(currentBottomSheets => currentBottomSheets.concat({
        ...content,
        id,
        visible: true,
        zIndex: currentZIndex.current,
        setVisible: (value) => setVisible(value, id),
        onHide: () => {
          content && content.onHide && content.onHide();
          setBottomSheetsContent(bottomSheetsState => bottomSheetsState.filter(bottomSheet => bottomSheet.id !== id));
          bottomSheetCount.current--;
        },
      }));
    },
    hide: () => {
      bottomSheetRef.current[bottomSheetCount.current] && bottomSheetRef.current[bottomSheetCount.current].hide();
    },
    hideAll: () => {
      Object.keys(bottomSheetRef.current).forEach(dataKey => {
        bottomSheetRef.current[dataKey] && bottomSheetRef.current[dataKey].hide();
      });
    },
  }), [bottomSheetCount.current]);

  return bottomSheetsContent.map((bottomSheet, idx) => {
    return (
      <BottomSheetView
        {...props}
        {...bottomSheet}
        nativeModal={false}
        key={`${bottomSheet.id}_${idx}`}
        ref={refs => { bottomSheetRef.current[bottomSheet.id] = refs; }}
      />
    );
  });
}

export default React.memo(forwardRef(WrapBottomSheetView));
