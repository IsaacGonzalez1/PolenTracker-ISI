// Agregar un evento de cambio al select de tipo de datos
typeDataSelect.addEventListener('change', () => {
    // Obtener el tipo de datos seleccionado
    const dataType = typeDataSelect.value;
    const cities = {
      'Agullana': '17001',
      'Alcanar': '43004',
      'Alcover': '43005',
      'Ametlla de Mar': '43006',
      'Amposta': '43008',
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
      'Badalona': '08015',
      'Barberá del Valles': '08016',
      'Begur': '17026',
      'Bellver de Cerdanya': '25037',
      'Berga': '08017',
      'Cáceres': '10039',
      'Cádiz': '11012',
      'Cantabria': '39075',
      'Castellón': '12040',
      'Carboneras': '04023',
      'CCAA Cataluña': 'ccaa09',
      'CCAA Com. Valenciana': 'ccaa10',
      'CCAA Galicia': 'ccaa12',
      'CCAA Pais Vasco': 'ccaa16',
      'Constanti': '43043',
      'Cubelles': '08070',
      'Ceuta': '51001',
      'Ciudad Real': '13038',
      'Córdoba': '14021',
      'A Coruña': '15030',
      'Cuenca': '16069',
      'Gipuzkoa': '20069',
      'Girona': '17079',
      'Granada': '18087',
      'Guadalajara': '19087',
      'Gandesa': '43061',
      'Gava': '08088',
      'Granollers': '08096',
      'Guiamets': '43067',
      'Huelva': '21041',
      'Hospitalet de Llobregat': '08108',
      'Huesca': '22120',
      'Igualada': '08120',
      'Illes Balears': '07040',
      'Juneda': '25106',
      'Jaén': '23050',
      'León': '24089',
      'Lugo': '27028',
      'Lleida': '25120',
      'Las Palmas': '35016',
      'Manlleu': '08123',
      'Manresa': '08125',
      'Marbella': '29067',
      'Martorell': '08127',
      'Mataró': '08128',
      'Mollet del Valles': '08132',
      'Montcada i Reixac': '08133',
      'Montseny': '08134',
      'Madrid': '28079',
      'Málaga': '29067',
      'Melilla': '52001',
      'Murcia': '30030',
      'Navarra': '31201',
      'Niebla': '21051',
      'Pallejá': '08157',
      'Pardines': '17112',
      'Perafort': '43096',
      'Ponts': '25135',
      'Prat de Llobregat': '08162',
      'Ourense': '32054',
      'Palencia': '34120',
      'Pontevedra': '36038',
      'La Rioja': '26089',
      'Reus': '43123',
      'Rubí': '08174',
      'Sabadell': '08175',
      'Santa Coloma de Gramenet': '08176',
      'Sant Adriá de Besos': '08177',
      'Santa Margarida i els Monjos': '08178',
      'Santa Maria de Palautordera': '08179',
      'Sant Andreu de la Barca': '08180',
      'Santa Pau': '17161',
      'Santa Perpétua de Mogoda': '08181',
      'Sant Celoni': '08183',
      'Sant Cugat del Valles': '08184',
      'Sant Esteve de la Sarga': '25170',
      'Sant Vicenç dels Horts': '08191',
      'Senia': '43141',
      'Sort': '25171',
      'Terrasa': '08220',
      'Tona': '08225',
      'Valencia': '46250',
      'Vandellos i l\'Hospitalet de l': '43150',
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
      'Vic': '08296',
      'Viladecans': '08297',
      'Vilafranca del Penedes': '08298',
      'Vilanova i la Geltru': '08299',
      'Vila-seca': '43153',
      'Villanueva del Arzobispo': '23095',
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
  