import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Notiflix from 'notiflix';

import {
  selectContacts,
  selectFilter,
  selectLoading,
  selectError,
} from '../../redux/selectors';
import { fetchContacts, deleteContact } from '../../redux/operation';

import { List, Item, Btn, Name } from './ContactsList.styled';

export const ContactsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const filterContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (error) {
    Notiflix.Notify.failure(`Please reload the page. ${error} `);
  }

  return (
    <div>
      <h2 style={{ justifyContent: 'center', display: 'flex' }}>
        Сontact list
      </h2>
      {loading && <div>Loading contacts...</div>}

      <List>
        {filterContact.map(({ name, phone, id }) => (
          <Item key={id}>
            <Name>{name}</Name>
            <p>{phone}</p>
            <Btn
              type="button"
              onClick={() => {
                dispatch(deleteContact(id));
              }}
            >
              Delete
            </Btn>
          </Item>
        ))}
      </List>
    </div>
  );
};
