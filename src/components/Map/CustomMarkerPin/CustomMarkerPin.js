// @flow
import React, { Component } from 'react';
import { View } from 'react-native';

import styles from './styles';
import Avatar from '../../../components/Avatar/Avatar';

type MarkerUser = {
  role: string,
  avatarUrl: ?string,
  username: string,
  id: string | number,
  circle: ?boolean,
};

type PropsT = {
  user: MarkerUser,
};

export default class CustomMarkerPin extends Component<PropsT> {
  render() {
    const { role, avatarUrl, circle = false } = this.props.user;
    return (
      <View style={styles.block}>
        <View style={styles.markerView}>
          <Avatar
            type={role}
            avatarUrl={avatarUrl}
            avatarRadius={28}
            circleRadius={6}
            circleAngle={315}
          />
        </View>

        {circle ? (
          <View style={styles.userPlaceSmallCircleWrapper}>
            <View style={styles.userPlaceSmallCircle} />
          </View>
        ) : null}
        <View style={styles.arrow} />
      </View>
    );
  }
}
