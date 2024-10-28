export default {
  // Functions return fixtures

  // entity fixtures
  updateProduct: product => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-product.json'),
    };
  },
  getAllProducts: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-products.json'),
    };
  },
  getProduct: productId => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-product.json'),
    };
  },
  deleteProduct: productId => {
    return {
      ok: true,
    };
  },
  updateDailyRation: dailyRation => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-daily-ration.json'),
    };
  },
  getAllDailyRations: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-daily-rations.json'),
    };
  },
  getDailyRation: dailyRationId => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-daily-ration.json'),
    };
  },
  deleteDailyRation: dailyRationId => {
    return {
      ok: true,
    };
  },
  updateUserProperties: userProperties => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-user-properties.json'),
    };
  },
  getAllUserProperties: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-user-properties.json'),
    };
  },
  getUserProperties: userPropertiesId => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-user-properties.json'),
    };
  },
  deleteUserProperties: userPropertiesId => {
    return {
      ok: true,
    };
  },
  // jhipster-react-native-api-fixture-needle

  // user fixtures
  updateUser: user => {
    return {
      ok: true,
      data: require('../fixtures/update-user.json'),
    };
  },
  getAllUsers: () => {
    return {
      ok: true,
      data: require('../fixtures/get-users.json'),
    };
  },
  getUser: userId => {
    return {
      ok: true,
      data: require('../fixtures/get-user.json'),
    };
  },
  deleteUser: userId => {
    return {
      ok: true,
    };
  },
  // auth fixtures
  setAuthToken: () => {},
  removeAuthToken: () => {},
  login: authObj => {
    if (authObj.username === 'user' && authObj.password === 'user') {
      return {
        ok: true,
        data: require('../fixtures/login.json'),
      };
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid credentials',
      };
    }
  },
  register: ({ user }) => {
    if (user === 'user') {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        data: {
          title: 'Invalid email',
        },
      };
    }
  },
  forgotPassword: ({ email }) => {
    if (email === 'valid@gmail.com') {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        data: 'Invalid email',
      };
    }
  },
  getAccount: () => {
    return {
      ok: true,
      status: 200,
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      data: require('../fixtures/get-account.json'),
    };
  },
  updateAccount: () => {
    return {
      ok: true,
    };
  },
  changePassword: ({ currentPassword }) => {
    if (currentPassword === 'valid-password') {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        data: 'Password error',
      };
    }
  },
};
