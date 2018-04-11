// @flow
import { StyleSheet } from 'react-native';
import styles from '../../constants/styles';

const { colors, font } = styles;

export default StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 40,
    paddingHorizontal: 20,
  },
  profileLink: {
    marginLeft: 18,
  },
  profileText: {
    fontSize: 18,
    color: '#474747',
    ...font.style.semibold,
    marginLeft: 2,
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 16,
    width: 24,
    alignSelf: 'center',
    tintColor: '#d2d2d2',
  },
  label: {
    margin: 16,
    fontSize: 14,
    color: colors.black,
    ...font.style.medium,
  },
});
