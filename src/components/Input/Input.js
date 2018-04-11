//  @flow
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import styles from '../../constants/styles';

const iStyle = StyleSheet.create({
  input: {
    paddingVertical: 10,
    color: styles.colors.darkGray,
    fontSize: styles.font.size.normal,
    ...styles.font.style.regular,
    paddingLeft: 24,
    backgroundColor: styles.colors.lightGray,
  },
});

type Props = {
  style?: ?StyleObj,
  maskTemplate?: ?Object,
};

export default function Input(props: Props) {
  const { style, maskTemplate, ...other } = props;

  if (maskTemplate) {
    return (
      <TextInputMask
        style={[iStyle.input, style]}
        underlineColorAndroid="transparent"
        type="custom"
        options={maskTemplate}
        {...other}
      />
    );
  }

  return <TextInput style={[iStyle.input, style]} underlineColorAndroid="transparent" {...other} />;
}

Input.defaultProps = {
  style: null,
  maskTemplate: undefined,
};
