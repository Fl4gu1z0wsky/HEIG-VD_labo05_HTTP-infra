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
docker build -t apache_php .
```
And run it:
```sh
docker run -dit -p 8080:80 apache_php
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
For this part, we create a Node server with docker from https://hub.docker.com/_/node. We have our Dockerfile [here](https://github.com/Fl4gu1z0wsky/HEIG-VD_labo05_HTTP-infra/blob/main/step2/express-image/Dockerfile).    
    
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
When our index.js works, we can launch our container with the dynmaic website.      
First, we create our image:
```sh
docker build -t node .
```
Now we can run our container:
```sh
docker run -dit -p 8080:3000 node
```
*Note that we bind the port 3000 from our app to the port 8080 for the localhost.*        
Now go to http://localhost:8080 and it will receive random JSON response from the node server like this:   
```sh
[{"name":"Ralph McKenzie","life":17,"strenght":4},{"name":"Lillian Brady","life":13,"strenght":5}]
```

## Step 3: Docker compose to build the infrastructure
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
First, https://doc.traefik.io/traefik/getting-started/quick-start/ is good ressource to start. Copying and pasting the first content will give us a simple traefik to open with docker compose.     
Next, we need to redirect the traffic from http://localhost to our static website and http://localhost/api to our dynamic website.     
For that, we will use:
```sh
"traefik.http.routers.web-static.rule=Host(`localhost`)"
"traefik.http.routers.web-dynamic.rule=(Host(`localhost`) && PathPrefix(`/api`))"
```
This will tell Traefik to redirect our request to the website we want.     
Next, we can simply run our docker compose and everything will start as wished:
```sh
docker-compose up -d
```  
**How does a reverse proxy improve security?**       
- **Encryption**: A reverse proxy can encrypt the traffic between clients and the backend servers using SSL/TLS, which helps to protect sensitive data from being intercepted by attackers.       
- **Access control**: A reverse proxy can be configured to require authentication before allowing clients to access the backend servers. This can help to prevent unauthorized access to sensitive resources.       
- **Denial of service (DoS) protection**: A reverse proxy can absorb the impact of DoS attacks, mitigating the risk of backend servers being overwhelmed and unavailable.     
- **Load balancing**: A reverse proxy can distribute incoming requests evenly among the backend servers, improving the performance and availability of the application.    
- **Web application firewall (WAF)**: A reverse proxy can include a WAF, which can filter out malicious traffic and protect against common web-based attacks such as SQL injection and cross-site scripting (XSS).       
- **Hide backend servers**: A reverse proxy can hide the IP addresses of the backend servers from the client, making it more difficult for attackers to target those servers directly.     
## Step 4a: Dynamic cluster management
Nothing much to do here. We just add:
```sh
deploy:
     replicas: 2
```
This will mount 2 instances of our servers, dynamic ans static.    
To test it, we can stop one container and try to access the content. It should still be available.
## Step 5: AJAX requests with JQuery
## Step 6: Load balancing: round-robin and sticky sessions
## Step 7: Management UI
