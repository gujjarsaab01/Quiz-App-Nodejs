const express = require("express");
const {
  createQuiz,
  getAllQuizzes,
  getActiveQuiz,
  getQuizResult,
} = require("../controllers/quizController");
const router = express.Router();

//POST method- Creating a new quiz
router.post("/quizzes", createQuiz);

//GET method - Fetching all quizzes
router.get("/quizzes/all", getAllQuizzes);

//GET method- Retrieve  active quiz
router.get("/quizzes/active", getActiveQuiz);

//GET method- Retrieve  ressult of quiz
router.get('/quizzes/:id/result', getQuizResult);



module.exports = router;
