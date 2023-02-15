import { useState, useEffect } from 'react';
import { save, load } from 'utils';
import { MainTitle } from './App.styled';
import { Section } from 'components/Section';
import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';

const STORAGE_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(load(STORAGE_KEY));
  const [filter, setFilter] = useState('');

  useEffect(() => {
    save(STORAGE_KEY, contacts);
  }, [contacts]);

  const handleSubmit = addedContact => {
    const isInContacts = contacts.find(
      ({ name }) => name === addedContact.name
    );
    if (isInContacts) {
      return alert(`${addedContact.name} is aready in contacts.`);
    }
    setContacts(contacts => [...contacts, addedContact]);
  };

  const handleChange = e => {
    setFilter(e.currentTarget.value);
  };

  const selectContacts = () => {
    const normalizedFilter = filter.toLocaleLowerCase();
    const regExp = new RegExp(normalizedFilter, 'gi');
    return contacts.filter(({ name }) =>
      name.toLocaleLowerCase().match(regExp)
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts => contacts.filter(({ id }) => id !== contactId));
  };

  return (
    <>
      <MainTitle>Phonebook</MainTitle>
      <Section>
        <ContactForm onSubmit={handleSubmit} />
      </Section>
      <Section title="Contacts">
        <Filter onChange={handleChange} value={filter} />
        <ContactList
          contacts={selectContacts()}
          onDeleteContact={deleteContact}
        />
      </Section>
    </>
  );
};
