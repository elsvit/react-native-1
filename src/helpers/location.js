// @flow
import { eventChannel, END } from 'redux-saga';

const { watchPosition } = navigator.geolocation;

const WATCH_POSITION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 1000,
  distanceFilter: 10,
};

export default function locationChangeChannel() {
  return eventChannel(emit => {
    const onError = error => emit(END);
    const watchId = watchPosition(emit, onError, WATCH_POSITION_OPTIONS);
    return () => navigator.geolocation.clearWatch(watchId);
  });
}
