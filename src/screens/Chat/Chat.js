// @flow
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import i18n from 'react-native-i18n';
import LinearGradient from 'react-native-linear-gradient';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import ActionCable from 'react-native-actioncable';

import styles from './styles';
import constantStyles from '../../constants/styles';
import Header from '../../components/Header/Header';
import { formatTimeToHHMM } from '../../helpers/time';
import Avatar from '../../components/Avatar/Avatar';
import { sendMessage, getMessages, addMessage } from '../../store/modules/chats';
import { CHAT_TIME_INTERVAL } from '../../constants/data';
import config from '../../constants/config';

import type { ChatT } from '../../store/modules/chats';

const ICON_SEND = require('../../assets/icon-send.png');
// const ICON_PLUS = require('../../assets/icon-plus.png');

type PropsT = {
  navigation: {
    navigate: (route: string) => void,
    state: *,
  },
  sendMessage: typeof sendMessage,
  getMessages: typeof getMessages,
  addMessage: typeof addMessage,
  chats: { data: Array<ChatT> },
  myId: number,
};

type StateT = {
  text: string,
};

const { colors } = constantStyles;

class Chat extends Component<PropsT, StateT> {
  static navigationOptions = {
    drawerLabel: () => null,
  };

  static defaultProps = {
    chats: {
      data: [],
    },
  };

  // eslint-disable-next-line react/sort-comp
  interval: ?number = null;
  keyboardDidShowListener: ?* = null;
  state = {
    text: '',
  };

  componentDidMount() {
    setTimeout(() => {
      this.flatList.scrollToEnd({ animated: false });
    }, 1000);
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);

    const { chatId } = this.props.navigation.state.params;
    const CABLE = ActionCable.createConsumer(`${config.baseURL}/cable`);
    const self = this;
    CABLE.subscriptions.create(
      { channel: 'ChatChannel', chat_id: chatId },
      {
        received(e) {
          if (self.props.myId !== e.user_id) {
            self.props.addMessage({
              chatId,
              userId: e.user_id,
              messageId: e.id,
              createdAt: e.created_at,
              content: e.content,
            });
          }
        },
      },
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.chats.data !== nextProps.chats.data) {
      setTimeout(() => {
        this.flatList.scrollToEnd();
      }, 0);
    }
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.flatList.scrollToEnd();
    }, 0);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.stopUpdateChat();
  }

  updateChat = () => {
    const { chatId } = this.props.navigation.state.params;
    this.interval = setInterval(() => {
      this.props.getMessages(chatId);
    }, CHAT_TIME_INTERVAL);
  };

  stopUpdateChat() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  keyboardDidShow = () => {
    this.flatList.scrollToEnd();
  };

  sendMessage = () => {
    const { chatId } = this.props.navigation.state.params;
    const content = this.state.text;
    if (content) {
      this.props.sendMessage({ content, chatId });
      Keyboard.dismiss();
      this.setState({
        text: '',
      });
      this.flatList.scrollToEnd();
    }
  };

  inputMessage = text => {
    this.setState({
      text,
    });
    this.flatList.scrollToEnd();
  };

  renderContact = ({ item }) => {
    let formatedTime = '';
    if (item.created_at) {
      const date = new Date(item.created_at * 1000);
      const weekDay = date.getDay();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      formatedTime = `${i18n.t('date.dayNames')[weekDay]} at ${formatTimeToHHMM(
        item.created_at,
      ).toLowerCase()} ${month}/${day}/${year}`;
    }
    if (item.user_id === this.props.myId) {
      return (
        <View key={`${item.id}-${Math.random() * 1000}`} style={styles.block}>
          <View style={styles.rightBlock}>
            <LinearGradient
              colors={[colors.blue, colors.lightBlue]}
              start={{ x: 0.0, y: 0.5 }}
              end={{ x: 1.0, y: 0.5 }}
              style={styles.myTextWrapper}
            >
              <Text style={styles.myText}>{item.content}</Text>
            </LinearGradient>
            <View style={styles.messageTimeWrapper}>
              <Text style={styles.messageTime}>{formatedTime}</Text>
            </View>
          </View>
        </View>
      );
    } else {
      const contactObj = find(this.props.chats.data, val => val.user[0].id === item.user_id);
      const contactAvatarUrl =
        contactObj.user[0].avatar.thumb && contactObj.user[0].avatar.thumb.url
          ? contactObj.user[0].avatar.thumb.url
          : contactObj.user[0].avatar.url;
      const contactType = contactObj.user[0].type;
      return (
        <View key={`${item.id}-${Math.random() * 1000}`} style={styles.block}>
          <View style={styles.leftBlock}>
            <View style={styles.avatarWrapper}>
              <Avatar
                type={contactType}
                avatarUrl={contactAvatarUrl}
                avatarRadius={22}
                circleRadius={5}
                circleAngle={315}
              />
            </View>
            <View style={styles.contactInfoWrapper}>
              <View style={styles.contactTextWrapper}>
                <Text style={styles.contactText}>{item.content}</Text>
              </View>
              <View style={styles.messageTimeWrapper}>
                <Text style={styles.messageTime}>{formatedTime}</Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
  };

  render() {
    const { chatId } = this.props.navigation.state.params;
    const contactObj = find(this.props.chats.data, { id: chatId });
    const contactFullName = contactObj
      ? `${contactObj.user[0].first_name} ${contactObj.user[0].last_name || ''}`
      : '';
    const ind = findIndex(this.props.chats.data, val => val.id === chatId);
    const data = this.props.chats.data[ind].messages
      ? [...this.props.chats.data[ind].messages]
      : [];
    const InputSection = Platform.OS === 'ios' ? KeyboardAvoidingView : View;

    return (
      <View style={[styles.container]}>
        <Header navigation={this.props.navigation} title={contactFullName} />
        <View style={styles.containerView}>
          <KeyboardAwareFlatList
            ref={ref => {
              this.flatList = ref;
            }}
            data={data}
            renderItem={this.renderContact}
            keyExtractor={item => item.id}
            snapToAlignment="end"
          />
        </View>
        <View style={styles.emptyBlock} />

        <InputSection behavior="position">
          <View style={styles.inputBlock}>
            <View style={styles.inputLeftImgWrapper}>
              {
                //<Image source={ICON_PLUS} style={styles.inputLeftImg} />
              }
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                onChangeText={text => this.inputMessage(text)}
                value={this.state.text}
                placeholder={i18n.t('chat.Type_your_message')}
              />
            </View>
            <View style={styles.inputRightImgWrapper}>
              <TouchableOpacity style={styles.inputRightImgWrapperTouch} onPress={this.sendMessage}>
                <Image source={ICON_SEND} style={styles.inputRightImg} />
              </TouchableOpacity>
            </View>
          </View>
        </InputSection>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  chats: state.chats,
  myId: state.user.data.id,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      sendMessage,
      getMessages,
      addMessage,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
