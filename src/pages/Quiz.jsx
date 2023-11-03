import React, { useState, useEffect } from "react";
import styles from "../styles/quiz.module.css";
import { data } from "../components/Questions";
import { BiTimer } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@chakra-ui/react";
import ResultPage from "../components/ResultPage";
import InstructionPage from "../components/InstructionPage";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(20);
  const [isDisabled, setDisabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAns, setCorrect] = useState(0);
  const [wrongAns, setWrong] = useState(0);
  const [isEnded, setEnded] = useState(false);
  const [instructionModal, setInstruction] = useState(true);
  const [isTimerPaused, setTimerPaused] = useState(true);
  const [skipCount, setSkip] = useState(0);

  const handleAnswer = (option) => {
    setSelectedOption(option);
  };

  const handleInstruction = () => {
    setInstruction(false);
    setTimerPaused(false);
  };

  const handleSkip = () => {
    setSkip(skipCount + 1);
    goToNextQuestion();
  };

  const handleSubmit = () => {
    let correct = questions[currentQuestionIndex].answer;
    let selected = selectedOption;
    // incrementing the count of wrong and correct answers
    if (selectedOption) {
      if (correct === selected) {
        setCorrect(correctAns + 1);
      } else if (correct !== selected) {
        setWrong(wrongAns + 1);
      }
    }
    goToNextQuestion();
  };

  const goToNextQuestion = () => {
    setSelectedOption(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(20);
      setDisabled(false);
    } else {
      // when quiz is ended
      setEnded(true);
    }
  };

  // useEffect for shuffle array every time
  useEffect(() => {
    setQuestions(data.sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (!isTimerPaused) {
        if (timer > 0) {
          setTimer(timer - 1);
        } else {
          clearInterval(timerInterval);
          setDisabled(true);
          setSkip(skipCount + 1);
          if (currentQuestionIndex < questions.length - 1) {
            toast.info(`Time's Up 🙂, Next Question in 5 sec !`, {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "colored",
              style: {
                fontSize: "12px",
              },
            });
          }
          setTimeout(goToNextQuestion, 5000);
        }
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timer, currentQuestionIndex, isTimerPaused]);

  return (
    <div className={styles.quizContainer}>
      {instructionModal ? (
        <InstructionPage func={handleInstruction} />
      ) : isEnded ? (
        <ResultPage
          correct={correctAns}
          wrong={wrongAns}
          tQ={questions?.length}
          skipped={skipCount}
        />
      ) : (
        <div className={styles.quizBox}>
          <div className={styles.info}>
            <p>{`Total Question ${currentQuestionIndex + 1}/${
              questions.length
            }`}</p>
            <p className={styles.timer}>
              <BiTimer size={"35px"} />
              <span>{`0:${timer < 10 ? `0${timer}` : timer}`}</span>
            </p>
          </div>
          <div className={styles.quiz}>
            <div className={styles.ques}>
              <p>{`${currentQuestionIndex + 1}. ${
                questions[currentQuestionIndex]?.question
              }`}</p>
            </div>
            <div className={styles.options}>
              {questions[currentQuestionIndex]?.options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={selectedOption === option ? styles.selected : ""}
                >{`${index + 1}. ${option}`}</div>
              ))}
            </div>
            <div className={styles.saveBtn}>
              <Button
                w={{ base: "30%", md: "20%" }}
                isDisabled={isDisabled}
                onClick={handleSkip}
              >
                {"Skip"}
              </Button>

              <Button
                w={{ base: "30%", md: "20%" }}
                isDisabled={isDisabled || selectedOption === null}
                onClick={handleSubmit}
              >
                {"Save & Next"}
              </Button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Quiz;
