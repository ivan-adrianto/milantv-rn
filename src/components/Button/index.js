// import {Button as View} from 'react-native';
// import React from 'react';

// const Button = ({text, type}) => {
//   return (
//     <View
//       styles={{
//         backgroundColor: type === 'login' ? 'white' : 'black',
//         textTransform: type === 'login' ? 'uppercase' : 'none',
//         borderRadius: type === 'login' ? 100 : 10,
//       }}>
//       {text}
//     </View>
//   );
// };

// export default Button;

import {Text} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ButtonLocal = ({children, type, onPress, ...props}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: type === 'login' ? 'white' : 'black',
        textTransform: type === 'login' ? 'uppercase' : 'none',
        borderRadius: type === 'login' ? 100 : 10,
        width: type === 'login' ? 124 : 97,
        height: type === 'login' ? 45 : 30,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}
      {...props}>
      <Text
        style={{
          fontSize: type === 'login' ? 18 : 16,
          fontFamily: 'Roboto-Regular',
          fontWeight: 'bold',
          color: 'black',
        }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonLocal;
