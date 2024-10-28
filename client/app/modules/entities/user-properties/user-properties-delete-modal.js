import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import UserPropertiesActions from './user-properties.reducer';

import styles from './user-properties-styles';

function UserPropertiesDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteUserProperties(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('UserProperties');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete UserProperties {entity.id}?</Text>
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
    userProperties: state.userProperties.userProperties,
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

export default connect(mapStateToProps, mapDispatchToProps)(UserPropertiesDeleteModal);
