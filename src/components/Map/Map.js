// @flow
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import maxBy from 'lodash/maxBy';
import minBy from 'lodash/minBy';

import styles from './styles';
// import config from '../../constants/config';
import { DELTA, DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '../../constants/data';
import CustomMarkerPin from './CustomMarkerPin/CustomMarkerPin';
import CustomCallout from './CustomCallout/CustomCallout';

import type { Sibling } from '../../store/modules/siblings';

type MarkerUserT = {
  latitude: number | string,
  longitude: number | string,
  id: number,
  role: string,
  avatarUrl: ?string,
  username: string,
  city: string,
};

type PropsT = {
  user: MarkerUserT,
  delta?: number,
  markers: ?Array<Sibling>,
  connectTo: () => {},
};

export default class Map extends Component<PropsT> {
  render() {
    const { user, markers, delta, connectTo } = this.props;
    let initialLatitude = user.latitude ? +user.latitude : DEFAULT_LATITUDE;
    let initialLongitude = user.longitude ? +user.longitude : DEFAULT_LONGITUDE;
    let latitudeDelta = delta;
    let longitudeDelta = delta;
    const checkMarker = markers && markers.length > 0;
    if (checkMarker) {
      const arr = markers ? [user].concat(markers) : [user];
      const minLatitude = +minBy(arr, o => +o.latitude).latitude;
      const minLongitude = +minBy(arr, o => +o.longitude).longitude;
      const maxLatitude = +maxBy(arr, o => +o.latitude).latitude;
      const maxLongitude = +maxBy(arr, o => +o.longitude).longitude;
      latitudeDelta = Math.abs(maxLatitude - minLatitude);
      longitudeDelta = Math.abs(maxLongitude - minLongitude);
      initialLatitude = minLatitude + latitudeDelta / 2;
      initialLongitude = minLongitude + longitudeDelta / 2;
      latitudeDelta += 0.06;
      longitudeDelta += 0.04;
    }
    return (
      <View style={styles.block}>
        <MapView
          region={{
            latitude: initialLatitude,
            longitude: initialLongitude,
            latitudeDelta,
            longitudeDelta,
          }}
          style={StyleSheet.absoluteFill}
        >
          <Marker
            coordinate={{
              latitude: initialLatitude,
              longitude: initialLongitude,
            }}
            key="user"
            title="You"
            onCalloutPress={() => {}}
          >
            <CustomMarkerPin
              user={{
                role: user.role,
                avatarUrl: user.avatarUrl,
                username: user.username,
                id: user.id,
                circle: true,
              }}
            />
          </Marker>
          <Circle
            center={{
              latitude: initialLatitude,
              longitude: initialLongitude,
            }}
            radius={10}
            fillColor="#6d8bfb"
            strokeColor="#6d8bfb"
          />
          <Circle
            center={{
              latitude: initialLatitude,
              longitude: initialLongitude,
            }}
            radius={20}
            fillColor="rgba(100, 120, 220, 0.08)"
            strokeColor="rgba(100, 120, 220, 0.08)"
          />

          {checkMarker
            ? markers.map(marker => {
                const latitude = +marker.latitude + 0.0001;
                const longitude = +marker.longitude + 0.0001;
                const markerAvatarUrl = marker.avatar.thumb.url ? marker.avatar.thumb.url : null;
                return (
                  <Marker
                    coordinate={{
                      latitude,
                      longitude,
                    }}
                    key={marker.id}
                    onCalloutPress={() => {
                      connectTo(marker.id);
                    }}
                  >
                    <CustomMarkerPin
                      user={{
                        role: marker.type,
                        avatarUrl: markerAvatarUrl,
                        username: marker.username,
                        id: marker.id,
                      }}
                    />
                    <MapView.Callout tooltip style={styles.callout}>
                      <CustomCallout
                        user={{
                          username: marker.username,
                          city: marker.city,
                        }}
                      />
                    </MapView.Callout>
                  </Marker>
                );
              })
            : null}
        </MapView>
      </View>
    );
  }
}

Map.defaultProps = {
  delta: DELTA,
};
