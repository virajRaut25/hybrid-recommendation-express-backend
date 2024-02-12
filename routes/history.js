const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const UserItem = require("../models/UserItem");

const router = express.Router();

// Route 1: Get User Item List history: Get "/api/history/"
router.get("/", fetchuser, async (req, res) => {
  try {
    const user_item = await UserItem.findOne({ user_id: req.user.id });
    if (!user_item) return res.json("Nothing Searched Yet!");
    res.json(user_item);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Route 2: Add User Searched Content in search_history: Post "/api/history/addSearch"
router.post("/addSearch/:title", fetchuser, async (req, res) => {
  try {
    let user_item = await UserItem.findOne({ user_id: req.user.id });
    const title = req.params.title;
    let search_history = user_item.search_history;
    if (search_history.includes(title)) {
      search_history.splice(search_history.indexOf(title), 1);
    }
    search_history.unshift(title);

    user_item = await UserItem.find({ user_id: req.user.id }).updateOne({
      $set: { search_history: search_history },
    });

    user_item = await UserItem.findOne({ user_id: req.user.id });
    res.json(user_item);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Route 3: Delete User Searched Content in search_history: Post "/api/history/delHistory"
router.delete("/delHistory", fetchuser, async (req, res) => {
  try {
    let user_item = await UserItem.findOne({ user_id: req.user.id });
    
    let search_history = [];

    user_item = await UserItem.find({ user_id: req.user.id }).updateOne({
      $set: { search_history: search_history },
    });

    user_item = await UserItem.findOne({ user_id: req.user.id });
    res.json(user_item);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Route 4: Add User Liked Content in like: Post "/api/history/addLike"
router.post("/addLike/:title", fetchuser, async (req, res) => {
  try {
    let user_item = await UserItem.findOne({ user_id: req.user.id });
    const title = req.params.title;
    let liked = user_item.liked;
    if (liked.includes(title)) {
      liked.splice(liked.indexOf(title), 1);
    }
    liked.unshift(title);

    user_item = await UserItem.find({ user_id: req.user.id }).updateOne({
      $set: { liked: liked },
    });

    user_item = await UserItem.findOne({ user_id: req.user.id });
    res.json(user_item);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Route 5: Remove User Liked Content in like: Post "/api/history/delLike"
router.post("/delLike/:title", fetchuser, async (req, res) => {
  try {
    let user_item = await UserItem.findOne({ user_id: req.user.id });
    const title = req.params.title;
    let liked = user_item.liked;
    if (liked.includes(title)) {
      liked.splice(liked.indexOf(title), 1);
      user_item = await UserItem.find({ user_id: req.user.id }).updateOne({
        $set: { liked: liked },
      });

      user_item = await UserItem.findOne({ user_id: req.user.id });
    }

    res.json(user_item);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Route 6: Add Genre for Day: Post "/api/history/addGenreDay"
router.post(
  "/addGenreDay",
  [
    body(
      "genreList",
      "Atlest one Passenger reservation must be there"
    ).notEmpty(),
  ],
  fetchuser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const today = new Date().toLocaleString("en-us", { weekday: "short" });
      let user_item = await UserItem.findOne({ user_id: req.user.id });
      const { genreList } = req.body;
      let weekday = user_item.weekday;
      let day = user_item.weekday[today];
      genreList.forEach((e) => {
        if (day.has(e)) {
          let val = day.get(e);
          day.set(e, val + 1);
        } else day.set(e, 1);
      });

      day = new Map([...day.entries()].sort((a, b) => b[1] - a[1]));
      weekday[today] = day;
      user_item = await UserItem.find({ user_id: req.user.id }).updateOne({
        $set: { weekday: weekday },
      });

      user_item = await UserItem.findOne({ user_id: req.user.id });

      res.json(user_item);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 7: Get Genre for Day: Post "/api/history/getGenreDay"
router.get("/getGenreDay", fetchuser, async (req, res) => {
  try {
    const today = new Date().toLocaleString("en-us", { weekday: "short" });
    let user_item = await UserItem.findOne({ user_id: req.user.id });
    let day = user_item.weekday[today];
    day = [...day.keys()].filter((e, i) => i < 2);
    res.json(day);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
