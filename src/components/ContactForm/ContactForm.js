import React, { Component } from 'react';
import { connect } from 'react-redux';
import operations from '../../redux/operations';
import selectors from '../../redux/selectors';
import PropTypes from 'prop-types';

import s from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  static propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object),
    onSubmit: PropTypes.func,
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const { name, number } = this.state;
    e.preventDefault();

    if (name === '') {
      alert('Enter contact name, please!');
      return;
    }
    if (number === '') {
      alert('Enter concact phone, please!');
      return;
    }
    if (
      this.props.contacts.find(
        item => item.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      alert('Contact already exists!');
      return;
    }

    this.props.onSubmit(name, number);
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <>
        <form className={s.contactForm} onSubmit={this.handleSubmit}>
          <label className={s.contactLabel} htmlFor={name}>
            Name
          </label>
          <input
            className={s.contactInput}
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={this.handleChange}
          />

          <label className={s.contactLabel} htmlFor={number}>
            Number
          </label>
          <input
            className={s.contactInput}
            type="text"
            name="number"
            id="number"
            value={number}
            onChange={this.handleChange}
            // required
          />

          <button className={s.buttonAdd} type="submit">
            Add contact
          </button>
        </form>
      </>
    );
  }
}

const mapStateToProps = state => ({
  contacts: selectors.getAllContacts(state),
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (name, number) => dispatch(operations.addContact(name, number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
