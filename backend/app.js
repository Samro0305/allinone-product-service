const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const path=require("path");

const productRoutes=require("./routes/productRoutes");

const swaggerUi=require("swagger-ui-express");
const swaggerDocument=require("./swagger.json");

const app=express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api",productRoutes);

app.use("/api/docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument));

/* IMPORTANT PART */

app.get("/",(req,res)=>{
 res.sendFile(path.join(__dirname,"../frontend/admin.html"));
});

app.use(express.static(path.join(__dirname,"../frontend")));

const PORT=3000;

app.listen(PORT,()=>{
 console.log("Server running on port "+PORT);
});