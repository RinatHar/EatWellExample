import product from 'app/entities/product/product.reducer';
import dailyRation from 'app/entities/daily-ration/daily-ration.reducer';
import userProperties from 'app/entities/user-properties/user-properties.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  product,
  dailyRation,
  userProperties,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
