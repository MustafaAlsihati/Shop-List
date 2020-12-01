import React from 'react';
import { bottomSheetStyle } from '../constants/Theme';
import RBSheet from 'react-native-raw-bottom-sheet';

const BottomSheet = ({
  children,
  refRBSheet,
  onClose,
  height,
  closeOnDragDown,
  dragFromTopOnly,
}) => {
  return (
    <RBSheet
      ref={refRBSheet}
      onClose={onClose}
      height={height}
      closeOnDragDown={closeOnDragDown ? closeOnDragDown : true}
      dragFromTopOnly={dragFromTopOnly}
      animationType="none"
      keyboardAvoidingViewEnabled={true}
      customStyles={bottomSheetStyle}
    >
      {children}
    </RBSheet>
  );
};

export default BottomSheet;
