// @flow
import { StyleSheet } from 'react-native';

import styles from '../../../constants/styles';

const { colors, font } = styles;

export default StyleSheet.create({
  block: {
    flex: 1,
  },
  markerView: {
    marginBottom: -2,
  },
  userPlaceSmallCircleWrapper: {
    position: 'absolute',
    width: '100%',
    height: 16,
    bottom: -8,
    overflow: 'visible',
  },
  userPlaceSmallCircle: {
    alignSelf: 'center',
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 4,
    borderColor: 'rgba(100, 120, 220, 0.08)',
    backgroundColor: '#6d8bfb',
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: colors.white,
    borderWidth: 9,
    alignSelf: 'center',
    marginBottom: -9,
  },
});
