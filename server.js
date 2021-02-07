const express = require("express");
const next = require("next");
const connectDB = require("./server/config/db");
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

connectDB();
//Init Middleware
server.use(express.json({ extended: false }));
app
  .prepare()
  .then(() => {
    server.use("/api/auth", require("./server/routes/api/auth"));
    server.use('/api/product', require('./server/routes/api/product'));
    server.use('/api/customer', require('./server/routes/api/customer'));
    server.use('/api/sale', require('./server/routes/api/sale'));
    server.use('/api/logs', require('./server/routes/api/logs'));



    
    server.get("/sheets", (req, res) => { });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.all("*", (req, res) => {
      return handle(req, res);
    });
    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
