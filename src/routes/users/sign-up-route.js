const fs = require('fs');
const path = require('path');
const shortid = require('shortid');

const saveUser = (user, response) => {
  const fileName = `${user.id}--${user.username.toLowerCase()}.json`;

  const usersPath = path.resolve(__dirname, '../../', 'db/users', fileName);
  fs.writeFile(usersPath, JSON.stringify(user), function(err) {
    if (err) throw err;

    fs.readFile(usersPath, (err, data) => {
      if (err) throw err;
      response.writeHead(200, { 'Content-Type': 'text/json' });
      response.end(data);
    });
  });
};

const signUpRoute = (request, response) => {
  if (request.method === 'POST') {
    let body = '';
    request.on('data', function(data) {
      body = body + data;
    });
    request.on('end', function() {
      let userObj = JSON.parse(body);
      const userId = shortid.generate();
      userObj = { id: userId, ...userObj };
      saveUser(userObj, response);
    });
  } else {
    response.writeHead(401, { 'Content-Type': 'text/plain' });
    response.end('Forbidden');
  }
};

module.exports = signUpRoute;
