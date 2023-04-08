import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Formik } from 'formik';
import { object, string } from 'yup';
import Notiflix from 'notiflix';

import { addContact } from '../../redux/operation';
import { selectContacts, selectError } from '../../redux/selectors';

import {
  FormSection,
  Input,
  Btn,
  TitleForForm,
  ErrorM,
} from './AddContactForm.styled';

const phoneRegExp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const userSchema = object({
  name: string().required().min(2).max(30),
  phone: string().matches(
    phoneRegExp,
    'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
  ),
});

export const AddContactForm = () => {
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  function handleSubmit(values, { resetForm }) {
    const isName = contacts.some(
      contact => contact.name.toLowerCase() === values.name.toLowerCase()
    );

    if (isName) {
      Notiflix.Notify.info(`${values.name} is already in contacts`);
      return;
    } else {
      dispatch(addContact(values));
      resetForm();
    }
  }

  if (error) {
    Notiflix.Notify.failure(`${error}`);
  }

  return (
    <div>
      <h2
        style={{ justifyContent: 'center', display: 'flex', marginTop: '30px' }}
      >
        Create a contact
      </h2>
      <Formik
        initialValues={{ name: '', phone: '' }}
        onSubmit={handleSubmit}
        validationSchema={userSchema}
      >
        <FormSection>
          <TitleForForm>Name</TitleForForm>
          <Input type="text" name="name" required></Input>
          <ErrorM name="name" component="div" />
          <TitleForForm>Phone</TitleForForm>
          <Input type="tel" name="phone" required></Input>
          <ErrorM name="phone" component="div" />
          <Btn type="submit">Add contact</Btn>
        </FormSection>
      </Formik>
    </div>
  );
};
