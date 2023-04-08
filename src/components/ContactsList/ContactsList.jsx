import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getContacts, getFilter } from '../../redux/selectors';
import { fetchContacts, deleteContact } from '../../redux/operation';

import { List, Item, Btn, Name } from './ContactsList.styled';

export const ContactsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const filterContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div>
      <h2 style={{ justifyContent: 'center', display: 'flex' }}>
        Сontact list
      </h2>
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
