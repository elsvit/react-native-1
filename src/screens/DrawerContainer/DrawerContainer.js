// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import i18n from 'react-native-i18n';
import throttle from 'lodash/throttle';

import styles from './styles';
import { logoutUser } from '../../store/modules/user/logout';
import Avatar from '../../components/Avatar/Avatar';

const ICON_LOGOUT = require('../../assets/icon-logout.png');

type PropsT = {
  navigation: {
    navigate: (route: string) => void,
  },
  logoutUser: typeof logoutUser,
  userAvatarUrl: ?string,
  userType: string,
  firstName: string,
  lastName: string,
};

class DrawerContainer extends Component<PropsT> {
  goToProfile = throttle(
    () => {
      this.props.navigation.navigate('Profile');
    },
    1000,
    { trailing: false },
  );

  render() {
    const { userAvatarUrl, userType, firstName, lastName } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <SafeAreaView style={styles.flex} forceInset={{ top: 'always', horizontal: 'never' }}>
            <TouchableOpacity onPress={this.goToProfile} style={styles.profileLink}>
              <Avatar
                type={userType}
                avatarUrl={userAvatarUrl}
                avatarRadius={38}
                circleRadius={8}
                circleAngle={315}
              />
              <Text style={styles.profileText}>
                {firstName} {lastName}
              </Text>
            </TouchableOpacity>
            <DrawerItems {...this.props} />
            <TouchableOpacity onPress={this.props.logoutUser}>
              <View style={styles.item}>
                <Image source={ICON_LOGOUT} style={styles.icon} resizeMode="contain" />
                <Text style={styles.label}>{i18n.t('logout.Logout')}</Text>
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userAvatarUrl: state.user.data.avatar.url,
  userType: state.user.data.type,
  firstName: state.user.data.first_name,
  lastName: state.user.data.last_name,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logoutUser,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer);
