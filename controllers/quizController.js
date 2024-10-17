const mongoose = require("mongoose");
const Quiz = require("../Model/QuizModel");

exports.createQuiz = async (req, res) => {
  try {
    const { question, options, rightAnswer } = req.body;

    //validating that all required parameters
    if (!question || !options || !rightAnswer) {
      return res.status(400).json({
        message: "Missing Parameters.",
      });
    }

    // checking right answer index
    if (rightAnswer < 0 || rightAnswer >= options.length) {
      return res.status(400).json({ message: "Invalid rightAnswer index" });
    }

    //setting automatically quizz endtime to 5 min after starttime
    const startTime = new Date(new Date().getTime() + 2 * 60000);
    const endtime = new Date(startTime.getTime() + 5 * 60000);

    const quiz = new Quiz({
      question,
      options,
      rightAnswer,
      startDate: startTime,
      endDate: endtime,
    });

    const savedQuiz = await quiz.save();

    await savedQuiz.updateStatus();
    res.status(201).json({
      success: true,
      message: "Quiz created successfully !",
      quiz: savedQuiz,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while creating  quiz !",
      error: error.message,
    });
  }
};

//Get all quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json({
      success: true,
      message: "successfully Feteched All Quizzes !",
      TotalQuizzes: quizzes.length,
      quizzes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: " Error while Fetching all quizzes !",
      error: error.message,
    });
  }
};

//Fetch active quiz
exports.getActiveQuiz = async (req, res) => {
  try {
    const now = new Date();
    const quiz = await Quiz.find({
      startDate: { $lte: now },
      endDate: { $gte: now },
    });

    if (!quiz || quiz.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No active quiz found !",
      });
    }

    res.status(200).json({
      success: true,
      message: "Active quiz found successfully !",
      activeQuizzes: quiz.length,
      quiz,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: " Error while Fetching active quiz !",
      error: error.message,
    });
  }
};

//Get quiz result after quiz it ends
exports.getQuizResult = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const now = new Date();

    // Ensure quiz has ended before providing results
    if (now < quiz.endDate) {
      return res.status(403).json({
        message:
          "Quiz is still active. Results will be available after the quiz ends.",
      });
    }

    // If the quiz  ended, showing the result
    res.status(200).json({
      success: true,
      message: "Correct Answer Fetched Successfully!",
      rightAnswer: quiz.rightAnswer,
    });
    console.log(
      `Quiz ${quiz._id} has ended. Right answer is: ${quiz.rightAnswer}`
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: " Error while Fetching result !",
      error: error.message,
    });
  }
};
