const { showWeatherData } = require('../script');

// Create a mock data object for testing
const mockData = {
  current: {
    humidity: 75,
    pressure: 1014,
    sunrise: 1669374000, // Replace with a valid timestamp
    sunset: 1669417200, // Replace with a valid timestamp
    wind_speed: 5.2,
  },
  timezone: 'America/New_York',
  lat: 40.7128,
  lon: -74.0060,
  daily: [
    // Replace with a valid array of weather data objects for different days
  ],
};

// Create a mock DOM for testing (using JSDOM)
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><html><head></head><body><div id="time"></div><div id="date"></div><div id="current-weather-items"></div><div id="time-zone"></div><div id="country"></div><div id="weather-forecast"></div><div id="current-temp"></div></body></html>');
global.document = dom.window.document;

// Run the test
test('showWeatherData updates DOM elements correctly', () => {
  // Call the function with the mock data
  showWeatherData(mockData);

  // Test if the DOM elements are updated correctly
  expect(document.getElementById('time-zone').innerHTML).toBe('America/New_York');
  expect(document.getElementById('country').innerHTML).toBe('40.7128N-74.0060E');
  // Add more tests for other DOM elements
});