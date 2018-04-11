// @flow
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import i18n from 'react-native-i18n';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import { withFormik } from 'formik';
import yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import get from 'lodash/get';
import throttle from 'lodash/throttle';
import find from 'lodash/find';
import compose from 'lodash/fp/compose';
import memoize from 'lodash/memoize';

import styles, { colorBlue, colorLightBlue } from './styles';
import Avatar from '../../components/Avatar/Avatar';
import Header from '../../components/Header/Header';
import { updateUser } from '../../store/modules/user/update';
import { loadCryoCenters } from '../../store/modules/cryoCenters';
import notify from '../../helpers/notify';
import ModalPicker from '../../components/Picker/Picker';
import { colorMediumBlue } from '../SignUp/styles';
import { USERTYPES } from '../../constants/data';

import type { User } from '../../store/modules/user/data';
import type { CryoCenterT } from '../../api/modules/cryoCenters';

const ICON_PEN = require('../../assets/icon-pen.png');
const ICON_BLUE_PLUS = require('../../assets/blue_plus.png');

type Dict = { [key: string]: * };

type PropsT = {
  navigation: {
    navigate: (route: string) => void,
  },
  updateUser: typeof updateUser,
  user: User,
  updateLoading: boolean,
  updateError: *,
  setFieldValue: (name: string, value: *) => void,
  setFieldTouched: (name: string, value: *) => void,
  setValues: (*) => void,
  handleSubmit: (event: Event<>) => void,
  values: {
    address: ?string,
    age: ?number,
    donor_infos_attributes: ?Array<{
      donor_id: string,
      cryo_center_id: ?number,
    }>,
  },
  errors: Dict,
  touched: Dict,
  cryoCentersData: Array<CryoCenterT>,
  cryoCentersLoading: boolean,
  cryoCentersError: *,
  loadCryoCenters: typeof loadCryoCenters,
};

type StateT = {
  newUserAvatarData: *,
  // newUserData: ?{
  //   email: string,
  //   address: ?string,
  //   age: ?number,
  //   donor_infos_attributes: ?Array<{
  //     donor_id: string,
  //     cryo_center_id: ?number | string,
  //   }>,
  // },
  submitNewData: boolean,
  user: User,
};

class Profile extends Component<PropsT, StateT> {
  static navigationOptions = {
    drawerLabel: () => null,
  };

  static schema = yup.object().shape({
    address: yup
      .string()
      .nullable()
      .notRequired(),
    age: yup
      .number()
      .nullable()
      .notRequired(),
    donor_infos_attributes: yup
      .array()
      .nullable()
      .notRequired()
      .of(
        yup.object().shape({
          donor_id: yup.string().required('profile.emptyDonorID'),
          cryo_center_id: yup.string().required('profile.emptyCryoCenterID'),
        }),
      ),
  });

  state = {
    newUserAvatarData: null,
    // newUserData: null,
    submitNewData: false,
    user: this.props.user,
  };

  componentDidMount() {
    const { cryoCentersData, cryoCentersLoading, cryoCentersError, user } = this.props;
    if (
      user &&
      user.type === USERTYPES.donor.key &&
      !cryoCentersLoading &&
      (!cryoCentersData.length || (cryoCentersError && cryoCentersData.length))
    ) {
      this.props.loadCryoCenters();
    }
  }

  componentWillReceiveProps(nextProps: PropsT) {
    if (
      this.props.updateLoading &&
      !nextProps.updateLoading &&
      !nextProps.updateError &&
      nextProps.user
    ) {
      const { user } = nextProps;
      let values = {
        email: user.email,
        address: user.address || '',
        age: `${user.age}` || '',
      };
      if (user.type === USERTYPES.donor.key) {
        values = { ...values, donor_infos_attributes: [] };
      }
      this.props.setValues(values);
      this.setState({
        user,
        submitNewData: false,
        newUserAvatarData: null,
      });
    }
  }

  getCryoCenters = () => {
    const cryoCenters = this.props.cryoCentersData.map(val => {
      return { cryo_center_id: val.id, value: `${val.name}` };
    });
    return cryoCenters;
  };

  addAvatar = throttle(
    () => {
      const self = this;
      ImagePicker.showImagePicker(response => {
        if (response.didCancel) {
        } else if (response.error) {
          notify(response.error);
        } else if (response.customButton) {
        } else {
          const name = response.fileName || 'avatar.jpg';
          if (response.uri) {
            const newAvatar = {
              uri: response.uri,
              name,
              type: 'multipart/form-data',
            };
            self.props.setFieldValue('avatar', newAvatar);
            self.setState({
              submitNewData: true,
            });
          }
        }
      });
    },
    1000,
    { trailing: false },
  );

  saveNewAvatar = throttle(
    () => {
      if (this.state.newUserAvatarData) {
        const user = {
          email: this.props.user.email,
          avatar: this.state.newUserAvatarData,
        };
        this.props.updateUser(user);
      } else {
        notify(i18n.t('profile.Select_New_Avatar'));
      }
    },
    1000,
    { trailing: false },
  );

  saveNewData = throttle(
    e => {
      if (this.state.submitNewData) {
        this.props.handleSubmit(e);
        Keyboard.dismiss();
      } else {
        notify('Input Correct Data');
      }
    },
    1000,
    { trailing: false },
  );

  // add additioal donorIds and CryoCenters in donor_infos_attributes
  addCryoBlock = () => {
    const newState = { ...this.state };
    newState.submitNewData = true;
    this.setState(newState);
    let newValues = {
      ...this.props.values,
    };
    const block = {
      donor_id: '',
      cryo_center_id: null,
    };
    if (!newValues.donor_infos_attributes) {
      newValues = {
        ...newValues,
        donor_infos_attributes: [{ ...block }],
      };
    } else {
      newValues.donor_infos_attributes.push(block);
    }
    this.props.setValues(newValues);
  };

  checkDonorID = val => /^([A-Z0-9]+)$/.test(val) || val === '';

  updateField = memoize((field: string, path: ?string = '', func: ?Function) => {
    return value => {
      this.setState({
        submitNewData: true,
      });
      const check = func ? func(value) : true;
      if (check) {
        const val = path ? value[path] : value;
        this.props.setFieldValue(field, val);
        this.props.setFieldTouched(field, true);
      }
    };
  });

  avatarPen = (
    <TouchableOpacity onPress={() => this.addAvatar()}>
      <Image
        source={ICON_PEN}
        style={{
          width: 12,
          height: 12,
          alignSelf: 'center',
        }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  updateDropdownField = memoize((field: string, key: string, path: string = '') => {
    return value => {
      const val = path ? value[path] : value;
      this.props.setFieldValue(field, val[key]);
      this.props.setFieldTouched(field, true);
    };
  });

  renderUserPropSection = (property, data) => (
    <View style={styles.block}>
      <View style={styles.subblockLeft}>
        <Text style={[styles.textLeft]}>{property}</Text>
      </View>
      <View style={styles.subblockRight}>
        <Text style={[styles.textRight]}>{data}</Text>
      </View>
    </View>
  );

  renderInput(props) {
    const { field, property, placeholder = 'Type Your data', keyboardType = 'default' } = props;
    const { values, errors, touched } = this.props;
    const val = values[field];
    return (
      <View style={styles.block}>
        <View style={styles.subblockLeft}>
          <Text style={[styles.textLeft]}>{property}</Text>
        </View>
        <View style={styles.subblockRight}>
          <TextInput
            style={styles.textRight}
            onChangeText={this.updateField(field)}
            value={val}
            placeholder={placeholder}
            keyboardType={keyboardType}
            underlineColorAndroid="white"
          />
        </View>
        {touched[field] && errors[field] ? (
          <Text style={styles.errorMessage}>{i18n.t(errors[field])}</Text>
        ) : null}
      </View>
    );
  }

  renderCryoCenterSection = attributes => {
    const { values, errors, touched } = this.props;
    return (
      <View>
        {attributes &&
          attributes.map((val, ind) => {
            const donorIdField = `donor_infos_attributes[${ind}].donor_id`;
            const cryoCenterField = `donor_infos_attributes[${ind}].cryo_center_id`;
            const key = `cryo_block${ind}`;
            const selectedCryoCenter = get(values, cryoCenterField, null);
            const errorsDonorId = get(errors, donorIdField, null);
            const errorsCryoCenterId = get(errors, cryoCenterField, null);
            const touchedDonorId = get(touched, donorIdField, null);
            const touchedCryoCenterId = get(touched, cryoCenterField, null);
            return (
              <View key={key}>
                <View style={styles.cryoBlock}>
                  <View style={styles.inputCryoBlock}>
                    <View style={styles.subblockLeft}>
                      <Text style={[styles.textLeft]}>{i18n.t('profile.Donor_IDs')}</Text>
                    </View>
                    <View style={styles.subblockRight}>
                      <TextInput
                        style={styles.textRight}
                        onChangeText={this.updateField(donorIdField, '', this.checkDonorID)}
                        value={String(val.donor_id)}
                        placeholder={i18n.t('profile.Type_Donor_ID')}
                        keyboardType="default"
                        autoCapitalize="characters"
                        underlineColorAndroid="white"
                      />
                    </View>
                  </View>
                  {touchedDonorId && errorsDonorId ? (
                    <Text style={styles.errorMessage}>{i18n.t(errorsDonorId)}</Text>
                  ) : null}
                </View>

                <View style={styles.cryoBlock}>
                  <View style={styles.selectCryoBlock}>
                    <View style={styles.subblockLeft}>
                      <Text style={[styles.textLeft]}>{i18n.t('profile.Cryo_Center')}</Text>
                    </View>
                    <View style={styles.subblockRight}>
                      <ModalPicker
                        keyName="cryo_center_id"
                        labelName="value"
                        defaultText={i18n.t('profile.Select')}
                        data={this.getCryoCenters()}
                        value={selectedCryoCenter}
                        onChange={this.updateDropdownField(cryoCenterField, 'cryo_center_id')}
                      />
                    </View>
                  </View>
                  {touchedCryoCenterId && errorsCryoCenterId ? (
                    <Text style={styles.errorMessage}>{i18n.t(errorsCryoCenterId)}</Text>
                  ) : null}
                </View>
              </View>
            );
          })}
      </View>
    );
  };

  render() {
    const { submitNewData } = this.state;
    const { updateError, updateLoading, cryoCentersData, values, errors, touched } = this.props;
    const { user } = this.state;
    if (!user) {
      return <View />;
    }
    const firstLastName = `${user.first_name} ${user.last_name || ''}`;
    const userAvatarUrl = user.avatar ? user.avatar.url : null;
    const avatarUrl = values.avatar && values.avatar.uri ? values.avatar.uri : userAvatarUrl;
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} title={i18n.t('profile.title')} />

        <KeyboardAwareScrollView>
          <View style={styles.topBlock}>
            <LinearGradient
              colors={[colorBlue, colorLightBlue]}
              start={{ x: 0.0, y: 0.5 }}
              end={{ x: 1.0, y: 0.5 }}
              style={styles.headerGradient}
            >
              <View style={styles.topBlockCircleWrapper}>
                <View style={styles.topBlockLeftCircle} />
                <View style={styles.topBlockRightCircle} />
              </View>
            </LinearGradient>
            <View style={styles.profileAvatarWrapper}>
              <Avatar
                type={user.type}
                avatarUrl={avatarUrl}
                avatarRadius={60}
                onPress={this.addAvatar}
                circleRadius={14}
                circleAngle={135}
                circleContent={this.avatarPen}
              />
            </View>
            <View style={styles.userImgNameWrapper}>
              <Text style={styles.userImgName}>{firstLastName}</Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            {this.renderUserPropSection(i18n.t('profile.Name'), firstLastName)}
            {this.renderInput({
              field: 'address',
              property: i18n.t('profile.Address'),
              placeholder: i18n.t('profile.Type_your_address'),
              keyboardType: 'default',
            })}
            {this.renderUserPropSection(i18n.t('profile.E_mail'), user.email)}
            {this.renderUserPropSection(
              i18n.t('profile.User_Type'),
              find(USERTYPES, { key: user.type }).value,
            )}
            {this.renderInput({
              field: 'age',
              property: i18n.t('profile.Age'),
              placeholder: i18n.t('profile.Type_your_age'),
              keyboardType: 'numeric',
            })}
            {user.donor_infos &&
              user.donor_infos.map((val, ind) => {
                const cryoCenterName =
                  cryoCentersData.length && find(cryoCentersData, { id: val.cryo_center_id })
                    ? find(cryoCentersData, { id: val.cryo_center_id }).name
                    : 'loading...';
                return (
                  <View key={`don${ind}`}>
                    {this.renderUserPropSection(i18n.t('profile.Donor_IDs'), val.donor_id)}
                    {this.renderUserPropSection(i18n.t('profile.Cryo_Center'), cryoCenterName)}
                  </View>
                );
              })}

            {values.donor_infos_attributes &&
              this.renderCryoCenterSection(this.props.values.donor_infos_attributes)}

            {user.type === USERTYPES.donor.key && cryoCentersData && cryoCentersData.length ? (
              <View style={styles.lowSection} key="addCryoBlock">
                <TouchableOpacity onPress={this.addCryoBlock} style={styles.addCryoBtn}>
                  <Image source={ICON_BLUE_PLUS} style={styles.addCryoImg} resize="contain" />
                  <Text style={styles.addCryoTxt}> {i18n.t('profile.ADD_CRYO_CENTER')}</Text>
                </TouchableOpacity>
              </View>
            ) : null}

            {submitNewData && !updateLoading ? (
              <View style={styles.submitSection}>
                <TouchableOpacity style={styles.submitBtn} onPress={this.saveNewData}>
                  <LinearGradient
                    colors={[colorBlue, colorMediumBlue]}
                    start={{ x: 0.0, y: 0.0 }}
                    end={{ x: 1.0, y: 1.0 }}
                    style={styles.submitBtnGradient}
                  >
                    <Text style={styles.submitText}>{i18n.t('profile.SUBMIT')}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : null}
            {updateError && <Text style={styles.errorMessage}>{updateError.message}</Text>}
            {updateLoading && <Text style={styles.errorMessage}>Saving...</Text>}

            <View style={styles.emptyBottom} />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
  updateLoading: state.user.update.loading,
  updateError: state.user.update.error,
  cryoCentersData: state.cryoCenters.cryoCenters.data,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateUser,
      loadCryoCenters,
    },
    dispatch,
  );

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFormik({
    mapPropsToValues({ user }) {
      let values = {
        email: user.email,
        address: user.address || '',
        age: `${user.age}` || '',
      };
      if (user.type === USERTYPES.donor.key) {
        values = { ...values, donor_infos_attributes: [] };
      }
      return values;
    },
    validationSchema: Profile.schema,
    validateOnChange: true,
    async handleSubmit(values, { props }) {
      try {
        const newValues = { ...values };
        if (newValues.age) {
          newValues.age = +newValues.age;
        }
        await props.updateUser({ ...values });
      } catch (err) {
        if (get(err, 'response.status') === 422) {
          const error = get(err, 'response.data', null);
          notify(error);
        }
      }
    },
  }),
)(Profile);
