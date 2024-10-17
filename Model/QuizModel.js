const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: [
      {
        type: String,
        required: true,
      },
    ],
    rightAnswer: {
      type: Number,
      required: [true, "Right answer index is required"],
      min: 0,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["inactive", "active", "finished"],
      default: "inactive",
    },
  },
  { timestamps: true }
);

//function to change status
QuizSchema.methods.updateStatus = function () {
  const now = new Date();
  if (now < this.startDate) {
    this.status = "inactive";
  } else if (now >= this.startDate && now <= this.endDate) {
    this.status = "active";
  } else {
    this.status = "finished";
  }
  return this.save();
};

const Quiz = mongoose.model("Quiz", QuizSchema);
module.exports = Quiz;
