// Agregar un evento de cambio al select de tipo de datos
typeDataSelect.addEventListener('change', () => {
    // Obtener el tipo de datos seleccionado
    const dataType = typeDataSelect.value;
    const cities = {
        'Albacete': '02003',
        'Almería': '04013',
        'Álava': '01001',
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
  
    // Verificar si el tipo de datos es "Nivel del Polen"
    if (dataType === 'nivel-polen') {
      // Agregar un evento de cambio al select de ciudades
      citySelect.addEventListener('change', () => {
        // Obtener la ciudad seleccionada
        const city = citySelect.value;
        const cityCode = cities[city];
  
        
        const weatherPromise = fetch(`https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/${cityCode}/?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpc2FhY2dsMTcxQGdtYWlsLmNvbSIsImp0aSI6IjQ2MDE2ZjM1LTk5OTMtNGExOC05N2I1LTNkYWQzYWQ5YjMzZiIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNjgwOTUzNTc5LCJ1c2VySWQiOiI0NjAxNmYzNS05OTkzLTRhMTgtOTdiNS0zZGFkM2FkOWIzM2YiLCJyb2xlIjoiIn0.V8aM7wP_togdxt7j74Wb5TS5iHi9NvXqY0Ebycu4YaA`)
          .then(response => response.json())
          .then(data => {
            const datosUrl = data.datos;
            return fetch(datosUrl);
          })
          .then(response => response.json());
  
        
        const airQualityPromise = fetch(`https://api.openaq.org/v1/latest?city=${city}`)
          .then(response => response.json());
  
        
        Promise.all([weatherPromise, airQualityPromise])
          .then(([weatherData, airQualityData]) => {
            
            
            const humidityRelativeMaxPolen = weatherData[0].prediccion.dia[0].humedadRelativa.maxima;
            const temperatureMaxPolen = weatherData[0].prediccion.dia[0].temperatura.maxima;
            const probPrecipitacionPolen = weatherData[0].prediccion.dia[0].probPrecipitacion[2].value;
  
            // Procesar la información sobre la calidad del aire
            const pm10 = airQualityData.results[0].measurements.find(measurement => measurement.parameter === 'pm10');
            const pm25 = airQualityData.results[0].measurements.find(measurement => measurement.parameter === 'pm25');
            const pm10Value = pm10 ? pm10.value : null;
            const pm25Value = pm25 ? pm25.value : null;
  
            // Calcular el nivel de polen en función de las condiciones climáticas y la calidad del aire
            let pollenLevel = '';
            let recommendations = '';

            if (pm10Value > 75 || pm25Value > 50) {
                pollenLevel = 'Muy alto';
                recommendations = 'Las condiciones son desfavorables para los alérgicos al polen. Evita salir al aire libre, mantén las ventanas cerradas y utiliza un purificador de aire.';
              } else if (temperatureMaxPolen > 35 && humidityRelativeMaxPolen < 20) {
                pollenLevel = 'Extremadamente alto';
                recommendations = 'Las condiciones son extremadamente desfavorables. Evita salir al aire libre si eres alérgico al polen, mantén las ventanas cerradas, utiliza un purificador de aire y considera tomar medicación si es necesario.';
              } else if (pm10Value > 50 || pm25Value > 25) {
                pollenLevel = 'Medio';
                recommendations = 'Si eres sensible al polen, considera limitar tu tiempo al aire libre y cerrar las ventanas.';
              } else if (temperatureMaxPolen > 30 && humidityRelativeMaxPolen < 30) {
                pollenLevel = 'Alto';
                recommendations = 'Evita actividades al aire libre si eres alérgico al polen. Mantén las ventanas cerradas y considera utilizar un purificador de aire en interiores.';
              } else if (probPrecipitacionPolen > 60) {
                pollenLevel = 'Bajo';
                recommendations = 'Las precipitaciones reducen los niveles de polen. Disfruta del aire libre pero ten precaución con la lluvia.';
              } else {
                pollenLevel = 'Muy Bajo';
                recommendations = 'Las condiciones son favorables, disfruta del aire libre.';
              }
  
            
  
            // Mostrar el nivel de polen en el contenedor
            resultsContainer.innerHTML = `
              <p>Nivel de polen: ${pollenLevel}</p>
              <p>Recomendaciones: ${recommendations}</p>
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
  