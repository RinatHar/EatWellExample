import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import DailyRationActions from './daily-ration.reducer';
import UserActions from '../../../shared/reducers/user.reducer';
import ProductActions from '../product/product.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './daily-ration-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  productWeight: Yup.number().required(),
  createdDate: Yup.date().required(),
  lastModifiedDate: Yup.date().required(),
});

function DailyRationEditScreen(props) {
  const {
    getDailyRation,
    updateDailyRation,
    route,
    dailyRation,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllUsers,
    userList,
    getAllProducts,
    productList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getDailyRation(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getDailyRation, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(dailyRation));
    }
  }, [dailyRation, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllUsers();
    getAllProducts();
  }, [getAllUsers, getAllProducts]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('DailyRationDetail', { entityId: dailyRation?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = data => updateDailyRation(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const productWeightRef = createRef();
  const createdDateRef = createRef();
  const lastModifiedDateRef = createRef();
  const userRef = createRef();
  const productRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="dailyRationEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}
      >
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="productWeight"
              ref={productWeightRef}
              label="Product Weight"
              placeholder="Enter Product Weight"
              testID="productWeightInput"
              inputType="number"
              onSubmitEditing={() => createdDateRef.current?.focus()}
            />
            <FormField
              name="createdDate"
              ref={createdDateRef}
              label="Created Date"
              placeholder="Enter Created Date"
              testID="createdDateInput"
              inputType="datetime"
              onSubmitEditing={() => lastModifiedDateRef.current?.focus()}
            />
            <FormField
              name="lastModifiedDate"
              ref={lastModifiedDateRef}
              label="Last Modified Date"
              placeholder="Enter Last Modified Date"
              testID="lastModifiedDateInput"
              inputType="datetime"
            />
            <FormField
              name="user"
              inputType="select-one"
              ref={userRef}
              listItems={userList}
              listItemLabelField="id"
              label="User"
              placeholder="Select User"
              testID="userSelectInput"
            />
            <FormField
              name="product"
              inputType="select-one"
              ref={productRef}
              listItems={productList}
              listItemLabelField="id"
              label="Product"
              placeholder="Select Product"
              testID="productSelectInput"
            />

            <FormButton title={'Save'} testID={'submitButton'} />
          </Form>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}

// convenience methods for customizing the mapping of the entity to/from the form value
const entityToFormValue = value => {
  if (!value) {
    return {};
  }
  return {
    id: value.id ?? null,
    productWeight: value.productWeight ?? null,
    createdDate: value.createdDate ?? null,
    lastModifiedDate: value.lastModifiedDate ?? null,
    user: value.user && value.user.id ? value.user.id : null,
    product: value.product && value.product.id ? value.product.id : null,
  };
};
const formValueToEntity = value => {
  const entity = {
    id: value.id ?? null,
    productWeight: value.productWeight ?? null,
    createdDate: value.createdDate ?? null,
    lastModifiedDate: value.lastModifiedDate ?? null,
  };
  entity.user = value.user ? { id: value.user } : null;
  entity.product = value.product ? { id: value.product } : null;
  return entity;
};

const mapStateToProps = state => {
  return {
    userList: state.users.userList ?? [],
    productList: state.products.productList ?? [],
    dailyRation: state.dailyRations.dailyRation,
    fetching: state.dailyRations.fetchingOne,
    updating: state.dailyRations.updating,
    updateSuccess: state.dailyRations.updateSuccess,
    errorUpdating: state.dailyRations.errorUpdating,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: options => dispatch(UserActions.userAllRequest(options)),
    getAllProducts: options => dispatch(ProductActions.productAllRequest(options)),
    getDailyRation: id => dispatch(DailyRationActions.dailyRationRequest(id)),
    getAllDailyRations: options => dispatch(DailyRationActions.dailyRationAllRequest(options)),
    updateDailyRation: dailyRation => dispatch(DailyRationActions.dailyRationUpdateRequest(dailyRation)),
    reset: () => dispatch(DailyRationActions.dailyRationReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyRationEditScreen);
