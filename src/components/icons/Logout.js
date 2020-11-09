import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Logout = ({ color, size, style }) => {
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
        d="M15.016 7.39v-.933a3.685 3.685 0 00-3.685-3.685H6.456a3.685 3.685 0 00-3.684 3.685v11.13a3.685 3.685 0 003.684 3.684h4.885a3.675 3.675 0 003.675-3.674v-.943M21.81 12.021H9.768M18.881 9.106l2.928 2.915-2.928 2.916"
      ></Path>
    </Svg>
  );
};

export default Logout;
