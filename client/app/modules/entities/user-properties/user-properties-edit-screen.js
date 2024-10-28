import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import UserPropertiesActions from './user-properties.reducer';
import UserActions from '../../../shared/reducers/user.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './user-properties-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  gender: Yup.string().required(),
  date: Yup.date().required(),
  currentWeight: Yup.number().required(),
  preferredWeight: Yup.number().required(),
  height: Yup.number().required(),
  lifestyle: Yup.string().required(),
  caloriesNeeded: Yup.number().required(),
  createdDate: Yup.date().required(),
  lastModifiedDate: Yup.date().required(),
});

const Gender = [
  {
    label: 'MALE',
    value: 'MALE',
  },
  {
    label: 'FEMALE',
    value: 'FEMALE',
  },
  {
    label: 'NON_BINARY',
    value: 'NON_BINARY',
  },
];
const Lifestyle = [
  {
    label: 'SEDENTARY',
    value: 'SEDENTARY',
  },
  {
    label: 'LIGHTLY_ACTIVE',
    value: 'LIGHTLY_ACTIVE',
  },
  {
    label: 'MODERATELY_ACTIVE',
    value: 'MODERATELY_ACTIVE',
  },
  {
    label: 'VERY_ACTIVE',
    value: 'VERY_ACTIVE',
  },
  {
    label: 'EXTREMELY_ACTIVE',
    value: 'EXTREMELY_ACTIVE',
  },
];

function UserPropertiesEditScreen(props) {
  const {
    getUserProperties,
    updateUserProperties,
    route,
    userProperties,
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
      getUserProperties(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getUserProperties, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(userProperties));
    }
  }, [userProperties, fetching, isNewEntity]);

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
        isNewEntity || !navigation.canGoBack()
          ? navigation.replace('UserPropertiesDetail', { entityId: userProperties?.id })
          : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = data => updateUserProperties(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const nameRef = createRef();
  const genderRef = createRef();
  const dateRef = createRef();
  const currentWeightRef = createRef();
  const preferredWeightRef = createRef();
  const heightRef = createRef();
  const lifestyleRef = createRef();
  const caloriesNeededRef = createRef();
  const createdDateRef = createRef();
  const lastModifiedDateRef = createRef();
  const userRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="userPropertiesEditScrollView"
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
            />
            <FormField
              name="gender"
              ref={genderRef}
              label="Gender"
              placeholder="Enter Gender"
              testID="genderInput"
              inputType="select-one"
              listItems={Gender}
              onSubmitEditing={() => dateRef.current?.focus()}
            />
            <FormField
              name="date"
              ref={dateRef}
              label="Date"
              placeholder="Enter Date"
              testID="dateInput"
              inputType="date"
              onSubmitEditing={() => currentWeightRef.current?.focus()}
            />
            <FormField
              name="currentWeight"
              ref={currentWeightRef}
              label="Current Weight"
              placeholder="Enter Current Weight"
              testID="currentWeightInput"
              inputType="number"
              onSubmitEditing={() => preferredWeightRef.current?.focus()}
            />
            <FormField
              name="preferredWeight"
              ref={preferredWeightRef}
              label="Preferred Weight"
              placeholder="Enter Preferred Weight"
              testID="preferredWeightInput"
              inputType="number"
              onSubmitEditing={() => heightRef.current?.focus()}
            />
            <FormField name="height" ref={heightRef} label="Height" placeholder="Enter Height" testID="heightInput" inputType="number" />
            <FormField
              name="lifestyle"
              ref={lifestyleRef}
              label="Lifestyle"
              placeholder="Enter Lifestyle"
              testID="lifestyleInput"
              inputType="select-one"
              listItems={Lifestyle}
              onSubmitEditing={() => caloriesNeededRef.current?.focus()}
            />
            <FormField
              name="caloriesNeeded"
              ref={caloriesNeededRef}
              label="Calories Needed"
              placeholder="Enter Calories Needed"
              testID="caloriesNeededInput"
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
    gender: value.gender ?? null,
    date: value.date ?? null,
    currentWeight: value.currentWeight ?? null,
    preferredWeight: value.preferredWeight ?? null,
    height: value.height ?? null,
    lifestyle: value.lifestyle ?? null,
    caloriesNeeded: value.caloriesNeeded ?? null,
    createdDate: value.createdDate ?? null,
    lastModifiedDate: value.lastModifiedDate ?? null,
    user: value.user && value.user.id ? value.user.id : null,
  };
};
const formValueToEntity = value => {
  const entity = {
    id: value.id ?? null,
    name: value.name ?? null,
    gender: value.gender ?? null,
    date: value.date ?? null,
    currentWeight: value.currentWeight ?? null,
    preferredWeight: value.preferredWeight ?? null,
    height: value.height ?? null,
    lifestyle: value.lifestyle ?? null,
    caloriesNeeded: value.caloriesNeeded ?? null,
    createdDate: value.createdDate ?? null,
    lastModifiedDate: value.lastModifiedDate ?? null,
  };
  entity.user = value.user ? { id: value.user } : null;
  return entity;
};

const mapStateToProps = state => {
  return {
    userList: state.users.userList ?? [],
    userProperties: state.userProperties.userProperties,
    fetching: state.userProperties.fetchingOne,
    updating: state.userProperties.updating,
    updateSuccess: state.userProperties.updateSuccess,
    errorUpdating: state.userProperties.errorUpdating,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: options => dispatch(UserActions.userAllRequest(options)),
    getUserProperties: id => dispatch(UserPropertiesActions.userPropertiesRequest(id)),
    getAllUserProperties: options => dispatch(UserPropertiesActions.userPropertiesAllRequest(options)),
    updateUserProperties: userProperties => dispatch(UserPropertiesActions.userPropertiesUpdateRequest(userProperties)),
    reset: () => dispatch(UserPropertiesActions.userPropertiesReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPropertiesEditScreen);
