// @flow
import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import get from 'lodash/get';

import styles from '../../constants/styles';

const { colors, font, size } = styles;
const ICON_BACK = require('../../assets/icon-back.png');

type Props = {
  navigation: {
    goBack: () => void,
    navigate: (route: string) => void,
  },
  title: string,
  leftIcon: boolean,
  rightLink: boolean,
  rightLinkText: string,
  onPressRightLink: Function,
  // headerStyle: { [key: string]: * },
};

const hStyles = StyleSheet.create({
  header: {
    paddingTop: size.statusbarHeight,
    height: size.statusbarHeight + size.appbarHeight,
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  leftLink: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIconImg: {
    width: 10,
    height: 18,
    resizeMode: 'contain',
    tintColor: colors.gray,
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 50,
  },
  titleText: {
    textAlign: 'center',
    ...font.style.medium,
    color: colors.darkGray,
    fontSize: font.size.normal,
  },
  rightLink: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  rightLinkText: {
    fontSize: font.size.normal,
    color: colors.gray,
    marginRight: 20,
  },
  rightIconImg: {
    width: 10,
    height: 18,
    resizeMode: 'contain',
    tintColor: colors.gray,
    transform: [{ rotate: '180deg' }],
    marginRight: 20,
  },
});

export default function HeaderWithArrows({
  navigation,
  title = '',
  leftIcon = true,
  rightLink = false,
  rightLinkText = '',
  onPressRightLink = () => {},
  ...other
}: Props) {
  return (
    <View style={[hStyles.header, other.headerStyle]}>
      {leftIcon ? (
        <TouchableOpacity
          style={hStyles.leftLink}
          onPress={() => navigation.goBack(get(navigation, 'state.params.backKey', null))}
        >
          <Image style={hStyles.leftIconImg} source={ICON_BACK} />
        </TouchableOpacity>
      ) : null}
      <View style={hStyles.title}>
        <Text style={hStyles.titleText}>{title}</Text>
      </View>
      {rightLink ? (
        <TouchableOpacity style={hStyles.rightLink} onPress={onPressRightLink}>
          <Text style={hStyles.rightLinkText}>{rightLinkText}</Text>
          <Image style={hStyles.rightIconImg} source={ICON_BACK} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
