// @flow
import React, { Component } from 'react';
import { View, Modal, Text, FlatList, TouchableOpacity, Image } from 'react-native';

import styles from './style';

const iconCarret = require('../../assets/icon-dropdown.png');

let componentIndex = 0;

function key() {
  componentIndex += 1;
  return `modalPicker-${componentIndex}`;
}

type KeyType = string | number;

type OptionType = {
  [key: string]: *,
};

type Props = {
  data: Array<OptionType>,
  onChange: (item: OptionType) => void,
  value: ?KeyType,
  defaultText?: string,
  cancelText: string,
  disable: boolean,
  keyName: string,
  labelName: string,
  children: ?React$Node,
};

type State = {
  modalVisible: boolean,
};

export default class ModalPicker extends Component<Props, State> {
  static defaultProps = {
    data: [],
    onChange: () => {},
    value: null,
    defaultText: 'please select',
    cancelText: 'cancel',
    disable: false,
    keyName: 'key',
    labelName: 'label',
    children: null,
  };

  state = {
    modalVisible: false,
  };

  onChange = (item: OptionType) => {
    this.props.onChange(item);
    this.close();
  };

  close = () => {
    this.setState({
      modalVisible: false,
    });
  };

  open = () => {
    this.setState({
      modalVisible: true,
    });
  };

  keyExtractor = (item: OptionType) => item[this.props.keyName];

  renderOption = ({ item }: { item: OptionType }) => {
    const textStyle = [styles.optionTextStyle];
    if (item[this.props.keyName] === this.props.value) {
      textStyle.push(styles.selectedOptionTextStyle);
    }
    return (
      <TouchableOpacity key={item[this.props.keyName]} onPress={() => this.onChange(item)}>
        <View style={styles.optionStyle}>
          <Text style={textStyle}>{item[this.props.labelName]}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderChildren = () => {
    if (this.props.children) {
      return this.props.children;
    }

    const selected = this.props.data.find(opt => opt[this.props.keyName] === this.props.value);
    const label = selected ? selected[this.props.labelName] : this.props.defaultText;
    return (
      <View style={styles.selectStyle} key={label}>
        <Text style={[styles.selectTextStyle, styles.flex]}>{label}</Text>
        <Image source={iconCarret} style={styles.carret} />
      </View>
    );
  };

  render() {
    const Btn = this.props.disable ? View : TouchableOpacity;
    return (
      <View style={styles.section}>
        <Modal
          transparent
          visible={this.state.modalVisible}
          onRequestClose={this.close}
          animationType="slide"
        >
          <View style={styles.overlayStyle} key={key()}>
            <View style={styles.optionContainer}>
              <FlatList
                data={this.props.data}
                renderItem={this.renderOption}
                keyboardShouldPersistTaps="always"
                keyExtractor={this.keyExtractor}
              />
            </View>
            <View style={styles.cancelContainer}>
              <TouchableOpacity onPress={this.close}>
                <View style={styles.cancelStyle}>
                  <Text style={styles.cancelTextStyle}>{this.props.cancelText}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Btn style={styles.pickerWrapper} onPress={this.open}>
          {this.renderChildren()}
        </Btn>
      </View>
    );
  }
}
