import axios from "axios";
import express from "express";

const router = express.Router();



router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const chatEngineResponse = await axios.post(
      "https://api.chatengine.io/users/", //syncing with the users on chatengine if not created
      {
        username: username,
        passcode: password,
      },
      {
        headers: { "Private-Key": process.env.PRIVATE_KEY},
      }
    );

    res.status(200).json({ response: chatEngineResponse.data });
  } catch (error) {
    console.error("error", error.message);
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const chatEngineResponse = await axios.get(
        "https://api.chatengine.io/users/me", 
        {
          headers: {
            "Project-ID": process.env.PROJECT_ID,
            "User-Name": username,
            "User-Secret": password,
          },
        }
      );
      res.status(200).json({ response: chatEngineResponse.data });
    } catch (error) {
      console.error("error", error);
      res.status(500).json({ error: error.message });
    }
  });
export default router;