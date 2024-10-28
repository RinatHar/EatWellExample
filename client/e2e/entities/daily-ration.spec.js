const { expect: jestExpect } = require('expect');
const {
  reloadApp,
  loginAsUser,
  logout,
  goBack,
  tapFirstElementByLabel,
  openAndTapDrawerMenuItemByLabel,
  waitThenTapButton,
  waitForElementToBeVisibleById,
  setDateTimePickerValue,
  scrollTo,
} = require('../utils');

describe('DailyRation Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToDailyRationScreen();
  });

  const navigateToDailyRationScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('dailyRationEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('dailyRationEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('dailyRationScreen');
  };

  it('should allow you to create, update, and delete the DailyRation entity', async () => {
    await expect(element(by.id('dailyRationScreen'))).toBeVisible();

    /*
     * Create DailyRation
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('dailyRationEditScrollView');
    // productWeight
    await scrollTo('productWeightInput', 'dailyRationEditScrollView');
    await element(by.id('productWeightInput')).replaceText('22783.82');
    await element(by.id('productWeightInput')).tapReturnKey();
    // createdDate
    await scrollTo('createdDateInput', 'dailyRationEditScrollView');
    await setDateTimePickerValue('createdDateInput', '2024-10-28T06:48:00+05:00', 'ISO8601');
    // lastModifiedDate
    await scrollTo('lastModifiedDateInput', 'dailyRationEditScrollView');
    await setDateTimePickerValue('lastModifiedDateInput', '2024-10-27T16:49:00+05:00', 'ISO8601');
    // save
    await scrollTo('submitButton', 'dailyRationEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View DailyRation - validate the creation
     */
    await waitForElementToBeVisibleById('dailyRationDetailScrollView');
    // productWeight
    await scrollTo('productWeight', 'dailyRationDetailScrollView');
    await expect(element(by.id('productWeight'))).toHaveLabel('22783.82');
    // createdDate
    await scrollTo('createdDate', 'dailyRationDetailScrollView');
    const createdDateCreateAttributes = await element(by.id('createdDate')).getAttributes();
    jestExpect(Date.parse(createdDateCreateAttributes.label)).toEqual(Date.parse('2024-10-28T06:48:00+05:00'));
    // lastModifiedDate
    await scrollTo('lastModifiedDate', 'dailyRationDetailScrollView');
    const lastModifiedDateCreateAttributes = await element(by.id('lastModifiedDate')).getAttributes();
    jestExpect(Date.parse(lastModifiedDateCreateAttributes.label)).toEqual(Date.parse('2024-10-27T16:49:00+05:00'));

    /*
     * Update DailyRation
     */
    await scrollTo('dailyRationEditButton', 'dailyRationDetailScrollView');
    await tapFirstElementByLabel('DailyRation Edit Button');
    await waitForElementToBeVisibleById('dailyRationEditScrollView');
    // productWeight
    await scrollTo('productWeightInput', 'dailyRationEditScrollView');
    await element(by.id('productWeightInput')).replaceText('22852.9');
    await element(by.id('productWeightInput')).tapReturnKey();
    // createdDate
    await scrollTo('createdDateInput', 'dailyRationEditScrollView');
    await setDateTimePickerValue('createdDateInput', '2024-10-27T17:34:00+05:00', 'ISO8601');
    // lastModifiedDate
    await scrollTo('lastModifiedDateInput', 'dailyRationEditScrollView');
    await setDateTimePickerValue('lastModifiedDateInput', '2024-10-27T16:41:00+05:00', 'ISO8601');
    // save
    await scrollTo('submitButton', 'dailyRationEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View DailyRation - validate the update
     */
    await waitForElementToBeVisibleById('dailyRationDetailScrollView');
    // productWeight
    await scrollTo('productWeight', 'dailyRationDetailScrollView');
    await expect(element(by.id('productWeight'))).toHaveLabel('22852.9');
    // createdDate
    await scrollTo('createdDate', 'dailyRationDetailScrollView');
    const createdDateUpdateAttributes = await element(by.id('createdDate')).getAttributes();
    jestExpect(Date.parse(createdDateUpdateAttributes.label)).toEqual(Date.parse('2024-10-27T17:34:00+05:00'));
    // lastModifiedDate
    await scrollTo('lastModifiedDate', 'dailyRationDetailScrollView');
    const lastModifiedDateUpdateAttributes = await element(by.id('lastModifiedDate')).getAttributes();
    jestExpect(Date.parse(lastModifiedDateUpdateAttributes.label)).toEqual(Date.parse('2024-10-27T16:41:00+05:00'));

    /*
     * Delete
     */
    await scrollTo('dailyRationDeleteButton', 'dailyRationDetailScrollView');
    await waitThenTapButton('dailyRationDeleteButton');
    await waitForElementToBeVisibleById('dailyRationDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('dailyRationScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
