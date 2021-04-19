import { createSelector } from '@reduxjs/toolkit';

const getLoading = state => state.phonebook.loading;

const getFilter = state => state.phonebook.filter;

const getAllContacts = state => state.phonebook.contacts;

const getError = state => state.phonebook.error;

//Без мемоизации
// const getVisibleContacts = state => {
//   const contacts = getAllContacts(state);
//   const filter = getFilter(state);
//   const normalizedFilter = filter.toLowerCase();

//   return contacts.filter(({ name }) =>
//     name.toLowerCase().includes(normalizedFilter),
//   );
// };

//С мемоизацией

const getVisibleContacts = createSelector(
  [getAllContacts, getFilter],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter),
    );
  },
);

const selectors = {
  getLoading,
  getFilter,
  getVisibleContacts,
  getAllContacts,
  getError,
};

export default selectors;
