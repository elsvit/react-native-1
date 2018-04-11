// @flow
import { StyleSheet } from 'react-native';
import styles from '../../constants/styles';

const { colors, font, size } = styles;

export default StyleSheet.create({
  container: {
    backgroundColor: '#f7f9fd',
    flex: 1,
    paddingTop: size.statusbarHeight,
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  block: {
    flexDirection: 'row',
    height: 68,
    padding: 10,
    alignItems: 'center',
    marginVertical: 2,
    backgroundColor: colors.white,
  },
  blockGap: {
    marginTop: 10,
  },
  subblockLeft: {
    flex: 3,
    marginLeft: 10,
  },
  subblockRight: {
    flex: 1,
    height: '100%',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: font.size.normal,
    color: colors.darkGray,
    ...font.style.medium,
    textAlign: 'left',
  },
  rightIconImg: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
    tintColor: colors.gray,
    transform: [{ rotate: '180deg' }],
  },
  rightIconImgWrapper: {
    height: '100%',
    width: '100%',
  },
  downIconImg: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
    tintColor: colors.gray,
    transform: [{ rotate: '-90deg' }],
  },
  upIconImg: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
    tintColor: colors.gray,
    transform: [{ rotate: '90deg' }],
  },
  // switchWrapper: {
  //   // height: '100%',
  //   alignSelf: 'flex-end',
  //   alignItems: 'center',
  //   alignContent: 'center',
  //   backgroundColor: colors.lightBlue,
  // },
  icon: {
    width: size.drawIconSize,
    height: size.drawIconSize,
    tintColor: colors.gray,
  },
});
