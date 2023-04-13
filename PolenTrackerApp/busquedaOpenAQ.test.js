const { describe, test, expect } = require('@jest/globals');
const { fetchData } = require('./BusquedaScriptOpenaq');

const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

global.window = window;
global.document = window.document;

describe('fetchData', () => {
  let citySelect;
  let typeDataSelect;
  let resultsContainer;

  beforeEach(() => {
    // Crear los elementos necesarios antes de cada prueba
    citySelect = document.createElement('select');
    citySelect.setAttribute('id', 'city-select');
    document.body.appendChild(citySelect);

    typeDataSelect = document.createElement('select');
    typeDataSelect.setAttribute('id', 'typeData-select');
    document.body.appendChild(typeDataSelect);

    resultsContainer = document.createElement('div');
    resultsContainer.setAttribute('id', 'results');
    document.body.appendChild(resultsContainer);
  });

  afterEach(() => {
    // Eliminar los elementos creados después de cada prueba
    citySelect.remove();
    typeDataSelect.remove();
    resultsContainer.remove();
  });

  test('should return data for Madrid', async () => {
    const data = await fetchData('Madrid');
    expect(data.results[0].city).toBe('Madrid');
  });

  test('should return error message for non-existent city', async () => {
    const data = await fetchData('nonexistentcity');
    expect(data).toBe('Hubo un error al buscar los resultados');
  });
});




