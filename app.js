const express= require("express");
const app = express();
const cors= require("cors");
const router= require("./router/postrouter");


app.use(cors());
app.use(express.json());
app.use("/api/posts",router);

module.exports=app;