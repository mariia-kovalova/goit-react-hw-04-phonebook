import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Form, Wrap } from './ContactForm.styled';
import { Button } from 'components/Button';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export class ContactForm extends Component {
  nameInputId = nanoid();
  numberInputId = nanoid();

  state = { ...INITIAL_STATE };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ id: nanoid(), ...this.state });
    this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, number } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Wrap>
          <label htmlFor={this.nameInputId}>Name</label>
          <input
            value={name}
            onChange={this.handleChange}
            id={this.nameInputId}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Wrap>
        <Wrap>
          <label htmlFor={this.numberInputId}>Number</label>
          <input
            value={number}
            onChange={this.handleChange}
            id={this.numberInputId}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Wrap>
        <Button type="submit">Add contact</Button>
      </Form>
    );
  }
}
