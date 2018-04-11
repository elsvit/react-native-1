// @flow
import React, { Component } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import i18n from 'react-native-i18n';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import constantStyles from '../../constants/styles';
import Header from '../../components/Header/Header';
import { formatTimeToHHMM } from '../../helpers/time';
import { getMessages } from '../../store/modules/chats';

import Avatar from '../../components/Avatar/Avatar';

import type { ChatT } from '../../store/modules/chats';

const ICON_MESSAGES = require('../../assets/icon-messages.png');

type PropsT = {
  navigation: {
    navigate: (route: string) => void,
  },
  getMessages: typeof getMessages,
  chats: Array<ChatT>,
};

type StateT = {
  chats: Array<ChatT>,
};

const { colors } = constantStyles;

class Messages extends Component<PropsT, StateT> {
  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: i18n.t('messages.Messages'),
      drawerIcon: () => <Image source={ICON_MESSAGES} style={styles.icon} />,
    };
  };

  static defaultProps = {
    chats: [],
  };

  state = {
    chats: this.props.chats || [],
  };

  goToChat = chatId => {
    this.props.getMessages(chatId);
    this.props.navigation.navigate('Chat', { chatId });
  };

  renderContact = ({ item }) => {
    const formatedTime =
      item.last_message && item.last_message.created_at
        ? formatTimeToHHMM(item.last_message.created_at)
        : '';
    const lastMessage =
      item.last_message && item.last_message.content ? item.last_message.content : '';
    const avatarUrl = item.user[0].avatar.thumb.url
      ? item.user[0].avatar.thumb.url
      : item.user[0].avatar.url;
    return (
      <TouchableOpacity key={item.id} style={styles.block} onPress={() => this.goToChat(item.id)}>
        <View style={styles.avatarWrapper}>
          <Avatar
            type={item.user[0].type}
            avatarUrl={avatarUrl}
            avatarRadius={28}
            circleRadius={6}
            circleAngle={315}
          />
        </View>
        <View style={styles.infoWrapper}>
          <Text style={styles.textTime}>{formatedTime}</Text>
          <Text style={styles.textName}>
            {`${item.user[0].first_name} ${item.user[0].last_name || ''}`}
          </Text>
          <Text style={styles.textMessage}>{lastMessage}</Text>
        </View>
        {item.count_not_read ? (
          <View style={styles.newMessagesWrapper}>
            <View style={styles.newMessages}>
              <Text style={styles.textNewMessages}>{item.count_not_read}</Text>
            </View>
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} title={i18n.t('messages.title')} />
        <LinearGradient
          colors={[colors.blue, colors.lightBlue]}
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 1.0, y: 0.5 }}
          style={styles.containerGradient}
        >
          <FlatList
            data={this.state.chats}
            renderItem={this.renderContact}
            keyExtractor={item => item.id}
          />
        </LinearGradient>
      </View>
    );
  }
}

const mapStateToProps = ({ chats }) => ({
  chats: chats.data,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMessages,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
