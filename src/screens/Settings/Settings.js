// @flow
import React, { Component } from 'react';
import { View, Text, Image, Switch, TouchableOpacity, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import i18n from 'react-native-i18n';
import throttle from 'lodash/throttle';

import styles from './styles';
import Header from '../../components/Header/Header';
import { logoutUser } from '../../store/modules/user/logout';
import { saveLocationDuration } from '../../store/modules/user/location';
import { updateUserSettings } from '../../store/modules/user/settings';
import {
  LOCATION_DURATION_ALL_TIME,
  LOCATION_DURATION_OPTION_TIME,
  LOCATION_DURATION_FIELD,
} from '../../constants/data';

const ICON_SETTINGS = require('../../assets/icon-settings.png');
const ICON_BACK = require('../../assets/icon-back.png');

type PropsT = {
  navigation: {
    navigate: (route: string) => void,
  },
  logoutUser: typeof logoutUser,
  saveLocationDuration: typeof saveLocationDuration,
  locationDuration: number,
  pushNotification: boolean,
  showSiblings: boolean,
  showLocation: boolean,
  updateUserSettings: typeof updateUserSettings,
};

type StateT = {
  pushNotification: boolean,
  showSiblings: boolean,
  showLocationDuration: boolean,
};

class Settings extends Component<PropsT, StateT> {
  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: i18n.t('settings.Settings'),
      drawerIcon: () => <Image source={ICON_SETTINGS} style={styles.icon} />,
    };
  };

  static defaultProps = {
    pushNotification: true,
    showSiblings: true,
  };

  state = {
    pushNotification: this.props.pushNotification,
    showSiblings: this.props.showSiblings,
    showLocationDuration: true,
  };

  setShowSiblings = e => {
    this.props.updateUserSettings({
      show_siblings: !this.state.showSiblings,
      push_notification: this.state.pushNotification,
      show_location: this.props.showLocation,
    });
    this.setState({
      showSiblings: !this.state.showSiblings,
    });
  };

  setPushNotification = () => {
    this.props.updateUserSettings({
      push_notification: !this.state.pushNotification,
      show_siblings: this.state.showSiblings,
      show_location: this.props.showLocation,
    });
    this.setState({
      pushNotification: !this.state.pushNotification,
    });
  };

  goToChangePassword = throttle(
    () => {
      Keyboard.dismiss();
      this.props.navigation.navigate('ChangePassword');
    },
    1000,
    { trailing: false },
  );

  toggleShowLocationDuration = throttle(
    () => {
      this.setState({
        showLocationDuration: !this.state.showLocationDuration,
      });
    },
    1000,
    { trailing: false },
  );

  logoutUser = throttle(
    () => {
      this.props.logoutUser();
    },
    1000,
    { trailing: false },
  );

  changeLocationDuration = (value: number) => {
    const locationDuration = +this.props.locationDuration;
    this.toggleShowLocationDuration();
    if (locationDuration !== null && locationDuration !== undefined && locationDuration !== value) {
      this.props.saveLocationDuration(LOCATION_DURATION_FIELD, value);
    }
  };

  render() {
    const { showLocationDuration, showSiblings } = this.state;
    const locationDuration = +this.props.locationDuration;
    let crntLocationDurationTxt = i18n.t('settings.All_time');
    const optionLocationDurationTxt = `${LOCATION_DURATION_OPTION_TIME} ${i18n.t(
      'settings.hours',
    )}`;
    if (locationDuration && locationDuration < +LOCATION_DURATION_ALL_TIME) {
      crntLocationDurationTxt = `${LOCATION_DURATION_OPTION_TIME} ${i18n.t('settings.hours')}`;
    }
    let locationDurationTitle = i18n.t('settings.Location');
    let locationDurationArrowImgStyle = 'upIconImg';
    if (showLocationDuration) {
      locationDurationTitle = crntLocationDurationTxt;
      locationDurationArrowImgStyle = 'downIconImg';
    }
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <Header navigation={this.props.navigation} title={i18n.t('settings.title')} />

        <View style={styles.block}>
          <View style={styles.subblockLeft}>
            <Text style={[styles.text]}>{i18n.t('settings.Change_password')}</Text>
          </View>
          <TouchableOpacity onPress={this.goToChangePassword} style={styles.subblockRight}>
            <Image source={ICON_BACK} style={styles.rightIconImg} />
          </TouchableOpacity>
        </View>

        <View style={styles.block}>
          <View style={styles.subblockLeft}>
            <Text style={[styles.text]}>{i18n.t('settings.Push notification')}</Text>
          </View>
          <View style={styles.subblockRight}>
            <Switch
              value={this.state.pushNotification}
              onValueChange={e => this.setPushNotification(e)}
            />
          </View>
        </View>

        <View style={styles.block}>
          <View style={styles.subblockLeft}>
            <Text style={[styles.text]}>{i18n.t('settings.Tracking_for_siblings')}</Text>
          </View>
          <View style={styles.subblockRight}>
            <Switch value={showSiblings} onValueChange={e => this.setShowSiblings(e)} />
          </View>
        </View>

        <View style={styles.block}>
          <TouchableOpacity style={styles.subblockLeft} onPress={this.toggleShowLocationDuration}>
            <Text style={[styles.text]}>{locationDurationTitle}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.toggleShowLocationDuration} style={styles.subblockRight}>
            <Image source={ICON_BACK} style={styles[locationDurationArrowImgStyle]} />
          </TouchableOpacity>
        </View>

        {showLocationDuration ? null : (
          <View style={styles.block}>
            <TouchableOpacity
              style={styles.subblockLeft}
              onPress={() => this.changeLocationDuration(LOCATION_DURATION_OPTION_TIME)}
            >
              <Text style={[styles.text]}>{optionLocationDurationTxt}</Text>
            </TouchableOpacity>
          </View>
        )}

        {showLocationDuration ? null : (
          <View style={styles.block}>
            <TouchableOpacity
              style={styles.subblockLeft}
              onPress={() => this.changeLocationDuration(LOCATION_DURATION_ALL_TIME)}
            >
              <Text style={[styles.text]}>{`${i18n.t('settings.All_time')}`}</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={[styles.block, styles.blockGap]}>
          <TouchableOpacity onPress={this.logoutUser} style={styles.subblockLeft}>
            <Text style={[styles.text]}>{i18n.t('settings.Logout')}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => ({
  locationDuration: state.user.location.duration,
  pushNotification: state.user.push_notification,
  showSiblings: state.user.show_siblings,
  showLocation: state.user.show_location,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logoutUser,
      saveLocationDuration,
      updateUserSettings,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
