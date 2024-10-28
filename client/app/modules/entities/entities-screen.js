import React from 'react';
import { ScrollView, Text } from 'react-native';
// Styles
import RoundedButton from '../../shared/components/rounded-button/rounded-button';

import styles from './entities-screen.styles';

export default function EntitiesScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="entityScreenScrollList">
      <Text style={styles.centerText}>JHipster Entities will appear below</Text>
      <RoundedButton text="Product" onPress={() => navigation.navigate('Product')} testID="productEntityScreenButton" />
      <RoundedButton text="DailyRation" onPress={() => navigation.navigate('DailyRation')} testID="dailyRationEntityScreenButton" />
      <RoundedButton
        text="UserProperties"
        onPress={() => navigation.navigate('UserProperties')}
        testID="userPropertiesEntityScreenButton"
      />
      {/* jhipster-react-native-entity-screen-needle */}
    </ScrollView>
  );
}
