const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {
  const hallticket = req.body.hallticket;
  let results = "";

  const url = "https://results.cmrithyderabad.edu.in/helper.php?gamaOne=getResult";

  try {
    for (let id = 50; id > 0; id--) {
      const data = `hallticket=${hallticket}&result=${id}`;

      // Fetch data from the API
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const invalidResult =
        '<div class="isa_error">Invalid Hallticket, Please contact Exam Branch if you think this is a mistake.</div>';

      const result = response.data;
      if (result !== invalidResult) {
        results += result;
      }
    }

    res.send(results);
  } catch (error) {
    console.error("Error fetching data from API:", error);
    res.status(500).send("Error fetching data from API");
  }
});

module.exports = router;
