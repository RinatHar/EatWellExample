import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import ProductActions from './product.reducer';
import UserActions from '../../../shared/reducers/user.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './product-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  calories: Yup.number().required(),
  protein: Yup.number().required(),
  fats: Yup.number().required(),
  carbohydrates: Yup.number().required(),
  createdDate: Yup.date().required(),
  lastModifiedDate: Yup.date().required(),
});

function ProductEditScreen(props) {
  const {
    getProduct,
    updateProduct,
    route,
    product,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllUsers,
    userList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getProduct(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getProduct, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(product));
    }
  }, [product, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('ProductDetail', { entityId: product?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = data => updateProduct(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const nameRef = createRef();
  const photoRef = createRef();
  const caloriesRef = createRef();
  const proteinRef = createRef();
  const fatsRef = createRef();
  const carbohydratesRef = createRef();
  const createdDateRef = createRef();
  const lastModifiedDateRef = createRef();
  const userRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="productEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}
      >
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="name"
              ref={nameRef}
              label="Name"
              placeholder="Enter Name"
              testID="nameInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => photoRef.current?.focus()}
            />
            <FormField
              name="photo"
              ref={photoRef}
              label="Photo"
              placeholder="Enter Photo"
              testID="photoInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => caloriesRef.current?.focus()}
            />
            <FormField
              name="calories"
              ref={caloriesRef}
              label="Calories"
              placeholder="Enter Calories"
              testID="caloriesInput"
              inputType="number"
              onSubmitEditing={() => proteinRef.current?.focus()}
            />
            <FormField
              name="protein"
              ref={proteinRef}
              label="Protein"
              placeholder="Enter Protein"
              testID="proteinInput"
              inputType="number"
              onSubmitEditing={() => fatsRef.current?.focus()}
            />
            <FormField
              name="fats"
              ref={fatsRef}
              label="Fats"
              placeholder="Enter Fats"
              testID="fatsInput"
              inputType="number"
              onSubmitEditing={() => carbohydratesRef.current?.focus()}
            />
            <FormField
              name="carbohydrates"
              ref={carbohydratesRef}
              label="Carbohydrates"
              placeholder="Enter Carbohydrates"
              testID="carbohydratesInput"
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
    name: value.name ?? null,
    photo: value.photo ?? null,
    calories: value.calories ?? null,
    protein: value.protein ?? null,
    fats: value.fats ?? null,
    carbohydrates: value.carbohydrates ?? null,
    createdDate: value.createdDate ?? null,
    lastModifiedDate: value.lastModifiedDate ?? null,
    user: value.user && value.user.id ? value.user.id : null,
  };
};
const formValueToEntity = value => {
  const entity = {
    id: value.id ?? null,
    name: value.name ?? null,
    photo: value.photo ?? null,
    calories: value.calories ?? null,
    protein: value.protein ?? null,
    fats: value.fats ?? null,
    carbohydrates: value.carbohydrates ?? null,
    createdDate: value.createdDate ?? null,
    lastModifiedDate: value.lastModifiedDate ?? null,
  };
  entity.user = value.user ? { id: value.user } : null;
  return entity;
};

const mapStateToProps = state => {
  return {
    userList: state.users.userList ?? [],
    product: state.products.product,
    fetching: state.products.fetchingOne,
    updating: state.products.updating,
    updateSuccess: state.products.updateSuccess,
    errorUpdating: state.products.errorUpdating,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: options => dispatch(UserActions.userAllRequest(options)),
    getProduct: id => dispatch(ProductActions.productRequest(id)),
    getAllProducts: options => dispatch(ProductActions.productAllRequest(options)),
    updateProduct: product => dispatch(ProductActions.productUpdateRequest(product)),
    reset: () => dispatch(ProductActions.productReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductEditScreen);
