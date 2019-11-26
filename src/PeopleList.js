import React, { useState, useEffect } from 'react';
import axios from 'axios';

function getAllPeople() {
  return axios
    .get('https://swapi.co/api/people/')
    .catch(error => alert(`[SWPAI] ${error.stack}`));
}

function PeopleList() {
  const [listOfPeople, setListOfPeople] = useState([]);

  useEffect(() => {
    getAllPeople().then(result => setListOfPeople(result.data));
  }, []);

  return (
    <div>
      <div>cont: {listOfPeople.count}</div>
      <div>
        next: <a href={listOfPeople.next}>{listOfPeople.next}</a>
      </div>
      <h1>Characters</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Gender</th>
          <th>Height</th>
        </tr>
        {listOfPeople.results &&
          listOfPeople.results.map(people => {
            return (
              <tr>
                <td>{people.name}</td>
                <td>{people.gender}</td>
                <td>{people.height}</td>
              </tr>
            );
          })}
      </table>
    </div>
  );
}

export default PeopleList;
