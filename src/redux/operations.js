import axios from 'axios';
import {
  fetchContactRequest,
  fetchContactSuccess,
  fetchContactError,
  addContactRequest,
  addContactSucces,
  addContactError,
  deleteContactRequest,
  deleteContactSucces,
  deleteContactError,
} from './actions';

axios.defaults.baseURL = 'http://localhost:4040';

const fetchContacts = () => dispatch => {
  dispatch(fetchContactRequest());

  axios
    .get('/contacts')
    .then(({ data }) => dispatch(fetchContactSuccess(data)))
    .catch(error => dispatch(fetchContactError(error)));
};

const addContact = (name, number) => dispatch => {
  const contact = { name, number };

  dispatch(addContactRequest());

  axios
    .post('/contacts', contact)
    .then(({ data }) => dispatch(addContactSucces(data)))
    .catch(error => dispatch(addContactError(error)));
};

const deleteContact = contactId => dispatch => {
  dispatch(deleteContactRequest());

  axios
    .delete(`/contacts/${contactId}`)
    .then(() => dispatch(deleteContactSucces(contactId)))
    .catch(error => dispatch(deleteContactError(error)));
};

const operations = {
  fetchContacts,
  addContact,
  deleteContact,
};

export default operations;
