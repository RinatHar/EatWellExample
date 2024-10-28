import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import DailyRationActions from './daily-ration.reducer';
import styles from './daily-ration-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function DailyRationScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { dailyRation, dailyRationList, getAllDailyRations, fetching } = props;
  const fetchDailyRations = React.useCallback(() => {
    getAllDailyRations({ page: page - 1, sort, size });
  }, [getAllDailyRations, page, sort, size]);

  useFocusEffect(
    React.useCallback(() => {
      console.debug('DailyRation entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchDailyRations();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [dailyRation, fetchDailyRations]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('DailyRationDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No DailyRations Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchDailyRations();
  };
  return (
    <View style={styles.container} testID="dailyRationScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={dailyRationList}
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
    dailyRationList: state.dailyRations.dailyRationList,
    dailyRation: state.dailyRations.dailyRation,
    fetching: state.dailyRations.fetchingAll,
    error: state.dailyRations.errorAll,
    links: state.dailyRations.links,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllDailyRations: options => dispatch(DailyRationActions.dailyRationAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyRationScreen);
