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
## Step 3: Docker compose to build the infrastructure
## Step 4: Reverse proxy with Traefik
## Step 4a: Dynamic cluster management
## Step 5: AJAX requests with JQuery
## Step 6: Load balancing: round-robin and sticky sessions
## Step 7: Management UI
