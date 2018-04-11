// @flow
import { StyleSheet } from 'react-native';
import styles from '../../constants/styles';

const { colors, font, size } = styles;

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingTop: size.statusbarHeight,
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  text: {
    fontSize: font.size.normal,
    color: colors.darkGray,
    ...font.style.medium,
  },
  icon: {
    width: size.drawIconSize,
    height: size.drawIconSize,
    tintColor: colors.gray,
  },
});
