import React from 'react';
import { useDispatch } from 'react-redux';

import { setFilter } from 'redux/filterSlice';

import { FilterDiv, TitleForLabel, Input } from './FindContactsImput.styled';

export const FindContactsInput = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2 style={{ justifyContent: 'center', display: 'flex' }}>
        Contact search
      </h2>
      <FilterDiv>
        <TitleForLabel>Find contacts by name...</TitleForLabel>
        <Input
          name="filter"
          type="text"
          onChange={event => dispatch(setFilter(event.currentTarget.value))}
        />
      </FilterDiv>
    </div>
  );
};
