# myProxy
Proxy server app that allows all my applications to work on one VPS using subdomains and HTTPS [Node.js]

## Setup
My simple manual to setup with virtual machine

- connect to machine via ssh and:
```
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install nodejs
sudo npm install pm2@latest -g
sudo npm install forever -g
```

- konfigure nginx:
```
sudo nano /etc/nginx/sites-available/default
```
and paste inside:
```
server_name pppmmm.pl www.pppmmm.pl;

location / {
	proxy_pass http://localhost:8000;
	proxy_http_version 1.1;
	proxy_set_header Upgrade $http_upgrade;
	proxy_set_header Connection 'upgrade';
	proxy_set_header Host $host;
	proxy_cache_bypass $http_upgrade;
}
```


- test nginx configuration and restart if ok:
```
sudo nginx -t
sudo service nginx restart
```


- create directory and start node app:
```
sudo mkdir proxy
cd proxy
git clone https://github.com/pawelmat142/myProxy.git .
npm i
sudo forever start app.js
```

- start other apps in the same way

- generate ssl certificates with letsencypt:
```
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install phyton-certbox-nginx
sudo certbot --nginx -d pppmmm.pl -d www.pppmmm.pl -d jackpot.pppmmm.pl -d todo.pppmmm.pl -d translator.pppmmm.pl
```