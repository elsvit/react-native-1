// @flow
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import i18n from 'react-native-i18n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withFormik } from 'formik';
import yup from 'yup';
import compose from 'lodash/fp/compose';
import get from 'lodash/get';
import LinearGradient from 'react-native-linear-gradient';

import Input from '../../components/Input/Input';
import { loginUser } from '../../store/modules/user/login';
import notify from '../../helpers/notify';

import styles, { colorGray, colorBlue, colorMediumBlue } from './styles';

import type { LoginError } from '../../store/modules/user/login';

type Dict = { [key: string]: * };

type Props = {
  navigation: {
    navigate: (route: string) => void,
  },
  setFieldValue: (name: string, value: *) => void,
  setFieldTouched: (name: string, value: *) => void,
  handleSubmit: (event: Event<>) => void,
  values: Dict,
  errors: Dict,
  touched: Dict,
  loginError: LoginError,
};

class LogIn extends Component<Props> {
  static navigationOptions = ({ navigation }) => ({ header: null });

  static schema = yup.object().shape({
    email: yup
      .string()
      .email('logIn.invalidEmail')
      .required('logIn.emptyEmail'),

    password: yup.string().required('logIn.emptyPassword'),
  });

  setEmail = email => {
    this.props.setFieldValue('email', email);
    this.props.setFieldTouched('email', true);
  };

  setPassword = password => {
    this.props.setFieldValue('password', password);
    this.props.setFieldTouched('password', true);
  };

  forgotPass = () => {
    Keyboard.dismiss();
    this.props.navigation.navigate('ForgotPassword');
  };

  signUp = () => {
    Keyboard.dismiss();
    this.props.navigation.navigate('SignUpSelectRole');
  };

  render() {
    const { values, errors, touched, loginError } = this.props;
    return (
      <KeyboardAwareScrollView style={styles.screen} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.logInForm}>
            <View style={styles.titleBlock}>
              <Text style={styles.titleText}>{i18n.t('logIn.title')}</Text>
            </View>
            <View style={styles.section}>
              <Input
                keyboardType="email-address"
                value={values.email}
                placeholder={i18n.t('logIn.Email')}
                placeholderTextColor={colorGray}
                onChangeText={this.setEmail}
                style={styles.inputField}
              />
              {touched.email && errors.email ? (
                <Text style={styles.errorMessage}>{i18n.t(errors.email)}</Text>
              ) : null}
            </View>
            <View style={styles.section}>
              <Input
                secureTextEntry
                value={values.password}
                onChangeText={this.setPassword}
                placeholder={i18n.t('logIn.Password')}
                placeholderTextColor={colorGray}
                style={styles.inputField}
              />
              {touched.password && errors.password ? (
                <Text style={styles.errorMessage}>{i18n.t(errors.password)}</Text>
              ) : null}
            </View>
            <View style={styles.section2}>
              <TouchableOpacity onPress={this.forgotPass}>
                <Text style={styles.forgotText}>{i18n.t('logIn.Forgot_password')}?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.section}>
              <TouchableOpacity style={styles.submitBtn} onPress={this.props.handleSubmit}>
                <LinearGradient
                  colors={[colorBlue, colorMediumBlue]}
                  start={{ x: 0.0, y: 0.0 }}
                  end={{ x: 1.0, y: 1.0 }}
                  style={styles.submitBtnGradient}
                >
                  <Text style={styles.submitText}>{i18n.t('logIn.LOG_IN')}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            {loginError ? <Text style={styles.errorMessage}>{loginError.message}</Text> : null}
          </View>
          <View style={styles.bottomSection}>
            <Text style={styles.signUpText}>{i18n.t('logIn.Not_registered')}? </Text>
            <TouchableOpacity onPress={this.signUp}>
              <Text style={[styles.signUpText, styles.underlineText]}>
                {i18n.t('logIn.Sign_up')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default compose(
  connect(
    ({ user }) => ({
      loginError: user.login.error,
    }),
    dispatch => bindActionCreators({ loginUser }, dispatch),
  ),
  withFormik({
    mapPropsToValues() {
      return {
        email: 'yurii.butenko@applikey.biz',
        password: 'Q',
      };
    },
    validationSchema: LogIn.schema,
    validateOnChange: true,
    async handleSubmit(values, { props }) {
      try {
        await props.loginUser({
          user: { ...values },
        });
      } catch (err) {
        if (get(err, 'response.status') === 422) {
          const error = get(err, 'response.data', null);
          notify(error);
        }
      }
    },
  }),
)(LogIn);
