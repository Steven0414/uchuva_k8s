FROM node:alpine

WORKDIR /test-project

RUN npm install --save selenium-webdriver@3.6.0
RUN npm install --save mocha
RUN npm install --save chai
RUN npm install --save z-schema
RUN npm install --save supertest
RUN npm install -g mocha

# Important for selenium testing
RUN npm install -g chromedriver

ADD ./ /test-project

WORKDIR /test-project/

CMD ["mocha","./*.js"]
