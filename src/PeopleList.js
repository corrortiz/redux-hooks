import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

function getAllPeople() {
  return axios
    .get('https://swapi.co/api/people/')
    .catch(error => alert(`[SWPAI] ${error.stack}`));
}

const setCharacters = charactersList => ({
  type: 'SET_CHARACTERS',
  payload: charactersList,
});

function PeopleList() {
  const searchTerm = useSelector(state => state.searchTerm);
  const characters = useSelector(state => state.characters);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllPeople().then(result => dispatch(setCharacters(result.data)));
  }, [dispatch]);

  return (
    <div>
      <h1>Characters</h1>
      <h2>We are searching for: {searchTerm}</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Height</th>
          </tr>
          {characters.results &&
            characters.results.map((people, index) => {
              return (
                <tr key={index}>
                  <td>{people.name}</td>
                  <td>{people.gender}</td>
                  <td>{people.height}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default PeopleList;
