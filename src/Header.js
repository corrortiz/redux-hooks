import React, { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const initialState = { search: '' };
const setSearchTermAction = searchTerm => ({
  type: 'SET_SEARCH_TERM',
  payload: searchTerm,
});

const setCharacters = charactersList => ({
  type: 'SET_CHARACTERS',
  payload: charactersList,
});

function lookForPeople(name) {
  return axios
    .get(`https://swapi.co/api/people/?search=${name}`)
    .catch(error => alert(`[SWPAI] ${error.stack}`));
}

function Header() {
  const [{ search }, localDispatch] = useReducer(reducer, initialState);
  const dispatch = useDispatch();

  function reducer(state, action) {
    switch (action.type) {
      case 'SEARCH_CHANGE':
        return { ...state, search: action.payload };
      case 'SET_SEARCH_TERM':
        return { ...state, search: '' };
      default:
        throw new Error();
    }
  }

  const handleChange = event => {
    localDispatch({ type: 'SEARCH_CHANGE', payload: event.target.value });
  };

  const handleOnSubmit = event => {
    event.preventDefault();
    dispatch(setSearchTermAction(search));
    lookForPeople(search).then(results =>
      dispatch(setCharacters(results.data)),
    );
    localDispatch({ type: 'SET_SEARCH_TERM', payload: search });
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <label htmlFor="search">Search</label>
      <input type="text" name="search" value={search} onChange={handleChange} />
    </form>
  );
}

export default Header;
