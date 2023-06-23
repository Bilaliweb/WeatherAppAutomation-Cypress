const dayjs = require('dayjs')

class Weather {
    search = {
        // Functions to access search bar and to search city
        toSearchCity(){
            return cy.get('[data-v-68963a64].search-block')
        },
        
        typeToSearchCity(city){
            return this.toSearchCity()
            .should('be.visible')
            .type(`${city} {enter}`)
        },
        
        toGetSearchedCity(city){
            this.typeToSearchCity(city)
            .get('.search-dropdown-menu li')
            .should('be.visible')
            .click()
            .wait(1200)
        },
        
        toCheckSearchedCity(){
            return cy.get('[data-v-3e6e9f12].current-container')
        }
    }

    widgetNotification(){
        return cy.get('[data-v-3e6e9f12].widget-notification')
    }

    cityNotFoundNotification(){
        return cy.get('[data-v-68963a64].search-block .not-found')
    }

    toCheckCurrentDate(){
        return cy.get('[data-v-3e6e9f12].orange-text')
        .should('contain.text', dayjs().format('MMM DD, hh:mma'))
    }

    toCheckCurrentTemperature(){
        return cy.get('[data-v-3e6e9f12].current-temp')
    }

    getCurrentTemperature(){
        return this.toCheckCurrentTemperature()
        .find('[data-v-3e6e9f12].heading')
    }

    getWeatherConditions(){
        return cy.get('[data-v-3e6e9f12].bold')
    }

    getWeatherForecast(){
        return cy.get('[data-v-3e6e9f12] .weather-items')
    }
}

export default Weather;