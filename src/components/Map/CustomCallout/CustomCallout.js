// @flow
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import i18n from 'react-native-i18n';
import LinearGradient from 'react-native-linear-gradient';

import styles from '../../../constants/styles';

const { colors, font } = styles;

type MarkerUserT = {
  username: string,
  city: ?string,
};

type PropsT = {
  user: MarkerUserT,
};

const currentStyles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  infoBlock: {
    width: 150,
    height: 110,
    backgroundColor: colors.white,
    padding: 10,
    alignSelf: 'center',
    borderRadius: 3,
    borderWidth: 0,
  },
  username: {
    ...font.style.medium,
    fontSize: font.size.large,
    color: colors.lightBlack,
    alignSelf: 'center',
  },
  city: {
    ...font.style.medium,
    fontSize: font.size.tiny,
    color: colors.gray,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  btnGradient: {
    width: 90,
    height: 34,
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 45,
    marginTop: 10,
  },
  btn: {
    width: '100%',
  },
  btnText: {
    ...font.style.medium,
    fontSize: font.size.tiny,
    color: colors.white,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 45,
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

export default function CustomCallout(props: PropsT) {
  return (
    <View style={currentStyles.container}>
      <View style={currentStyles.infoBlock}>
        <Text style={currentStyles.username}>{props.user.username}</Text>
        <Text style={currentStyles.city}>{props.user.city}</Text>

        <LinearGradient
          colors={[colors.blue, colors.lightBlue]}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 1.0, y: 1.0 }}
          style={currentStyles.btnGradient}
        >
          <Text style={currentStyles.btnText}>{i18n.t('home.CONTACT')}</Text>
        </LinearGradient>
      </View>
      <View style={currentStyles.arrow} />
    </View>
  );
}
