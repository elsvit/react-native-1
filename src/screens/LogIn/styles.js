// @flow
import { StyleSheet, Dimensions } from 'react-native';
import styles from '../../constants/styles';

const { height } = Dimensions.get('window');
const { colors, font, size } = styles;

export default StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    flex: 1,
  },
  container: {
    flexDirection: 'column',
    height: height - size.screenPadding,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  logInForm: {
    padding: size.screenPadding,
    paddingTop: size.screenPadding + size.statusbarHeight,
    width: '100%',
    backgroundColor: colors.white,
  },
  titleBlock: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  titleText: {
    color: colors.darkGray,
    ...font.style.medium,
    fontSize: 26,
    textAlign: 'center',
  },
  section: {
    height: 70,
    paddingBottom: 20,
  },
  section2: {
    height: 50,
    paddingBottom: 20,
    backgroundColor: colors.white,
  },
  inputField: {
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.lightGrayE9,
  },
  inputText: {
    color: colors.darkGray,
    fontSize: font.size.normal,
    ...font.style.regular,
    paddingLeft: 20,
  },
  forgotText: {
    textAlign: 'right',
    color: colors.darkGray,
    fontSize: font.size.normal,
    ...font.style.regular,
  },
  submitBtn: {
    width: 160,
    height: 50,
    alignSelf: 'center',
  },
  submitBtnGradient: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 80,
  },
  submitText: {
    color: colors.white,
    fontSize: font.size.normal,
    ...font.style.medium,
    textAlign: 'center',
  },
  bottomSection: {
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    color: colors.darkGray,
    fontSize: font.size.normal,
    ...font.style.regular,
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
  errorMessage: {
    top: 0,
    borderBottomWidth: 1,
    borderBottomColor: styles.colors.red,
    color: colors.red,
    alignSelf: 'flex-start',
    marginLeft: 20,
    fontSize: font.size.xSmall,
  },
  // bottomField: {
  //   flex: 1,
  //   minHeight: 50,
  // },
});

export const colorGray = colors.gray;
export const colorMediumBlue = colors.mediumBlue;
export const colorBlue = colors.blue;
