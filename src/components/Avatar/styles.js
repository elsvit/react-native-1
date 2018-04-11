// @flow
import { StyleSheet } from 'react-native';

import styles from '../../constants/styles';

const { colors, font } = styles;

export default StyleSheet.create({
  block: {
    flex: 1,
  },
  markerView: {
    marginBottom: -2,
  },
  circleImgView: {
    borderColor: colors.white,
  },
  avatarImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderColor: colors.white,
  },
  roleSmallCircleWrapper: {
    position: 'absolute',
    borderColor: colors.white,
  },
  roleSmallCircle: {
    position: 'absolute',
    borderColor: colors.white,
    top: 0,
    left: 0,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
