// @flow
import { StyleSheet } from 'react-native';
import styles from '../../constants/styles';

const { colors, font, size } = styles;

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: size.statusbarHeight,
  },
  containerGradient: {
    flex: 1,
    padding: 10,
  },
  block: {
    flexDirection: 'row',
    flex: 1,
    margin: 4,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgb(135, 172, 243)',
  },
  avatarWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoWrapper: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textTime: {
    fontSize: 10,
    color: colors.white,
    ...font.style.regular,
    textAlign: 'left',
  },
  textName: {
    fontSize: 18,
    color: colors.white,
    ...font.style.medium,
    textAlign: 'left',
  },
  textMessage: {
    fontSize: 12,
    color: colors.white,
    ...font.style.regular,
    textAlign: 'left',
  },
  newMessagesWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newMessages: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNewMessages: {
    fontSize: 12,
    color: '#83b0e1',
    ...font.style.regular,
    textAlign: 'center',
  },
});
