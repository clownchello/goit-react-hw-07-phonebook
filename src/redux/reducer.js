import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  // fetchContactRequest,
  fetchContactSuccess,
  fetchContactError,
  // addContactRequest,
  addContactSucces,
  addContactError,
  // deleteContactRequest,
  deleteContactSucces,
  deleteContactError,
  changeFilter,
  clearError,
} from './actions';

const initialState = {
  contacts: [],
  filter: '',
  // loading: false,
  error: null,
};

const contacts = createReducer(initialState.contacts, {
  [fetchContactSuccess]: (_, { payload }) => payload,
  [addContactSucces]: (state, { payload }) => [...state, payload],
  [deleteContactSucces]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

// const loading = createReducer(initialState.loading, {
//   [fetchContactRequest]: () => true,
//   [fetchContactSuccess]: () => false,
//   [fetchContactError]: () => false,
//   [addContactRequest]: () => true,
//   [addContactSucces]: () => false,
//   [addContactError]: () => false,
//   [deleteContactRequest]: () => true,
//   [deleteContactSucces]: () => false,
//   [deleteContactError]: () => false,
// });

const filter = createReducer(initialState.filter, {
  [changeFilter]: (_, { payload }) => payload,
});

const error = createReducer(initialState.error, {
  [fetchContactError]: (_, { payload }) => payload,
  [addContactError]: (_, { payload }) => payload,
  [deleteContactError]: (_, { payload }) => payload,
  [clearError]: () => null,
});

export default combineReducers({
  contacts,
  filter,
  // loading,
  error,
});
