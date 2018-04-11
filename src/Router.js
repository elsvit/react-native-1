// @flow
import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import {
  StackNavigator,
  DrawerNavigator,
  addNavigationHelpers,
  NavigationActions,
} from 'react-navigation';

import AppTour from './screens/AppTour/AppTour';
import LogIn from './screens/LogIn/LogIn';
import SignUpSelectRole from './screens/SignUpSelectRole/SignUpSelectRole';
import SignUp from './screens/SignUp/SignUp';
import ForgotPassword from './screens/ForgotPassword/ForgotPassword';
import ConfirmationCode from './screens/ConfirmationCode/ConfirmationCode';
import NewPassword from './screens/NewPassword/NewPassword';
import ChangePassword from './screens/ChangePassword/ChangePassword';
import TermsAndConditions from './screens/TermsAndConditions/TermsAndConditions';
import PrivacyPolicy from './screens/PrivacyPolicy/PrivacyPolicy';
import Profile from './screens/Profile/Profile';
import Home from './screens/Home/Home';
import About from './screens/About/About';
import Messages from './screens/Messages/Messages';
import Settings from './screens/Settings/Settings';
import FAQs from './screens/FAQs/FAQs';
import DrawerContainer from './screens/DrawerContainer/DrawerContainer';
import Chat from './screens/Chat/Chat';

export const initialRouteName = 'LogIn';

const ScreensRouter = StackNavigator(
  {
    AppTour: { screen: AppTour },
    LogIn: { screen: LogIn },
    SignUpSelectRole: { screen: SignUpSelectRole },
    SignUp: { screen: SignUp },
    ForgotPassword: { screen: ForgotPassword },
    ConfirmationCode: { screen: ConfirmationCode },
    NewPassword: { screen: NewPassword },
    ChangePassword: { screen: ChangePassword },
    TermsAndConditions: { screen: TermsAndConditions },
    PrivacyPolicy: { screen: PrivacyPolicy },
    Drawers: {
      screen: DrawerNavigator(
        {
          Profile: { screen: Profile, drawerLabel: null },
          Home: { screen: Home },
          About: { screen: About },
          Messages: { screen: Messages },
          FAQs: { screen: FAQs },
          Settings: { screen: Settings },
          Chat: { screen: Chat },
        },
        {
          initialRouteName: 'Home',
          contentComponent: DrawerContainer,
        },
      ),
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName,
  },
);

export const Router = StackNavigator(
  {
    Screens: { screen: ScreensRouter },
  },
  {
    initialRouteName: 'Screens',
    mode: 'modal',
    headerMode: 'none',
    cardStyle: {
      backgroundColor: 'transparent',
      opacity: 1,
    },
  },
);

export function getRouterPath(state: Object): string {
  return Router.router.getPathAndParamsForState(state).path;
}

type Props = {
  dispatch: Function,
  navigation: Object,
};

class Navigator extends Component<Props> {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, navigation } = this.props;
    if (navigation.index === 0 && navigation.routes[0].index === 0) {
      return false;
    }

    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    return (
      <Router
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.navigation,
        })}
      />
    );
  }
}

export default connect(({ navigation }) => ({ navigation }))(Navigator);
