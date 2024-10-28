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
  setPickerValue,
  setDateTimePickerValue,
  scrollTo,
} = require('../utils');

describe('UserProperties Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToUserPropertiesScreen();
  });

  const navigateToUserPropertiesScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('userPropertiesEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('userPropertiesEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('userPropertiesScreen');
  };

  it('should allow you to create, update, and delete the UserProperties entity', async () => {
    await expect(element(by.id('userPropertiesScreen'))).toBeVisible();

    /*
     * Create UserProperties
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('userPropertiesEditScrollView');
    // name
    await scrollTo('nameInput', 'userPropertiesEditScrollView');
    await element(by.id('nameInput')).replaceText('fuzzy furthermore hence');
    await element(by.id('nameInput')).tapReturnKey();
    // gender
    await scrollTo('genderInput', 'userPropertiesEditScrollView');
    await setPickerValue('genderInput', 'MALE');
    // date
    await scrollTo('dateInput', 'userPropertiesEditScrollView');
    await setDateTimePickerValue('dateInput', '10/27/24', 'MM/dd/yy');
    // currentWeight
    await scrollTo('currentWeightInput', 'userPropertiesEditScrollView');
    await element(by.id('currentWeightInput')).replaceText('20494.47');
    await element(by.id('currentWeightInput')).tapReturnKey();
    // preferredWeight
    await scrollTo('preferredWeightInput', 'userPropertiesEditScrollView');
    await element(by.id('preferredWeightInput')).replaceText('16868.33');
    await element(by.id('preferredWeightInput')).tapReturnKey();
    // height
    await scrollTo('heightInput', 'userPropertiesEditScrollView');
    await element(by.id('heightInput')).replaceText('24742.51');
    await element(by.id('heightInput')).tapReturnKey();
    // lifestyle
    await scrollTo('lifestyleInput', 'userPropertiesEditScrollView');
    await setPickerValue('lifestyleInput', 'SEDENTARY');
    // caloriesNeeded
    await scrollTo('caloriesNeededInput', 'userPropertiesEditScrollView');
    await element(by.id('caloriesNeededInput')).replaceText('22753.07');
    await element(by.id('caloriesNeededInput')).tapReturnKey();
    // createdDate
    await scrollTo('createdDateInput', 'userPropertiesEditScrollView');
    await setDateTimePickerValue('createdDateInput', '2024-10-27T19:15:00+05:00', 'ISO8601');
    // lastModifiedDate
    await scrollTo('lastModifiedDateInput', 'userPropertiesEditScrollView');
    await setDateTimePickerValue('lastModifiedDateInput', '2024-10-27T21:18:00+05:00', 'ISO8601');
    // save
    await scrollTo('submitButton', 'userPropertiesEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View UserProperties - validate the creation
     */
    await waitForElementToBeVisibleById('userPropertiesDetailScrollView');
    // name
    await scrollTo('name', 'userPropertiesDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('fuzzy furthermore hence');
    // gender
    await scrollTo('gender', 'userPropertiesDetailScrollView');
    await expect(element(by.id('gender'))).toHaveLabel('MALE');
    // date
    await scrollTo('date', 'userPropertiesDetailScrollView');
    const dateCreateAttributes = await element(by.id('date')).getAttributes();
    jestExpect(Date.parse(dateCreateAttributes.label)).toEqual(Date.parse('10/27/24'));
    // currentWeight
    await scrollTo('currentWeight', 'userPropertiesDetailScrollView');
    await expect(element(by.id('currentWeight'))).toHaveLabel('20494.47');
    // preferredWeight
    await scrollTo('preferredWeight', 'userPropertiesDetailScrollView');
    await expect(element(by.id('preferredWeight'))).toHaveLabel('16868.33');
    // height
    await scrollTo('height', 'userPropertiesDetailScrollView');
    await expect(element(by.id('height'))).toHaveLabel('24742.51');
    // lifestyle
    await scrollTo('lifestyle', 'userPropertiesDetailScrollView');
    await expect(element(by.id('lifestyle'))).toHaveLabel('SEDENTARY');
    // caloriesNeeded
    await scrollTo('caloriesNeeded', 'userPropertiesDetailScrollView');
    await expect(element(by.id('caloriesNeeded'))).toHaveLabel('22753.07');
    // createdDate
    await scrollTo('createdDate', 'userPropertiesDetailScrollView');
    const createdDateCreateAttributes = await element(by.id('createdDate')).getAttributes();
    jestExpect(Date.parse(createdDateCreateAttributes.label)).toEqual(Date.parse('2024-10-27T19:15:00+05:00'));
    // lastModifiedDate
    await scrollTo('lastModifiedDate', 'userPropertiesDetailScrollView');
    const lastModifiedDateCreateAttributes = await element(by.id('lastModifiedDate')).getAttributes();
    jestExpect(Date.parse(lastModifiedDateCreateAttributes.label)).toEqual(Date.parse('2024-10-27T21:18:00+05:00'));

    /*
     * Update UserProperties
     */
    await scrollTo('userPropertiesEditButton', 'userPropertiesDetailScrollView');
    await tapFirstElementByLabel('UserProperties Edit Button');
    await waitForElementToBeVisibleById('userPropertiesEditScrollView');
    // name
    await scrollTo('nameInput', 'userPropertiesEditScrollView');
    await element(by.id('nameInput')).replaceText('fuzzy furthermore hence');
    await element(by.id('nameInput')).tapReturnKey();
    // gender
    await scrollTo('genderInput', 'userPropertiesEditScrollView');
    await setPickerValue('genderInput', 'FEMALE');
    // date
    await scrollTo('dateInput', 'userPropertiesEditScrollView');
    await setDateTimePickerValue('dateInput', '10/28/24', 'MM/dd/yy');
    // currentWeight
    await scrollTo('currentWeightInput', 'userPropertiesEditScrollView');
    await element(by.id('currentWeightInput')).replaceText('23969.48');
    await element(by.id('currentWeightInput')).tapReturnKey();
    // preferredWeight
    await scrollTo('preferredWeightInput', 'userPropertiesEditScrollView');
    await element(by.id('preferredWeightInput')).replaceText('6175.82');
    await element(by.id('preferredWeightInput')).tapReturnKey();
    // height
    await scrollTo('heightInput', 'userPropertiesEditScrollView');
    await element(by.id('heightInput')).replaceText('14972.58');
    await element(by.id('heightInput')).tapReturnKey();
    // lifestyle
    await scrollTo('lifestyleInput', 'userPropertiesEditScrollView');
    await setPickerValue('lifestyleInput', 'EXTREMELY_ACTIVE');
    // caloriesNeeded
    await scrollTo('caloriesNeededInput', 'userPropertiesEditScrollView');
    await element(by.id('caloriesNeededInput')).replaceText('15034.05');
    await element(by.id('caloriesNeededInput')).tapReturnKey();
    // createdDate
    await scrollTo('createdDateInput', 'userPropertiesEditScrollView');
    await setDateTimePickerValue('createdDateInput', '2024-10-27T22:29:00+05:00', 'ISO8601');
    // lastModifiedDate
    await scrollTo('lastModifiedDateInput', 'userPropertiesEditScrollView');
    await setDateTimePickerValue('lastModifiedDateInput', '2024-10-28T05:55:00+05:00', 'ISO8601');
    // save
    await scrollTo('submitButton', 'userPropertiesEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View UserProperties - validate the update
     */
    await waitForElementToBeVisibleById('userPropertiesDetailScrollView');
    // name
    await scrollTo('name', 'userPropertiesDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('fuzzy furthermore hence');
    // gender
    await scrollTo('gender', 'userPropertiesDetailScrollView');
    await expect(element(by.id('gender'))).toHaveLabel('FEMALE');
    // date
    await scrollTo('date', 'userPropertiesDetailScrollView');
    const dateUpdateAttributes = await element(by.id('date')).getAttributes();
    jestExpect(Date.parse(dateUpdateAttributes.label)).toEqual(Date.parse('10/28/24'));
    // currentWeight
    await scrollTo('currentWeight', 'userPropertiesDetailScrollView');
    await expect(element(by.id('currentWeight'))).toHaveLabel('23969.48');
    // preferredWeight
    await scrollTo('preferredWeight', 'userPropertiesDetailScrollView');
    await expect(element(by.id('preferredWeight'))).toHaveLabel('6175.82');
    // height
    await scrollTo('height', 'userPropertiesDetailScrollView');
    await expect(element(by.id('height'))).toHaveLabel('14972.58');
    // lifestyle
    await scrollTo('lifestyle', 'userPropertiesDetailScrollView');
    await expect(element(by.id('lifestyle'))).toHaveLabel('EXTREMELY_ACTIVE');
    // caloriesNeeded
    await scrollTo('caloriesNeeded', 'userPropertiesDetailScrollView');
    await expect(element(by.id('caloriesNeeded'))).toHaveLabel('15034.05');
    // createdDate
    await scrollTo('createdDate', 'userPropertiesDetailScrollView');
    const createdDateUpdateAttributes = await element(by.id('createdDate')).getAttributes();
    jestExpect(Date.parse(createdDateUpdateAttributes.label)).toEqual(Date.parse('2024-10-27T22:29:00+05:00'));
    // lastModifiedDate
    await scrollTo('lastModifiedDate', 'userPropertiesDetailScrollView');
    const lastModifiedDateUpdateAttributes = await element(by.id('lastModifiedDate')).getAttributes();
    jestExpect(Date.parse(lastModifiedDateUpdateAttributes.label)).toEqual(Date.parse('2024-10-28T05:55:00+05:00'));

    /*
     * Delete
     */
    await scrollTo('userPropertiesDeleteButton', 'userPropertiesDetailScrollView');
    await waitThenTapButton('userPropertiesDeleteButton');
    await waitForElementToBeVisibleById('userPropertiesDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('userPropertiesScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
