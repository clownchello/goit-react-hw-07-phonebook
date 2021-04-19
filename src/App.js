import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter/index';
import operations from './redux/operations';
import selectors from './redux/selectors';
import s from './App.module.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }

  render() {
    return (
      <div className={s.container}>
        <h1 className={s.mainTitle}>Phonebook</h1>
        <ContactForm />

        <h2 className={s.secondaryTitle}>Contacts</h2>

        <Filter />
        <ContactList />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contacts: selectors.getAllContacts(state),
  isLoadingContacts: selectors.getLoading(state),
  error: selectors.getError(state),
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(operations.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
