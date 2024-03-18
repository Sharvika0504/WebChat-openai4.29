import axios from "axios";
import dotenv from "dotenv";
import express from "express";
import openAI from "../utils/openAIClient.js";

dotenv.config();
const router = express.Router();

router.post("/text", async (req, res) => {
  try {
    const { text, activeChatId } = req.body; //store the message and chat id in the variables
    console.log('Requests: ', req.body);
    const response = await openAI.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Your AI Assistant" },
        { role: "user", content: text },
      ],
    });
    console.log('response', response.data);
    await axios.post(//backend onSubmit operations
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      { text: response.choices[0].message.content },//the data in the response is pretty  nested so we choose the first response out of all
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": process.env.BOT_USER_NAME,
          "User-Secret": process.env.BOT_USER_SECRET,
        },
      }
    );
    res.status(200).json({ text: response.choices[0].message.content }); ///testing purpose
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/code", async (req, res) => {
    try {
      const { text, activeChatId } = req.body; 
      console.log('Requests: ', req.body);
      const response = await openAI.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Your AI Code Assistant" },
          { role: "user", content: text },
        ],
      });
      console.log('response', response.data);
      await axios.post(//backend onSubmit operations
        `https://api.chatengine.io/chats/${activeChatId}/messages/`,
        { text: response.choices[0].message.content },//the data in the response is pretty  nested so we choose the first response out of all
        {
          headers: {
            "Project-ID": process.env.PROJECT_ID,
            "User-Name": process.env.BOT_USER_NAME,
            "User-Secret": process.env.BOT_USER_SECRET,
          },
        }
      );
      res.status(200).json({ text: response.choices[0].message.content }); ///testing purpose
    } catch (error) {
      console.error("error", error);
      res.status(500).json({ error: error.message });
    }
  });


export default router; // connect to index.js to make sure for the connection
