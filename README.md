# HEIG-VD_labo05_HTTP-infra
## Objectives
The first objective of this lab is to get familiar with software tools that will allow us to build a complete web infrastructure. By that, we mean that we will build an environment that will allow us to serve static and dynamic content to web browsers. To do that, we will see how to configure a Web server and a reverse proxy. We will also see that express.js is a JavaScript framework that makes it very easy to write dynamic web apps.

The second objective is to implement a simple, yet complete, dynamic web application. We will create HTML, CSS and JavaScript assets that will be served to the browsers and presented to the users. The JavaScript code executed in the browser will issue asynchronous HTTP requests to our web infrastructure (AJAX requests) and fetch content generated dynamically.

The third objective is to practice our usage of Docker. All the components of the web infrastructure will be packaged in custom Docker images (we will create at least 3 different images). We will also use Docker compose to define a complete infrastructure with several components

## Step 1: Static HTTP server with apache httpd

For this part, we only build a simple docker image with PHP and apache.
First, we create a Dockerfile from https://hub.docker.com/_/php/. You can find the file [here](https://github.com/Fl4gu1z0wsky/HEIG-VD_labo05_HTTP-infra/tree/main/step1/apache-php-image).
In the Dockerfile, we simply launch a php:7.2-apache image and copy the files from our machine under src/dist/ to /var/www/html/ that is in the docker.    
Then, we download a bootstrap pre-build site from https://startbootstrap.com/theme/freelancer.     
We only need the dist directory and can put it under our src/ directory.  
I changed the title from src/dist/index.html from "Greyscale" to "My DAI Project".      
Now we can build our image with:
```sh
sudo docker build -t apache_php .
```
And run it:
```sh
sudo docker run -dit -p 8080:80 apache_php
```
And we can find our apache/PHP page under http://127.0.0.1:8080/.   
     
If you want to access your docker machine and change the files (index.html for example).    
You can simply run this:
```sh
docker exec -it [name of the docker machine] /bin/bash
```
By doing that, you go directly under /var/www/html, this is where are your docker files copied beforehand.   
If you want, you can navigate wherever you want in your docker container and modify what you want.    

## Step 2: Dynamic HTTP server with express.js
For this part, we create a Node server with docker from https://hub.docker.com/_/node. We have our Dockerfile [here](https://github.com/Fl4gu1z0wsky/HEIG-VD_labo05_HTTP-infra/tree/main/step1/apache-php-image).    
    
We use npm that is a utility to install package dependencies with our node server.
We have to create a src file and go under it, then:
```sh
npm init
package name> students
version> 1.0.0
description> Just a demo
author> [your name]
```
This will install npm.    
Now we can add [chance](https://chancejs.com/) that will generate random values:  
```sh
npm install --save chance
```
Finally, we can install express that will create files and dependencies:
```sh
npm install express --save
```
Now we need to add our index.js to add some stuff in there so the server will do something:
```sh
touch index.js
```
And we can modify it. You can retrieve our file [here](https://github.com/Fl4gu1z0wsky/HEIG-VD_labo05_HTTP-infra/blob/step2/step2/express-image/src/index.js).      
The purpose here, is to send some requests with the help of some files:     
https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/ (Article to help with http requests)       
https://expressjs.com/ (This is a framework we can work with)      
      
Finally, we can try our app by launching our server from the src/ directory and lauch index.js:
```sh
node index.js
```
Now go to http://localhost:3000 and it will receive random request from the node server.

## Step 3: Docker compose to build the infrastructure
This step is quite easy. You just need to run Docker compose.    
Make sure you get the right paths in your [docker-compose.yml](https://github.com/Fl4gu1z0wsky/HEIG-VD_labo05_HTTP-infra/blob/step3/step3/docker-compose.yml)        
Then you can launch your docker compose to run our 2 containers:
```sh
docker-compose up -d
```
*The -d will run docker-compose in background*      
Next, you can see your 2 containers online at:           
- http://localhost:8080/      
- http://localhost:8081/      
If you want to stop your containers just enter:
```sh
docker-compose stop
```    
     
## Step 4: Reverse proxy with Traefik
## Step 4a: Dynamic cluster management
## Step 5: AJAX requests with JQuery
## Step 6: Load balancing: round-robin and sticky sessions
## Step 7: Management UI
