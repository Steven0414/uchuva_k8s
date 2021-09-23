var assert = require('assert');
var selenium = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var driver;

const timeOut = 15000;
// http://testerstories.com/2016/02/javascript-with-selenium-webdriver-and-mocha/

// java -jar selenium-server-standalone-2.45.0.jar

//test.before(function() {
before(function() {
  this.timeout(timeOut);
  driver = new selenium.Builder().
      withCapabilities(selenium.Capabilities.chrome()).
      //usingServer('http://localhost:4444/wd/hub').
      build();
  //driver.manage().setTimeouts( { implicit: 10000 } );
  driver.get("http://192.168.99.101/");
});

//test.after(function() {
after(function() {
  driver.quit();
});

//test.afterEach(function() {
afterEach(function() {  
  driver.manage().deleteAllCookies();
});

//test.describe.skip('Title is uchuva', function() {
describe.skip('Title is uchuva', function() {
  //test.it('provides no default weight', function() {
  it('provides no default weight', function() {
    driver.getTitle().then(function(title) {
        assert.equal(title, "Uchuva");
    });
  });

  //test.it('H1 title is uchuva', function() {
  it('H1 title is uchuva', function() {
    driver.findElement(selenium.By.id('titulo')).getText().then(function(weight) {
      assert.equal(weight, "Uchuva");
    });
  });
});
