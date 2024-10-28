import { takeLatest, all } from 'redux-saga/effects';
import API from '../services/api';
import FixtureAPI from '../services/fixture-api';
import AppConfig from '../../config/app-config';

/* ------------- Types ------------- */

import { StartupTypes } from '../reducers/startup.reducer';
import { LoginTypes } from '../../modules/login/login.reducer';
import { AccountTypes } from '../../shared/reducers/account.reducer';
import { RegisterTypes } from '../../modules/account/register/register.reducer';
import { ForgotPasswordTypes } from '../../modules/account/password-reset/forgot-password.reducer';
import { ChangePasswordTypes } from '../../modules/account/password/change-password.reducer';
import { UserTypes } from '../../shared/reducers/user.reducer';
import { ProductTypes } from '../../modules/entities/product/product.reducer';
import { DailyRationTypes } from '../../modules/entities/daily-ration/daily-ration.reducer';
import { UserPropertiesTypes } from '../../modules/entities/user-properties/user-properties.reducer';
// jhipster-react-native-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './startup.saga';
import { login, logout, loginLoad } from '../../modules/login/login.sagas';
import { register } from '../../modules/account/register/register.sagas';
import { forgotPassword } from '../../modules/account/password-reset/forgot-password.sagas';
import { changePassword } from '../../modules/account/password/change-password.sagas';
import { getAccount, updateAccount } from '../../shared/sagas/account.sagas';
import UserSagas from '../../shared/sagas/user.sagas';
import ProductSagas from '../../modules/entities/product/product.sagas';
import DailyRationSagas from '../../modules/entities/daily-ration/daily-ration.sagas';
import UserPropertiesSagas from '../../modules/entities/user-properties/user-properties.sagas';
// jhipster-react-native-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = AppConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),

    takeLatest(ProductTypes.PRODUCT_REQUEST, ProductSagas.getProduct, api),
    takeLatest(ProductTypes.PRODUCT_ALL_REQUEST, ProductSagas.getAllProducts, api),
    takeLatest(ProductTypes.PRODUCT_UPDATE_REQUEST, ProductSagas.updateProduct, api),
    takeLatest(ProductTypes.PRODUCT_DELETE_REQUEST, ProductSagas.deleteProduct, api),

    takeLatest(DailyRationTypes.DAILY_RATION_REQUEST, DailyRationSagas.getDailyRation, api),
    takeLatest(DailyRationTypes.DAILY_RATION_ALL_REQUEST, DailyRationSagas.getAllDailyRations, api),
    takeLatest(DailyRationTypes.DAILY_RATION_UPDATE_REQUEST, DailyRationSagas.updateDailyRation, api),
    takeLatest(DailyRationTypes.DAILY_RATION_DELETE_REQUEST, DailyRationSagas.deleteDailyRation, api),

    takeLatest(UserPropertiesTypes.USER_PROPERTIES_REQUEST, UserPropertiesSagas.getUserProperties, api),
    takeLatest(UserPropertiesTypes.USER_PROPERTIES_ALL_REQUEST, UserPropertiesSagas.getAllUserProperties, api),
    takeLatest(UserPropertiesTypes.USER_PROPERTIES_UPDATE_REQUEST, UserPropertiesSagas.updateUserProperties, api),
    takeLatest(UserPropertiesTypes.USER_PROPERTIES_DELETE_REQUEST, UserPropertiesSagas.deleteUserProperties, api),
    // jhipster-react-native-saga-redux-connect-needle

    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(ChangePasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),
    takeLatest(UserTypes.USER_REQUEST, UserSagas.getUser, api),
    takeLatest(UserTypes.USER_UPDATE_REQUEST, UserSagas.updateUser, api),
    takeLatest(UserTypes.USER_DELETE_REQUEST, UserSagas.deleteUser, api),
    takeLatest(UserTypes.USER_ALL_REQUEST, UserSagas.getAllUsers, api),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api),
  ]);
}
