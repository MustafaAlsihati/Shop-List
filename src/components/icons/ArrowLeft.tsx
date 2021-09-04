import React from 'react';
import { StyleProp } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface Props {
  color?: string;
  size?: number;
  style?: StyleProp<any>;
}

const ArrowLeft = React.memo(({ color, size, style }: Props) => {
  return (
    <Svg width={size ? size : '26'} height={size ? size : '26'} fill="none" viewBox="0 0 24 24" style={style ? style : {}}>
      <Path stroke={color ? color : '#A0AEC0'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.5 19l-7-7 7-7"></Path>
    </Svg>
  );
});

export default ArrowLeft;
