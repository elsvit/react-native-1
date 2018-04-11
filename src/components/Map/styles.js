// @flow
import { StyleSheet } from 'react-native';

import styles from '../../constants/styles';

const { colors } = styles;

export default StyleSheet.create({
  block: {
    flex: 1,
  },
  markerPhoto: {
    width: 55,
    height: 55,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: colors.white,
    // left: -27,
    backgroundColor: colors.lightGray,
    opacity: 0.5,
  },
  callout: {
    width: 140,
  },
});
