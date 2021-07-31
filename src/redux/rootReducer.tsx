import { combineReducers } from 'redux';
import authReducer from './ducks/AuthSlice';
import commentParentsReducer from './ducks/commentParentsSlice'; //commentsReducer === commentsSlice
import revistasReducer from './ducks/revistasSlice';
// import threadsReducer from './ducks/threadsSlice';
import revistaNovidadeReducer from './ducks/revistaNovidadeSlice';
import revistaIndividualReducer from './ducks/revistaIndividualSlice';
import commentChildReducer from './ducks/commentChildSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  commentParents: commentParentsReducer,
  revistas: revistasReducer,
  // threads: threadsReducer,
  revistaNovidade: revistaNovidadeReducer,
  revistaIndividual: revistaIndividualReducer,
  commentChild: commentChildReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
