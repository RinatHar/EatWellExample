import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import DailyRationActions from './daily-ration.reducer';

import styles from './daily-ration-styles';

function DailyRationDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteDailyRation(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('DailyRation');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete DailyRation {entity.id}?</Text>
          </View>
          <View style={[styles.flexRow]}>
            <TouchableHighlight
              style={[styles.openButton, styles.cancelButton]}
              onPress={() => {
                setVisible(false);
              }}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.openButton, styles.submitButton]} onPress={deleteEntity} testID="deleteButton">
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const mapStateToProps = state => {
  return {
    dailyRation: state.dailyRations.dailyRation,
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

export default connect(mapStateToProps, mapDispatchToProps)(DailyRationDeleteModal);
