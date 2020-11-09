import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Upload = ({ color, size, style }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size ? size : '26'}
      height={size ? size : '26'}
      fill="none"
      viewBox="0 0 24 24"
      style={style ? style : {}}
    >
      <Path
        stroke={color ? color : '#A0AEC0'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M7.39 8.984h-.934a3.685 3.685 0 00-3.685 3.685v4.875a3.685 3.685 0 003.685 3.684h11.13a3.685 3.685 0 003.686-3.684v-4.885a3.675 3.675 0 00-3.674-3.675h-.944M12.021 2.19v12.042M9.106 5.119l2.915-2.928 2.916 2.928"
      ></Path>
    </Svg>
  );
};

export default Upload;
