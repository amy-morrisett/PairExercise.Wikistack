const express = require("express");
const morgan = require("morgan");
const main = require("./views/main");
const { db, Page, User } = require('./models');

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users');
app.use('/wiki', wikiRouter);

app.get("/", (req, res) => {
    res.send(main(""));
  })

const PORT = 3000;

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

  const init = async() => {
    // only do this once right after a change is made to model
    // await db.sync({force: true});

    await db.sync();

    app.listen(PORT, () => {
        console.log(`App listening at http://localhost:${PORT}`);
    });
  }

  init();