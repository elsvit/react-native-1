// @flow
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import i18n from 'react-native-i18n';
import find from 'lodash/find';

import styles from './styles';
import Header from '../../components/Header/Header';
import Map from '../../components/Map/Map';
import { getMessages } from '../../store/modules/chats';
// import { updateLocation } from '../../store/modules/user/location';

import type { Sibling } from '../../store/modules/siblings';
import type { ChatT } from '../../store/modules/chats';
// import { LOCATION_GET_TIME_INTERVAL } from '../../constants/data';

const ICON_HOME = require('../../assets/icon-home.png');

type Props = {
  navigation: {
    navigate: (route: string) => void,
  },
  getMessages: typeof getMessages,
  // updateLocation: typeof updateLocation,
  latitude: ?number,
  longitude: ?number,
  id: number,
  avatarUrl: ?string,
  avatarThumbUrl: ?string,
  role: string,
  username: string,
  city: string,
  siblings: ?Array<Sibling>,
  chats: Array<ChatT>,
};

class Home extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: i18n.t('home.Home'),
      drawerIcon: () => <Image source={ICON_HOME} style={styles.icon} />,
    };
  };

  // eslint-disable-next-line react/sort-comp
  // getPositionInterval: ?number = null;

  componentDidMount() {
    // this.getPositionInterval = setInterval(() => {
    //   this.updateLocation();
    // }, LOCATION_GET_TIME_INTERVAL);
  }

  componentWillUnmount() {
    if (this.getPositionInterval) {
      clearInterval(this.getPositionInterval);
      this.getPositionInterval = null;
    }
  }

  getPosition = () => {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  // async updateLocation() {
  //   await this.getPosition()
  //     .then(position => {
  //       const { latitude, longitude } = position.coords;
  //       this.props.updateLocation({ latitude, longitude });
  //     })
  //     .catch(() => {});
  // }

  goToChat = id => {
    const chatObj = find(this.props.chats.data, chat => chat.user[0].id === id);
    if (chatObj && chatObj.id) {
      const chatId = chatObj.id;
      this.props.getMessages(chatId);
      this.props.navigation.navigate('Chat', { chatId });
    }
  };

  render() {
    const {
      latitude,
      longitude,
      id,
      role,
      avatarUrl,
      avatarThumbUrl,
      username,
      city,
      siblings,
    } = this.props;
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} title={i18n.t('home.title')} />
        <Text>
          longitude:{longitude}/latitude:{latitude}
        </Text>
        <Map
          user={{
            latitude,
            longitude,
            id,
            role,
            avatarUrl: avatarThumbUrl || avatarUrl,
            username,
            city,
          }}
          markers={siblings}
          connectTo={userid => {
            this.goToChat(userid);
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  latitude: state.user.location.coords.latitude,
  longitude: state.user.location.coords.longitude,
  avatarUrl: state.user.data.avatar.url,
  avatarThumbUrl: state.user.data.avatar.thumb.url,
  id: state.user.data.id,
  role: state.user.data.type,
  username: state.user.data.username,
  city: state.user.data.city,
  siblings: state.siblings,
  chats: state.chats,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMessages,
      // updateLocation,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
