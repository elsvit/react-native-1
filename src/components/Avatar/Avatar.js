// @flow
import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import constantStyles from '../../constants/styles';
import { USERTYPES } from '../../constants/data';
import config from '../../constants/config';

const IMG_DONOR = require('../../assets/donor.png');
const IMG_PARENT = require('../../assets/parent.png');
const IMG_CHILD = require('../../assets/child.png');

/*
  circleAngle: gradus
*/
type PropsT = {
  type: string,
  avatarUrl: ?string,
  avatarRadius: number,
  onPress?: () => {},
  circleRadius?: number,
  circleAngle?: number,
  circleContent?: React$Node,
};

const { colors } = constantStyles;

export default class Avatar extends Component<PropsT> {
  static defaultProps = {
    circleAngle: 45,
    circleComponent: null,
  };

  renderAvatarImage = (type: string, avatarUrl: ?string, avatarRadius: number) => {
    const styleRadius = {
      width: avatarRadius * 2,
      height: avatarRadius * 2,
      borderRadius: avatarRadius,
      borderWidth: Math.ceil(avatarRadius * 0.05),
    };
    if (avatarUrl) {
      return (
        <Image
          source={{ uri: avatarUrl }}
          style={[styles.avatarImg, styleRadius]}
          resizeMode="cover"
        />
      );
    }
    switch (type) {
      case USERTYPES.child.key: {
        return (
          <Image source={IMG_CHILD} style={[styles.avatarImg, styleRadius]} resizeMode="cover" />
        );
      }
      case USERTYPES.parent.key: {
        return (
          <Image source={IMG_PARENT} style={[styles.avatarImg, styleRadius]} resizeMode="cover" />
        );
      }
      case USERTYPES.donor.key:
      default: {
        return (
          <Image source={IMG_DONOR} style={[styles.avatarImg, styleRadius]} resizeMode="cover" />
        );
      }
    }
  };

  render() {
    const {
      type,
      avatarUrl,
      avatarRadius,
      onPress,
      circleRadius,
      circleAngle,
      circleContent,
    } = this.props;
    let url = null;
    if (avatarUrl) {
      if (avatarUrl.substr(0, 1) === '/') {
        url = `${config.baseURL}${avatarUrl}`;
      } else {
        url = avatarUrl;
      }
    }
    let color1;
    let color2;
    switch (type) {
      case USERTYPES.child.key: {
        color1 = colors.child1;
        color2 = colors.child2;
        break;
      }
      case USERTYPES.parent.key: {
        color1 = colors.parent1;
        color2 = colors.parent2;
        break;
      }
      case USERTYPES.donor.key:
      default: {
        color1 = colors.donor1;
        color2 = colors.donor2;
      }
    }
    const styleAvatarRadius = {
      width: avatarRadius * 2,
      height: avatarRadius * 2,
      borderRadius: avatarRadius,
    };
    let styleCircleRadius;
    let styleCirclePosition;
    if (circleRadius) {
      const oneGr = Math.PI / 180;
      styleCircleRadius = {
        width: circleRadius * 2,
        height: circleRadius * 2,
        borderRadius: circleRadius,
      };
      const top =
        +avatarRadius -
        Math.round(Math.cos(+circleAngle * oneGr) * avatarRadius / 1.05) -
        circleRadius;
      const left =
        +avatarRadius +
        Math.round(Math.sin(+circleAngle * oneGr) * avatarRadius / 1.05) -
        circleRadius;
      styleCirclePosition = {
        top,
        left,
      };
    }
    const AvatarView = onPress ? TouchableOpacity : View;
    return (
      <View>
        <LinearGradient
          colors={[color1, color2]}
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 1.0, y: 0.0 }}
          style={[styles.circleImgView, styleAvatarRadius]}
        >
          <AvatarView style={{ flex: 1 }} onPress={onPress}>
            {this.renderAvatarImage(type, url, avatarRadius)}
          </AvatarView>
        </LinearGradient>
        {circleRadius ? (
          <LinearGradient
            colors={[color1, color2]}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 1.0, y: 0.0 }}
            style={[styles.roleSmallCircleWrapper, styleCircleRadius, styleCirclePosition]}
          >
            <View
              style={[
                styles.roleSmallCircle,
                styleCircleRadius,
                { borderWidth: 1 + Math.ceil(circleRadius * 0.15) },
              ]}
            >
              {circleContent}
            </View>
          </LinearGradient>
        ) : null}
      </View>
    );
  }
}
