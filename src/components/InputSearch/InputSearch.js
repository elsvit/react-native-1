// @flow
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import Input from '../Input/Input';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  section: {
    height: 50,
    backgroundColor: 'white',
  },
  valItem: {
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10,
  },
  valSubject: {
    color: 'rgba(0,0,0,0.5)',
  },
  searchInput: {
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1,
  },
  scrollView: {
    minHeight: 20,
  },
});

type KeyType = string | number;

type OptionType = {
  [key: string | number]: *,
};

type Props = {
  data: Array<OptionType>,
  onChangeText: (item: OptionType) => void,
  value: ?KeyType,
  placeholder?: string,
  keyName: string | number,
  labelName: string,
  maxListSize?: number,
};

type State = {
  searchTerm: string,
  pressed: boolean,
  focused: boolean,
};

const MAX_LIST_SIZE = 5;

export default class InputSearch extends Component<Props, State> {
  static defaultProps = {
    data: [],
    onChangeText: () => {},
    value: null,
    placeholder: 'Type or/and select',
    keyName: 'key',
    labelName: 'label',
    maxListSize: MAX_LIST_SIZE,
  };

  state = {
    searchTerm: '',
    pressed: false,
    focused: false,
  };

  onFocusInputField = () => {
    this.setState({
      focused: true,
    });
  };

  onBlurInputField = () => {
    this.setState({
      focused: false,
    });
  };

  searchUpdated = (searchTerm: string) => {
    this.setState({ searchTerm, pressed: false });
    this.props.onChangeText(searchTerm);
  };

  chooseField = (searchTerm: string) => {
    this.setState({ searchTerm, pressed: true });
    this.props.onChangeText(searchTerm);
  };

  renderList = (filteredData: Array<*>, keyName: string | number, labelName: string) => {
    if (
      !this.state.pressed &&
      !(filteredData.length === 1 && this.state.searchTerm === filteredData[0][labelName]) &&
      filteredData.length > 0 &&
      this.state.searchTerm &&
      this.state.focused
    ) {
      const len =
        filteredData.length < this.props.maxListSize ? filteredData.length : this.props.maxListSize;
      return (
        <View style={styles.scrollView}>
          {filteredData.splice(0, len).map((val, ind) => {
            const key = val[keyName] ? val[keyName] : ind;
            const chosenLabel = val[labelName];
            return (
              <TouchableOpacity
                onPress={() => {
                  this.chooseField(chosenLabel);
                }}
                key={key}
                style={styles.valItem}
              >
                <View>
                  <Text style={styles.valSubject}>{val[labelName]}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    }
    return null;
  };

  render() {
    const { data, keyName, labelName, onChangeText, maxListSize, ...other } = this.props;
    const filteredData = data
      .filter(
        val =>
          String(val[labelName])
            .toLowerCase()
            .substr(0, this.state.searchTerm.length)
            // .indexOf(this.state.searchTerm.toLowerCase()) !== -1,
            .includes(this.state.searchTerm.toLowerCase()),
      )
      .splice(0, maxListSize);
    return (
      <View>
        <View style={styles.section}>
          <Input
            onChangeText={this.searchUpdated}
            onFocus={() => this.onFocusInputField()}
            onBlur={() => this.onBlurInputField()}
            {...other}
          />
        </View>
        {this.renderList(filteredData, keyName, labelName)}
      </View>
    );
  }
}
