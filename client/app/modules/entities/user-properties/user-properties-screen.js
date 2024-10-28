import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import UserPropertiesActions from './user-properties.reducer';
import styles from './user-properties-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function UserPropertiesScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { userProperties, userPropertiesList, getAllUserProperties, fetching } = props;
  const fetchUserProperties = React.useCallback(() => {
    getAllUserProperties({ page: page - 1, sort, size });
  }, [getAllUserProperties, page, sort, size]);

  useFocusEffect(
    React.useCallback(() => {
      console.debug('UserProperties entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchUserProperties();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [userProperties, fetchUserProperties]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('UserPropertiesDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No UserProperties Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const handleLoadMore = () => {
    if (userPropertiesList.length) {
      return;
    }
    setPage(page + 1);
    fetchUserProperties();
  };
  return (
    <View style={styles.container} testID="userPropertiesScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={userPropertiesList}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
        initialNumToRender={oneScreensWorth}
        onEndReached={handleLoadMore}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}

const mapStateToProps = state => {
  return {
    // ...redux state to props here
    userPropertiesList: state.userProperties.userPropertiesList,
    userProperties: state.userProperties.userProperties,
    fetching: state.userProperties.fetchingAll,
    error: state.userProperties.errorAll,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllUserProperties: options => dispatch(UserPropertiesActions.userPropertiesAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPropertiesScreen);
