import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/result.module.css";
import React from "react";
import { Button } from "@chakra-ui/react";

const ResultPage = ({ correct, wrong, tQ, skipped }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.resCont}>
      <div className={styles.result}>
        <div className={styles.image}>
          <img
            src="https://guestoria.com/wp-content/uploads/2019/04/winner-gif-1.gif"
            alt="logo"
          />
        </div>
        <p>Thanks for participating the quiz. Here is your result.</p>
        <div className={styles.resultCont}>
          <div>
            <p>
              {"Correct Answers : "} <span>{correct}</span>
            </p>
            <p>
              {`Wrong Answers :`} <span>{wrong}</span>
            </p>
            <p>
              {`Skipped :`} <span>{skipped}</span>
            </p>
          </div>
          <div>
            <p>
              {`Total Score :`}{" "}
              <span>
                {correct * 5}/{tQ * 5}
              </span>
            </p>
          </div>
        </div>
        <div>
          <Button
            color={"white"}
            fontWeight={400}
            w={{base : '40%', md : "30%"}}
            mt={5}
            bg={"#00A9FF"}
            onClick={() => navigate("/")}
          >
            Homepage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
