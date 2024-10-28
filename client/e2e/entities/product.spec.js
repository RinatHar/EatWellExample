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

describe('Product Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToProductScreen();
  });

  const navigateToProductScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('productEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('productEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('productScreen');
  };

  it('should allow you to create, update, and delete the Product entity', async () => {
    await expect(element(by.id('productScreen'))).toBeVisible();

    /*
     * Create Product
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('productEditScrollView');
    // name
    await scrollTo('nameInput', 'productEditScrollView');
    await element(by.id('nameInput')).replaceText('phew');
    await element(by.id('nameInput')).tapReturnKey();
    // photo
    await scrollTo('photoInput', 'productEditScrollView');
    await element(by.id('photoInput')).replaceText('expansion');
    await element(by.id('photoInput')).tapReturnKey();
    // calories
    await scrollTo('caloriesInput', 'productEditScrollView');
    await element(by.id('caloriesInput')).replaceText('25102.91');
    await element(by.id('caloriesInput')).tapReturnKey();
    // protein
    await scrollTo('proteinInput', 'productEditScrollView');
    await element(by.id('proteinInput')).replaceText('22977.93');
    await element(by.id('proteinInput')).tapReturnKey();
    // fats
    await scrollTo('fatsInput', 'productEditScrollView');
    await element(by.id('fatsInput')).replaceText('4347.73');
    await element(by.id('fatsInput')).tapReturnKey();
    // carbohydrates
    await scrollTo('carbohydratesInput', 'productEditScrollView');
    await element(by.id('carbohydratesInput')).replaceText('26887.2');
    await element(by.id('carbohydratesInput')).tapReturnKey();
    // createdDate
    await scrollTo('createdDateInput', 'productEditScrollView');
    await setDateTimePickerValue('createdDateInput', '2024-10-27T22:03:00+05:00', 'ISO8601');
    // lastModifiedDate
    await scrollTo('lastModifiedDateInput', 'productEditScrollView');
    await setDateTimePickerValue('lastModifiedDateInput', '2024-10-27T20:05:00+05:00', 'ISO8601');
    // save
    await scrollTo('submitButton', 'productEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Product - validate the creation
     */
    await waitForElementToBeVisibleById('productDetailScrollView');
    // name
    await scrollTo('name', 'productDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('phew');
    // photo
    await scrollTo('photo', 'productDetailScrollView');
    await expect(element(by.id('photo'))).toHaveLabel('expansion');
    // calories
    await scrollTo('calories', 'productDetailScrollView');
    await expect(element(by.id('calories'))).toHaveLabel('25102.91');
    // protein
    await scrollTo('protein', 'productDetailScrollView');
    await expect(element(by.id('protein'))).toHaveLabel('22977.93');
    // fats
    await scrollTo('fats', 'productDetailScrollView');
    await expect(element(by.id('fats'))).toHaveLabel('4347.73');
    // carbohydrates
    await scrollTo('carbohydrates', 'productDetailScrollView');
    await expect(element(by.id('carbohydrates'))).toHaveLabel('26887.2');
    // createdDate
    await scrollTo('createdDate', 'productDetailScrollView');
    const createdDateCreateAttributes = await element(by.id('createdDate')).getAttributes();
    jestExpect(Date.parse(createdDateCreateAttributes.label)).toEqual(Date.parse('2024-10-27T22:03:00+05:00'));
    // lastModifiedDate
    await scrollTo('lastModifiedDate', 'productDetailScrollView');
    const lastModifiedDateCreateAttributes = await element(by.id('lastModifiedDate')).getAttributes();
    jestExpect(Date.parse(lastModifiedDateCreateAttributes.label)).toEqual(Date.parse('2024-10-27T20:05:00+05:00'));

    /*
     * Update Product
     */
    await scrollTo('productEditButton', 'productDetailScrollView');
    await tapFirstElementByLabel('Product Edit Button');
    await waitForElementToBeVisibleById('productEditScrollView');
    // name
    await scrollTo('nameInput', 'productEditScrollView');
    await element(by.id('nameInput')).replaceText('phew');
    await element(by.id('nameInput')).tapReturnKey();
    // photo
    await scrollTo('photoInput', 'productEditScrollView');
    await element(by.id('photoInput')).replaceText('expansion');
    await element(by.id('photoInput')).tapReturnKey();
    // calories
    await scrollTo('caloriesInput', 'productEditScrollView');
    await element(by.id('caloriesInput')).replaceText('32691.48');
    await element(by.id('caloriesInput')).tapReturnKey();
    // protein
    await scrollTo('proteinInput', 'productEditScrollView');
    await element(by.id('proteinInput')).replaceText('5390.83');
    await element(by.id('proteinInput')).tapReturnKey();
    // fats
    await scrollTo('fatsInput', 'productEditScrollView');
    await element(by.id('fatsInput')).replaceText('6380.43');
    await element(by.id('fatsInput')).tapReturnKey();
    // carbohydrates
    await scrollTo('carbohydratesInput', 'productEditScrollView');
    await element(by.id('carbohydratesInput')).replaceText('30038.29');
    await element(by.id('carbohydratesInput')).tapReturnKey();
    // createdDate
    await scrollTo('createdDateInput', 'productEditScrollView');
    await setDateTimePickerValue('createdDateInput', '2024-10-28T04:19:00+05:00', 'ISO8601');
    // lastModifiedDate
    await scrollTo('lastModifiedDateInput', 'productEditScrollView');
    await setDateTimePickerValue('lastModifiedDateInput', '2024-10-27T20:59:00+05:00', 'ISO8601');
    // save
    await scrollTo('submitButton', 'productEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Product - validate the update
     */
    await waitForElementToBeVisibleById('productDetailScrollView');
    // name
    await scrollTo('name', 'productDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('phew');
    // photo
    await scrollTo('photo', 'productDetailScrollView');
    await expect(element(by.id('photo'))).toHaveLabel('expansion');
    // calories
    await scrollTo('calories', 'productDetailScrollView');
    await expect(element(by.id('calories'))).toHaveLabel('32691.48');
    // protein
    await scrollTo('protein', 'productDetailScrollView');
    await expect(element(by.id('protein'))).toHaveLabel('5390.83');
    // fats
    await scrollTo('fats', 'productDetailScrollView');
    await expect(element(by.id('fats'))).toHaveLabel('6380.43');
    // carbohydrates
    await scrollTo('carbohydrates', 'productDetailScrollView');
    await expect(element(by.id('carbohydrates'))).toHaveLabel('30038.29');
    // createdDate
    await scrollTo('createdDate', 'productDetailScrollView');
    const createdDateUpdateAttributes = await element(by.id('createdDate')).getAttributes();
    jestExpect(Date.parse(createdDateUpdateAttributes.label)).toEqual(Date.parse('2024-10-28T04:19:00+05:00'));
    // lastModifiedDate
    await scrollTo('lastModifiedDate', 'productDetailScrollView');
    const lastModifiedDateUpdateAttributes = await element(by.id('lastModifiedDate')).getAttributes();
    jestExpect(Date.parse(lastModifiedDateUpdateAttributes.label)).toEqual(Date.parse('2024-10-27T20:59:00+05:00'));

    /*
     * Delete
     */
    await scrollTo('productDeleteButton', 'productDetailScrollView');
    await waitThenTapButton('productDeleteButton');
    await waitForElementToBeVisibleById('productDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('productScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
