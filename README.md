## Cheat Sheet

* Clone this repo
* Run `npm install`
* To run test, `npm test test/*.js`

## Takeaways:

Some information and takewaways from trying different modules.

### Mochawesome reporter

* If there are multiple assertions on a single test block that is failing, only the first one is reported on the mochawesome reporter
* 

"test": "NOW=$(date \"+%s\") && ./node_modules/.bin/mocha --reporter mochawesome --reporter-options reportFilename=test-${NOW}"
