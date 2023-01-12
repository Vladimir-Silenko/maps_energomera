import React from 'react';
import MapContainer from './maps/MapGL';
import axios from 'axios'
import { useEffect, useState } from 'react';

function App() {

  // сюда будем складывать данные
  const [data, setData] = useState([])

  // ++++++++++++++++++++++++++++++++++

  useEffect(() => {
    // запрашиваем геоданные
    const response = axios({
      method: 'get',
      url: 'http://agro.energomera.ru:3060/api/field?lastChangeDate=2022-01-01T10:00:00.000&skip=0&take=100'
    })
      //обрабатываем ответ
      .then(response => {
        setData(response.data)
        console.log(response)
      });


  }, [null])

  // ++++++++++++++++++++++++++++++++++
  return (

    <MapContainer data={data} />

  );
}

export default App;
