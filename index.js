const express =require("express")
const app=express()


const cors=require("cors")
const database =require("./Config/DataBaseConnection")



const questionBank=require("./Routes/QuestionBank.Routes")

const dotenv = require("dotenv");
dotenv.config()

const PORT = process.env.PORT || 5000;
database.connect();

app.use(express.json());

app.use(
    cors({
      origin: "*",
      credentials: true,
      maxAge: 14400,
    })
  ); 


  app.use('/api/v1/questionbank',questionBank)


  app.get("/", (req, res) => {
    res.status(200).json({
      message: "Welcome To The Test Pulse Server", 
    }); 
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });  