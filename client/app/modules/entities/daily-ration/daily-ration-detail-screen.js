import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import DailyRationActions from './daily-ration.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import DailyRationDeleteModal from './daily-ration-delete-modal';
import styles from './daily-ration-styles';

function DailyRationDetailScreen(props) {
  const { route, getDailyRation, navigation, dailyRation, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = dailyRation?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('DailyRation');
      } else {
        setDeleteModalVisible(false);
        getDailyRation(routeEntityId);
      }
    }, [routeEntityId, getDailyRation, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the DailyRation.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="dailyRationDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{dailyRation.id}</Text>
      {/* ProductWeight Field */}
      <Text style={styles.label}>ProductWeight:</Text>
      <Text testID="productWeight">{dailyRation.productWeight}</Text>
      {/* CreatedDate Field */}
      <Text style={styles.label}>CreatedDate:</Text>
      <Text testID="createdDate">{String(dailyRation.createdDate)}</Text>
      {/* LastModifiedDate Field */}
      <Text style={styles.label}>LastModifiedDate:</Text>
      <Text testID="lastModifiedDate">{String(dailyRation.lastModifiedDate)}</Text>
      <Text style={styles.label}>User:</Text>
      <Text testID="user">{String(dailyRation.user ? dailyRation.user.id : '')}</Text>
      <Text style={styles.label}>Product:</Text>
      <Text testID="product">{String(dailyRation.product ? dailyRation.product.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('DailyRationEdit', { entityId })}
          accessibilityLabel={'DailyRation Edit Button'}
          testID="dailyRationEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'DailyRation Delete Button'}
          testID="dailyRationDeleteButton"
        />
        {deleteModalVisible && (
          <DailyRationDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={dailyRation}
            testID="dailyRationDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = state => {
  return {
    dailyRation: state.dailyRations.dailyRation,
    error: state.dailyRations.errorOne,
    fetching: state.dailyRations.fetchingOne,
    deleting: state.dailyRations.deleting,
    errorDeleting: state.dailyRations.errorDeleting,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDailyRation: id => dispatch(DailyRationActions.dailyRationRequest(id)),
    getAllDailyRations: options => dispatch(DailyRationActions.dailyRationAllRequest(options)),
    deleteDailyRation: id => dispatch(DailyRationActions.dailyRationDeleteRequest(id)),
    resetDailyRations: () => dispatch(DailyRationActions.dailyRationReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyRationDetailScreen);
