# Welcome to Kevin Morton's IAMLab Project 

This project is a showcase of the projects I have worked on and a demo of some of the technologies I have used. 
URL: [iamlab.tech](https://iamlab.tech/)
EMAIL: [kev+jobs@kevs.biz](kev+jobs@kevs.biz)
And do feel free to play around with or reuse any of my work for anything you like.  

## Technology
  - Phalcon 
  - PHP7 
  - PostgreSQL 
  - Mithril.Js 
  - SASS 
  - Gulp 
  - Git 
  - Vagrant
  - REST API
 
## Setup 
 
Well if you would like to play with this app you're going to need the repo so, Clone the repo `git clone https://github.com/TheSkyNet/imalab.git`
 
### Vagrant Set Up 
 
At this point you can just use the provided Vagrant file  `cd ./imalab/dev/vagrant && vagrant up` OR set up manuley , like I wold do it too if i was a crazy person. 

### Manfully Set Up  

#### Prerequisites 
   - [PostgreSQL](https://www.postgresql.org/download/)
   - [NPM](https://www.npmjs.com/) 
   - [Bower](https://bower.io/)
   - [PHP](http://php.net/downloads.php)
   - [Phalcon](https://phalconphp.com/en/) 
   - [Phalcon Dev Tools](https://github.com/phalcon/phalcon-devtools)
 
#### How Do I Do That Now?
 - Change directory to the repo dir  `cd ./imalab/`
 - Edit the config file in `config/defaults.yml`
 - Run the migrations and seeds `phalcon migraton --seed`
 - Install the dependencies npm `npm insall` bower `bower install`  composer `composer install`
 - Compile the js and SCSS `gulp prod`
 - Then you can use the internal php server `php -S localhost:8000 -t ./public`
 - Then why not give me a job ?  
 
 
## Cool Things About This App
 @todo think of cool things about this app to get you a job kev (before you put it live)

## Problems With This App 
 @todo think of Problems about this app so you can show you understand how to fix them and prove you are human  (before you put it live)

certbot certonly --dns-linode -d itsd.dev -d www.itsd.dev --cert-name mycert --dns-linode-propagation-seconds=500

Certificate is saved at: /etc/letsencrypt/live/mycert/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/mycert/privkey.pem
