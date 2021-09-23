# Testing
## Load Testing
Execute the test using K6/LoadImpact.

### Obtain the Uchuva's exposed IP
Before the execution, ensure that you have changed the IP for the exposed IP of Uchuva in loadtest.js.
```bash
minikube ip
```
### Test in a Docker Container
```bash
sudo docker run -i loadimpact/k6 run -< loadtest.js
```
## Integration/Regression Test
These tests are executed through many libraries (I.E. Mocha, Chai, Selenium, etc.). There are two Docker containers disposed to execute the test scripts.

### Obtain the Uchuva's exposed IP
Before the execution, ensure that you have changed the IP for the exposed IP of Uchuva in all the scripts in Selenium and Regression folders.
```bash
minikube ip
```

### Create the test user
Go to /register and create the user with username: test, and password: test

### Build and run the Docker containers
Once you have modified the scripts, then build the container with the scripts in it.

#### For Selenium tests
```bash
cd test
sudo docker build -t uchuva_selenium .
sudo docker run -i uchuva_selenium
```
#### For Regression tests
```bash
cd test
cd regression
sudo docker build -t uchuva_regression .
sudo docker run -i uchuva_regression
```
