import { Component } from 'react';
import { save, load } from 'utils';
import { MainTitle } from './Phonebook.styled';
import { Section } from 'components/Section';
import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';

const STORAGE_KEY = 'contacts';

export class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = load(STORAGE_KEY);
    this.setState({ contacts });
  }

  componentDidUpdate(_, { contacts }) {
    if (contacts !== this.state.contacts) {
      save(STORAGE_KEY, this.state.contacts);
    }
  }

  handleSubmit = addedContact => {
    const isInContacts = this.state.contacts.find(
      ({ name }) => name === addedContact.name
    );
    if (isInContacts) {
      return alert(`${addedContact.name} is aready in contacts.`);
    }
    this.setState(({ contacts }) => ({
      contacts: [...contacts, addedContact],
    }));
  };

  handleChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  selectContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();
    const regExp = new RegExp(normalizedFilter, 'gi');
    return contacts.filter(({ name }) =>
      name.toLocaleLowerCase().match(regExp)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.selectContacts();

    return (
      <>
        <MainTitle>Phonebook</MainTitle>
        <Section>
          <ContactForm onSubmit={this.handleSubmit} />
        </Section>
        <Section title="Contacts">
          <Filter onChange={this.handleChange} value={filter} />
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={this.deleteContact}
          />
        </Section>
      </>
    );
  }
}
