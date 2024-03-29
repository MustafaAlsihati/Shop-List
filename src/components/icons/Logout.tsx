import React from 'react';
import { StyleProp } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface Props {
  color?: string;
  size?: number;
  style?: StyleProp<any>;
}

const Logout = React.memo<Props>(({ color, size, style }) => {
  return (
    <Svg width={size ? size : '26'} height={size ? size : '26'} fill="none" viewBox="0 0 24 24" style={style ? style : {}}>
      <Path
        fill={color ? color : '#A0AEC0'}
        fillRule="evenodd"
        d="M9.895 11.23a.77.77 0 00-.783.77c0 .42.346.77.783.77H16v4.78C16 20 13.975 22 11.472 22H6.517C4.025 22 2 20.01 2 17.56V6.45C2 3.99 4.035 2 6.528 2h4.965C13.975 2 16 3.99 16 6.44v4.79H9.895zm9.735-2.69l2.92 2.91a.764.764 0 010 1.09l-2.92 2.91c-.15.15-.35.23-.54.23a.773.773 0 01-.55-1.32l1.6-1.59H16v-1.54h4.14l-1.6-1.59c-.3-.3-.3-.79 0-1.09.3-.31.79-.31 1.09-.01z"
        clipRule="evenodd"
      />
    </Svg>
  );
});

export default Logout;
