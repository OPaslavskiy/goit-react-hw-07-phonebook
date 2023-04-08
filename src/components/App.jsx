import React from 'react';
import { Layout } from '../Layout';
import { GlobalStyle } from '../GlobalStyle';

import { AddContactForm } from './AddContactForm/AddContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { FindContactsInput } from './FindContactsImput/FindContactsImput';

export const App = () => {
  return (
    <Layout>
      <GlobalStyle />
      <h1>Phonebook</h1>
      <AddContactForm />
      <FindContactsInput />
      <ContactsList />
    </Layout>
  );
};
