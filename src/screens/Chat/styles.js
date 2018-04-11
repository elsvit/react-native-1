// @flow
import { StyleSheet } from 'react-native';
import styles from '../../constants/styles';

const { colors, font, size } = styles;

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: size.statusbarHeight,
  },
  containerView: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  block: {
    width: '100%',
  },
  leftBlock: {
    width: '80%',
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatarWrapper: {
    flex: 1,
    padding: 5,
    marginRight: 5,
  },
  contactInfoWrapper: {
    flex: 6,
    flexDirection: 'column',
  },
  contactTextWrapper: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  rightBlock: {
    width: '70%',
    flexDirection: 'column',
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  myTextWrapper: {
    width: '100%',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    marginBottom: 1,
  },
  myText: {
    fontSize: 16,
    color: colors.white,
    ...font.style.regular,
    textAlign: 'left',
  },
  contactText: {
    fontSize: 16,
    color: '#515151',
    ...font.style.regular,
    textAlign: 'left',
  },
  messageTimeWrapper: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
  },
  messageTime: {
    fontSize: 12,
    color: '#a5a5a5',
    ...font.style.regular,
    textAlign: 'left',
  },
  inputBlock: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    flex: 1,
    height: 60,
    width: '100%',
    backgroundColor: colors.white,
    padding: 10,
  },
  inputLeftImgWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputLeftImg: {
    width: 16,
    height: 16,
    alignSelf: 'center',
  },
  inputWrapper: {
    flex: 6,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 12,
    color: '#6a6a6a',
    ...font.style.regular,
    textAlign: 'left',
  },
  inputRightImgWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputRightImgWrapperTouch: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputRightImg: {
    width: 21,
    height: 20,
    alignSelf: 'center',
  },
  emptyBlock: {
    height: 60,
    width: '100%',
  },
});
