// Agregar un evento de cambio al select de tipo de datos
typeDataSelect.addEventListener('change', () => {
    // Obtener el tipo de datos seleccionado
    const dataType = typeDataSelect.value;
    const cities = {
      'Albacete': '02003',
      'Almería': '04013',
      'Araba/Álava': '01001',
      'Alicante/Alacant': '03014',
      'Asturias': '33003',
      'Ávila': '05019',
      'Badajoz': '06015',
      'Islas Baleares': '07040',
      'Barcelona': '08019',
      'Bizkaia': '48020',
      'Burgos': '09059',
      'Cáceres': '10039',
      'Cádiz': '11012',
      'Cantabria': '39075',
      'Castellón': '12040',
      'Ceuta': '51001',
      'Ciudad Real': '13038',
      'Córdoba': '14021',
      'A Coruña': '15030',
      'Cuenca': '16069',
      'Gipuzkoa': '20069',
      'Girona': '17079',
      'Granada': '18087',
      'Guadalajara': '19087',
      'Huelva': '21041',
      'Huesca': '22120',
      'Jaén': '23050',
      'León': '24089',
      'Lugo': '27028',
      'Lleida': '25120',
      'Madrid': '28079',
      'Málaga': '29067',
      'Melilla': '52001',
      'Murcia': '30030',
      'Navarra': '31201',
      'Ourense': '32054',
      'Palencia': '34120',
      'Pontevedra': '36038',
      'La Rioja': '26089',
      'Salamanca': '37274',
      'Santa Cruz de Tenerife': '38038',
      'Segovia': '40004',
      'Sevilla': '41091',
      'Soria': '42173',
      'Tarragona': '43148',
      'Teruel': '44135',
      'Toledo': '45168',
      'Valencia': '46250',
      'Valladolid': '47186',
      'Zamora': '49275',
      'Zaragoza': '50297'
    };
  
    // Verificar si el tipo de datos es "Calidad del tiempo"
    if (dataType === 'calidad-tiempo') {
      // Agregar un evento de cambio al select de ciudades
      citySelect.addEventListener('change', () => {
        // Obtener la ciudad seleccionada
        const city = citySelect.value;
        const cityCode = cities[city];
      
        fetch(`https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/${cityCode}/?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpc2FhY2dsMTcxQGdtYWlsLmNvbSIsImp0aSI6IjQ2MDE2ZjM1LTk5OTMtNGExOC05N2I1LTNkYWQzYWQ5YjMzZiIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNjgwOTUzNTc5LCJ1c2VySWQiOiI0NjAxNmYzNS05OTkzLTRhMTgtOTdiNS0zZGFkM2FkOWIzM2YiLCJyb2xlIjoiIn0.V8aM7wP_togdxt7j74Wb5TS5iHi9NvXqY0Ebycu4YaA`)
        .then(response => response.json())
        .then(data => {
          // Utilizar la URL proporcionada en la propiedad "datos" para realizar el segundo fetch
          const datosUrl = data.datos;
          return fetch(datosUrl);
        })
        .then(response => response.json())
        .then(weatherData => {
          
          // Procesar y mostrar la información sobre humedad y temperatura
          const humidityRelativeMin = weatherData[0].prediccion.dia[0].humedadRelativa.minima;
          const humidityRelativeMax = weatherData[0].prediccion.dia[0].humedadRelativa.maxima;
          const temperatureMax = weatherData[0].prediccion.dia[0].temperatura.maxima;
          const temperatureMin = weatherData[0].prediccion.dia[0].temperatura.minima;
          const estadoCieloTemprana = weatherData[0].prediccion.dia[0].estadoCielo[2].descripcion;
          const probPrecipitacion = weatherData[0].prediccion.dia[0].probPrecipitacion[2].value;
          
          resultsContainer.innerHTML = `
           <p>Estado Cielo: ${estadoCieloTemprana}</p>
           <p>Probabilidad de precipitaciones: ${probPrecipitacion}%</p>
           <p>Temperatura minima: ${temperatureMin}°C</p>
           <p>Temperatura maxima: ${temperatureMax}°C</p>
           <p>Humedad Minima: ${humidityRelativeMin}%</p>
           <p>Humedad Maxima: ${humidityRelativeMax}%</p>
              `;
        })
        .catch(error => {
          console.log(error);
          resultsContainer.innerHTML = 'Hubo un error al buscar los resultados';
        });
    });
  } else {
    citySelect.removeEventListener('change', () => {});
    resultsContainer.innerHTML = '';
  }
});