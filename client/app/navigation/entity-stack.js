import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';
import { Ionicons } from '@expo/vector-icons';

import { DrawerButton } from './drawer/drawer-button';
import { navigate, goBackOrIfParamsOrDefault } from './nav-ref';

// import screens
import EntitiesScreen from '../modules/entities/entities-screen';
import ProductScreen from '../modules/entities/product/product-screen';
import ProductDetailScreen from '../modules/entities/product/product-detail-screen';
import ProductEditScreen from '../modules/entities/product/product-edit-screen';
import DailyRationScreen from '../modules/entities/daily-ration/daily-ration-screen';
import DailyRationDetailScreen from '../modules/entities/daily-ration/daily-ration-detail-screen';
import DailyRationEditScreen from '../modules/entities/daily-ration/daily-ration-edit-screen';
import UserPropertiesScreen from '../modules/entities/user-properties/user-properties-screen';
import UserPropertiesDetailScreen from '../modules/entities/user-properties/user-properties-detail-screen';
import UserPropertiesEditScreen from '../modules/entities/user-properties/user-properties-edit-screen';
// jhipster-react-native-navigation-import-needle

export const entityScreens = [
  {
    name: 'Entities',
    route: '',
    component: EntitiesScreen,
    options: {
      headerLeft: DrawerButton,
    },
  },
  {
    name: 'Product',
    route: 'product',
    component: ProductScreen,
    options: {
      title: 'Products',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('ProductEdit', { id: undefined })}
          backImage={props => <Ionicons name="add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'ProductDetail',
    route: 'product/detail',
    component: ProductDetailScreen,
    options: { title: 'View Product', headerLeft: () => <HeaderBackButton onPress={() => navigate('Product')} /> },
  },
  {
    name: 'ProductEdit',
    route: 'product/edit',
    component: ProductEditScreen,
    options: {
      title: 'Edit Product',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('ProductDetail', 'Product')} />,
    },
  },
  {
    name: 'DailyRation',
    route: 'daily-ration',
    component: DailyRationScreen,
    options: {
      title: 'DailyRations',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('DailyRationEdit', { id: undefined })}
          backImage={props => <Ionicons name="add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'DailyRationDetail',
    route: 'daily-ration/detail',
    component: DailyRationDetailScreen,
    options: { title: 'View DailyRation', headerLeft: () => <HeaderBackButton onPress={() => navigate('DailyRation')} /> },
  },
  {
    name: 'DailyRationEdit',
    route: 'daily-ration/edit',
    component: DailyRationEditScreen,
    options: {
      title: 'Edit DailyRation',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('DailyRationDetail', 'DailyRation')} />,
    },
  },
  {
    name: 'UserProperties',
    route: 'user-properties',
    component: UserPropertiesScreen,
    options: {
      title: 'UserProperties',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('UserPropertiesEdit', { id: undefined })}
          backImage={props => <Ionicons name="add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'UserPropertiesDetail',
    route: 'user-properties/detail',
    component: UserPropertiesDetailScreen,
    options: { title: 'View UserProperties', headerLeft: () => <HeaderBackButton onPress={() => navigate('UserProperties')} /> },
  },
  {
    name: 'UserPropertiesEdit',
    route: 'user-properties/edit',
    component: UserPropertiesEditScreen,
    options: {
      title: 'Edit UserProperties',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('UserPropertiesDetail', 'UserProperties')} />,
    },
  },
  // jhipster-react-native-navigation-declaration-needle
];

export const getEntityRoutes = () => {
  const routes = {};
  entityScreens.forEach(screen => {
    routes[screen.name] = screen.route;
  });
  return routes;
};

const EntityStack = createStackNavigator();

export default function EntityStackScreen() {
  return (
    <EntityStack.Navigator>
      {entityScreens.map((screen, index) => {
        return <EntityStack.Screen name={screen.name} component={screen.component} key={index} options={screen.options} />;
      })}
    </EntityStack.Navigator>
  );
}
