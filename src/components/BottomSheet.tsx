import React from 'react';
import { bottomSheetStyle } from '../constants/Theme';
import RBSheet from 'react-native-raw-bottom-sheet';

const BottomSheet = React.memo<any>(({ children, refRBSheet, onClose, height, closeOnDragDown, dragFromTopOnly }: any) => {
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
});

export default BottomSheet;
