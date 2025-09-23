const Feedback = require("../models/feedback");
const Token = require("../models/token");

//Createa route which will identify the existing for or token is generated again same faculty subect and student roll, otherwise student will fill full form and after submitting he finds that the form is already submitted

exports.postFeedback = async (req, res) => {
  const {
    studentName,
    studentRoll,
    parameter1,
    parameter2,
    parameter3,
    parameter4,
    parameter5,
    overallEffectiveness,
    strengths,
    improvements,
    additionalComments,
  } = req.body;

  let { token } = req.params;
  let recievedToken = await Token.findOne({ token: token });

  recievedToken.used_by = studentRoll;
  recievedToken.used = true;
  await recievedToken.save();
  console.log(recievedToken);

  const feedback = new Feedback({
    studentName,
    studentRoll,
    faculty: recievedToken.faculty,
    subject: recievedToken.subject,
    token: recievedToken._id,
    parameter1: {
      q1: parameter1.q1,
      q2: parameter1.q2,
      q3: parameter1.q3,
    },
    parameter2: {
      q1: parameter2.q1,
      q2: parameter2.q2,
      q3: parameter2.q3,
    },
    parameter3: {
      q1: parameter3.q1,
      q2: parameter3.q2,
      q3: parameter3.q3,
    },
    parameter4: {
      q1: parameter4.q1,
      q2: parameter4.q2,
      q3: parameter4.q3,
    },
    parameter5: {
      q1: parameter5.q1,
      q2: parameter5.q2,
      q3: parameter5.q3,
    },
    overallEffectiveness: overallEffectiveness,
    strengths: strengths,
    improvements: improvements,
    additionalComments: additionalComments,
  });

  const existingFeedback = await Feedback.findOne({
    studentRoll: studentRoll,
    faculty: recievedToken.faculty,
    subject: recievedToken.subject,
  });
  try {
    if (!existingFeedback) {
      const result = await feedback.save();
      console.log(result);
      res.json({ message: "Feedback Submitted successfully", result });
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};
