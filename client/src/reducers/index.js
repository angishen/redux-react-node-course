import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({
  auth: authReducer,
  surveys: surveysReducer,
  //reduxForm must be assigned to "form" key
  form: reduxForm
});
