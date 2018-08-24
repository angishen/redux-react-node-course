import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';


export default combineReducers({
  auth: authReducer,
  //reduxForm must be assigned to "form" key
  form: reduxForm
});
