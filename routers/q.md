
# Here is my route in my node.js mongoose app

nonAuthRouter.post("/all_filled", async function (req, res) {
  try {
    const questions = await FBISE9th.find({ filledBy: { $nin: [null, ""] } });
    return res.status(200).json({ questions, message: "success" });

  } catch (error) {
    return res.status(500).json({ message: 'Unknown error!' });
  }
});

This route checks all the documents which has "filledBy" field not null or ""

write me another route "del_empty" which delted all the documents which has filledBy as "" or undefined.