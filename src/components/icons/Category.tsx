import React from 'react';
import { StyleProp } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface Props {
  color?: string;
  size?: number;
  style?: StyleProp<any>;
}

const Category = React.memo(({ color, size, style }: Props) => {
  return (
    <Svg width={size ? size : '26'} height={size ? size : '26'} fill="none" viewBox="0 0 24 24" style={style ? style : {}}>
      <Path
        fill={color ? color : '#A0AEC0'}
        fillRule="evenodd"
        d="M4.54 2h3.38c1.41 0 2.54 1.15 2.54 2.561V7.97c0 1.42-1.13 2.56-2.54 2.56H4.54C3.14 10.53 2 9.39 2 7.97V4.561C2 3.15 3.14 2 4.54 2zm0 11.47h3.38c1.41 0 2.54 1.14 2.54 2.56v3.41c0 1.41-1.13 2.56-2.54 2.56H4.54C3.14 22 2 20.85 2 19.44v-3.41c0-1.42 1.14-2.56 2.54-2.56zM19.46 2h-3.38c-1.41 0-2.54 1.15-2.54 2.561V7.97c0 1.42 1.13 2.56 2.54 2.56h3.38c1.4 0 2.54-1.14 2.54-2.56V4.561C22 3.15 20.86 2 19.46 2zm-3.38 11.47h3.38c1.4 0 2.54 1.14 2.54 2.56v3.41c0 1.41-1.14 2.56-2.54 2.56h-3.38c-1.41 0-2.54-1.15-2.54-2.56v-3.41c0-1.42 1.13-2.56 2.54-2.56z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
});

export default Category;
