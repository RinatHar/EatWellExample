import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { convertLocalDateToString } from '../../../shared/util/date-transforms';

import UserPropertiesActions from './user-properties.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import UserPropertiesDeleteModal from './user-properties-delete-modal';
import styles from './user-properties-styles';

function UserPropertiesDetailScreen(props) {
  const { route, getUserProperties, navigation, userProperties, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = userProperties?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('UserProperties');
      } else {
        setDeleteModalVisible(false);
        getUserProperties(routeEntityId);
      }
    }, [routeEntityId, getUserProperties, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the UserProperties.</Text>
      </View>
    );
  }
  if (!entityId || fetching || !correctEntityLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="userPropertiesDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{userProperties.id}</Text>
      {/* Name Field */}
      <Text style={styles.label}>Name:</Text>
      <Text testID="name">{userProperties.name}</Text>
      {/* Gender Field */}
      <Text style={styles.label}>Gender:</Text>
      <Text testID="gender">{userProperties.gender}</Text>
      {/* Date Field */}
      <Text style={styles.label}>Date:</Text>
      <Text testID="date">{convertLocalDateToString(userProperties.date)}</Text>
      {/* CurrentWeight Field */}
      <Text style={styles.label}>CurrentWeight:</Text>
      <Text testID="currentWeight">{userProperties.currentWeight}</Text>
      {/* PreferredWeight Field */}
      <Text style={styles.label}>PreferredWeight:</Text>
      <Text testID="preferredWeight">{userProperties.preferredWeight}</Text>
      {/* Height Field */}
      <Text style={styles.label}>Height:</Text>
      <Text testID="height">{userProperties.height}</Text>
      {/* Lifestyle Field */}
      <Text style={styles.label}>Lifestyle:</Text>
      <Text testID="lifestyle">{userProperties.lifestyle}</Text>
      {/* CaloriesNeeded Field */}
      <Text style={styles.label}>CaloriesNeeded:</Text>
      <Text testID="caloriesNeeded">{userProperties.caloriesNeeded}</Text>
      {/* CreatedDate Field */}
      <Text style={styles.label}>CreatedDate:</Text>
      <Text testID="createdDate">{String(userProperties.createdDate)}</Text>
      {/* LastModifiedDate Field */}
      <Text style={styles.label}>LastModifiedDate:</Text>
      <Text testID="lastModifiedDate">{String(userProperties.lastModifiedDate)}</Text>
      <Text style={styles.label}>User:</Text>
      <Text testID="user">{String(userProperties.user ? userProperties.user.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('UserPropertiesEdit', { entityId })}
          accessibilityLabel={'UserProperties Edit Button'}
          testID="userPropertiesEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'UserProperties Delete Button'}
          testID="userPropertiesDeleteButton"
        />
        {deleteModalVisible && (
          <UserPropertiesDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={userProperties}
            testID="userPropertiesDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = state => {
  return {
    userProperties: state.userProperties.userProperties,
    error: state.userProperties.errorOne,
    fetching: state.userProperties.fetchingOne,
    deleting: state.userProperties.deleting,
    errorDeleting: state.userProperties.errorDeleting,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserProperties: id => dispatch(UserPropertiesActions.userPropertiesRequest(id)),
    getAllUserProperties: options => dispatch(UserPropertiesActions.userPropertiesAllRequest(options)),
    deleteUserProperties: id => dispatch(UserPropertiesActions.userPropertiesDeleteRequest(id)),
    resetUserProperties: () => dispatch(UserPropertiesActions.userPropertiesReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPropertiesDetailScreen);
