"# Backend Code" 

````js
npm init
npm i -D nodemone
````
npm i -D nodemone(install nodemone for auto restart/refresh code, only for development(-D))

package.json
````js
{
  "name": "react-video-backend",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon src/index.js"
  },
  "author": "Salim Shaikh",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}

````
"type": "module",
"dev": "nodemon src/index.js"


Install Prettier
````js
npm i -D prettier
````
add file .prettierrc setting file
````js
{
    "singleQuote": false,
    "bracketSpacing": true,
    "tabWidth": 2,
    "trailingComma": "es5",
    "semi": true
}
````

add .prettierignore ignore file
````js
/.vscode
/node_modules
./dist

*.env
.env
.env.*
````
Above push to github

uninstall all
````js
npm uninstall express mongoose dotenv
````

Install dotenv, mongoese express
````js
npm i mongoose express dotenv
````

comman js
````js
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
````

"dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"

````js
npm run start
````