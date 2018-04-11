// @flow
import { StyleSheet, Dimensions } from 'react-native';

import styles from '../../constants/styles';

const { height, width } = Dimensions.get('window');
const { colors } = styles;

const PADDING = 8;
const OPTION_CONTAINER_MAX_HEIGHT = Math.round(height * 0.65);

export default StyleSheet.create({
  section: {
    height: 50,
    paddingBottom: 20,
    backgroundColor: colors.white,
  },
  pickerWrapper: {
    backgroundColor: colors.lightGray,
    height: 50,
    paddingLeft: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.lightGrayE9,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: styles.colors.gray,
  },
  overlayStyle: {
    width,
    height,
    backgroundColor: styles.colors.lightGray,
  },
  optionContainer: {
    borderRadius: styles.size.borderRadius,
    width: width * 0.8,
    maxHeight: OPTION_CONTAINER_MAX_HEIGHT,
    backgroundColor: styles.colors.white,
    left: width * 0.1,
    top: (height - OPTION_CONTAINER_MAX_HEIGHT) / 2,
    padding: 10,
  },
  cancelContainer: {
    left: width * 0.1,
    top: (height - OPTION_CONTAINER_MAX_HEIGHT) / 2 + 10,
  },
  selectStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 12,
    width: '100%',
  },
  selectTextStyle: {
    color: styles.colors.darkGray,
    fontSize: styles.font.size.normal,
    ...styles.font.style.regular,
  },
  cancelStyle: {
    borderRadius: styles.size.borderRadius,
    width: width * 0.8,
    backgroundColor: styles.colors.white,
    padding: PADDING,
  },
  cancelTextStyle: {
    textAlign: 'center',
    color: styles.colors.gray,
    fontSize: styles.font.size.normal,
    ...styles.font.style.regular,
  },
  optionStyle: {
    padding: PADDING,
    borderBottomWidth: 1,
    borderBottomColor: styles.colors.gray,
  },
  optionTextStyle: {
    color: styles.colors.darkGray,
    fontSize: styles.font.size.normal,
    ...styles.font.style.regular,
  },
  selectedOptionTextStyle: {
    color: styles.colors.darkGray,
  },
  carret: {
    width: 10,
    height: 7,
    resizeMode: 'contain',
  },
});
