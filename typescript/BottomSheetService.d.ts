/**
 * Created by nghinv on Wed Feb 17 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import { BottomSheetViewProps } from './BottomSheetView';

export interface BottomSheetServiceType {
  show: (content: BottomSheetViewProps) => void;
  hide: () => void;
  hideAll: () => void;
}

interface BottomSheetViewPropsType extends BottomSheetViewProps {
  reference?: (data: BottomSheetServiceType) => void;
}

export const BottomSheet: BottomSheetServiceType;

export declare function BottomSheetService(props: BottomSheetViewPropsType): JSX.Element;
