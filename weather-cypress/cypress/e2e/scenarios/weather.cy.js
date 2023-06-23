///<reference types = 'Cypress'/>

import Weather from "../pages/weather-page"

const weather = new Weather();

// Accessing url from env file
const testUrl = Cypress.env('weather_url')

describe('Automated Test Cases for Open Weather Website', () => {

  beforeEach(() => {
    // Visits open weather url
    cy.visit(testUrl)
    .wait(3500)
  })

  it('Search for a city', () => {
    // Access search bar
    weather.search.toGetSearchedCity('Lahore')
    weather.search.toCheckSearchedCity()
    .should('be.visible')
    .should('contain.text', 'Lahore')
  })

  it('Negative search for a city', () => {
    // Access search bar and type false name
    weather.search.typeToSearchCity('Lahoren')
    weather.cityNotFoundNotification()
    .should('be.visible')
    .should('contain.text', `Not found. To make search more precise put the city's name, comma, 2-letter country code (ISO3166).`)
    weather.widgetNotification()
    .should('be.visible')
    .should('contain.text', 'No results for Lahoren')
  })

  it('Check weather conditions', () => {
    // Access search bar
    weather.search.toGetSearchedCity('Lahore')
    weather.search.toCheckSearchedCity()
    .should('be.visible')
    .should('contain.text', 'Lahore')
    .wait(1000)

    // To check current date
    weather.toCheckCurrentDate()

    // To check current temperature
    weather.getCurrentTemperature()
    .then((value) => {
      // Log to check value and to get actual temperature
      // cy.log('This is temperature', value)
      weather.toCheckCurrentTemperature()
      .should('be.visible')
      .should('contain.text', value[0].childNodes[0].data)
    })

    // To check weather conditions
    weather.getWeatherConditions()
    .then((value) => {
      // Log to check weather conditions
      // cy.log('This is weather conditions', value)
      weather.getWeatherConditions()
      .should('be.visible')
      .should('contain.text', value[0].childNodes[0].data)
    })
  })

  it('Check Weather forecast', () => {
    // Access search bar
    weather.search.toGetSearchedCity('Lahore')
    weather.search.toCheckSearchedCity()
    .should('be.visible')
    .should('contain.text', 'Lahore')
    
    // Access weather forecast
    weather.getWeatherForecast()
    .then((value) => {
      // Log to check All Forecast Data
      // cy.log('Forecast value', value)
      weather.getWeatherForecast()
      .should('be.visible')
      .should('contain.text', value[0].childNodes[1].childNodes[0].childNodes[1].data)
      .should('contain.text', value[0].childNodes[2].childNodes[1].data)
      // Humidity
      .should('contain.text', `Humidity:${value[0].childNodes[3].childNodes[1].data}`)
      // UV
      .should('contain.text', `UV:${value[0].childNodes[4].childNodes[1].data}`)
      // Dew Point
      .should('contain.text', `Dew point:${value[0].childNodes[5].childNodes[1].data}`)
      // Visibility
      .should('contain.text', `Visibility:${value[0].childNodes[6].childNodes[1].data}`)
    })
  })
})