import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import openAiRoutes from "./routes/openai.js";

/*Configuration setup*/ 
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet()); // for increased security  using HTTP headers
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"})); // to request resources from another domain
app.use(morgan("common"));// logs for debugging
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit : "30mb", extended: true}));
app.use(cors());//accept requests from different domains

/*OPENAI Configuration*/ //create openai client for version 4.28

/*const openAI = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], 
});*/

/**Routes configuartion */
app.use('/openai', openAiRoutes);
app.use("/auth", authRoutes);

/*SERVER SETUP*/
const PORT = process.env.PORT || 9000; //backup port if environment variable not found
app.listen(PORT, () => {
  console.log(`Listening Port http://localhost:${PORT}`);
});

