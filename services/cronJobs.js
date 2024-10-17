const cron = require("node-cron");
const Quiz = require("../Model/QuizModel");

// Function to update the status of quizzes
const updateQuizStatus = async () => {
  const quizzes = await Quiz.find();
  const now = new Date();

  quizzes.forEach(async (quiz) => {
    //upadting quiz status
    await quiz.updateStatus();

    // remainig time until quiz ends
    const remainigTime = quiz.endDate - now;

    //logging time if quiz still active
    if (quiz.status === "active") {
      const minutesLeft = Math.floor(remainigTime / 60000);
      const secondsLeft = Math.floor((remainigTime % 60000) / 1000);
      console.log(
        `Quiz "${quiz.question}" ends in ${minutesLeft} minutes and ${secondsLeft} seconds`
      );
    }

    //if quiz finished, logging right answer
    if (quiz.status === "finished") {
      console.log(
        `Quiz "${quiz.question}" had ended. Right answer: ${quiz.rightAnswer}`
      );
    }
  });
};

// Function to start cron jobs
const startCronJobs = () => {
    // Runs every minute
  cron.schedule("* * * * *", async () => {
    await updateQuizStatus();
  });
};

module.exports = startCronJobs;
