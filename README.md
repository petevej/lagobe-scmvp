# lagobe-scmvp
Seller Center MVP

# Lagobe

# Prerequisite

## Download Tools:

- JDK [Download link](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

- STS IDE [Download link](https://spring.io/tools/sts)

- nodejs [Download link](https://nodejs.org/en/)

- bower [Download Step](https://bower.io/)

- Source Tree [Download link](https://www.sourcetreeapp.com/)

- Protractor [Download link](http://www.protractortest.org/) (For E2E testing)

- Docker [Download link](https://www.docker.com/products/overview) (For deployment only)

- Docker [Download link](https://www.docker.com/)

- Docker Kitematic [Download link](https://github.com/docker/toolbox/releases/tag/v1.12.5)

# Steps to setup machine

- Clone code using source tree [link](https://confluence.atlassian.com/sourcetreekb/clone-a-repository-into-sourcetree-780870050.html)

- Import mavan project into STS [link](http://jaringandata.blogspot.com/2010/12/importing-maven-projects-into-sts.html)

- Run STS project. Or run "mvn spring-boot:run" 

- To get list of all service, browse to [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)


# Development

## Frontend Development (Angularjs)

Workspace path: [/src/main/resources/static/](https://github.com/napatb/Asawayont-ERP/tree/master/src/main/resources/static)

Goto static folder and run "npm install" then "bower install" to load third party library. The entry point is [index.html](https://github.com/napatb/Asawayont-ERP/blob/master/src/main/resources/static/index.html).

## Backend Development (Spring Boot)

Application Property: [/src/main/resources/application.properties](https://github.com/napatb/Asawayont-ERP/blob/master/src/main/resources/application.properties)

Service Controller: [/src/main/java/com/vanwan/controllers/*.java](https://github.com/napatb/Asawayont-ERP/tree/master/src/main/java/com/vanwan/controllers)

# Testing

Goto [static/e2e](https://github.com/napatb/Asawayont-ERP/tree/master/src/main/resources/static/e2e) and run "npm install" then protractor "protractor protractor-config.js".

# Deployment

`SPRING_PROFILES_ACTIVE=production mvn package docker:build`

