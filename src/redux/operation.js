import { createAsyncThunk } from '@reduxjs/toolkit';
import Notiflix from 'notiflix';
import axios from 'axios';

axios.defaults.baseURL = 'https://642db542bf8cbecdb40d1b92.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContsact',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${id}`);
      Notiflix.Notify.info(`The contact deleted`);
      return id;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contsacts/addContact',
  async (values, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', {
        name: values.name,
        phone: values.phone,
      });
      Notiflix.Notify.success(`${values.name} added to contact books`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
