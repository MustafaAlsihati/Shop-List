import React from 'react';
import { StyleProp } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface Props {
  color?: string;
  size?: number;
  style?: StyleProp<any>;
}

const Profile = React.memo<Props>(({ color, size, style }) => {
  return (
    <Svg width={size ? size : '26'} height={size ? size : '26'} fill="none" viewBox="0 0 24 24" style={style ? style : {}}>
      <Path
        fill={color ? color : '#A0AEC0'}
        fillRule="evenodd"
        d="M17.294 7.291A5.274 5.274 0 0112 12.583a5.275 5.275 0 01-5.294-5.292A5.274 5.274 0 0112 2a5.273 5.273 0 015.294 5.291zM12 22c-4.338 0-8-.705-8-3.425 0-2.721 3.685-3.401 8-3.401 4.339 0 8 .705 8 3.425C20 21.32 16.315 22 12 22z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
});

export default Profile;
