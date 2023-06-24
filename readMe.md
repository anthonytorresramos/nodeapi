# NodeJs & express

## fresh setup

```
run: npm init -y
```

this will create package.json

then create new file example: server.js

## Express Installation

```
run: npm i express
```

```
//example express js
const express = require("express");
const app = express();

//routes

app.get("/", (req, res) => {
  res.send(`Hello Node API !!!!`);
});

app.get("/blog", (req, res) => {
  res.send(`Hello Blog`);
});

app.listen(3000, () => {
  console.log(`node API app is running on port 3000`);
});
```

### to install nodemon

```
run: npm i nodemon -D
```

### installation of Mongoose

```
run: npm i mongoose
```

include

```
const mongoose = require("mongoose")
```
