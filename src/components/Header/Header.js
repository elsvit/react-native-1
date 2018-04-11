// @flow
import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import throttle from 'lodash/throttle';

import styles from '../../constants/styles';

const { colors, font, size } = styles;
const ICON_MENU = require('../../assets/icon-menu.png');

type Props = {
  navigation: {
    goBack: () => void,
    navigate: (route: string) => void,
  },
  title: string,
};

const hStyles = StyleSheet.create({
  header: {
    paddingTop: size.statusbarHeight,
    height: size.statusbarHeight + size.appbarHeight,
    flexDirection: 'row',
    zIndex: 200,
  },
  leftIcon: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIconImg: {
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 50,
  },
  titleText: {
    textAlign: 'center',
    ...font.style.medium,
    color: colors.white,
    fontSize: font.size.normal,
  },
});

export default function Header({ navigation, title = '' }: Props) {
  const onPress = throttle(
    () => {
      Keyboard.dismiss();
      navigation.navigate('DrawerToggle');
    },
    1000,
    { trailing: false },
  );

  return (
    <View>
      <LinearGradient
        colors={[colors.blue, colors.lightBlue]}
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 1.0, y: 0.5 }}
        style={hStyles.header}
      >
        <TouchableOpacity style={hStyles.leftIcon} onPress={onPress}>
          <Image style={hStyles.leftIconImg} source={ICON_MENU} />
        </TouchableOpacity>
        <View style={hStyles.title}>
          <Text style={hStyles.titleText}>{title}</Text>
        </View>
      </LinearGradient>
    </View>
  );
}
