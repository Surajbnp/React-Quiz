import React from "react";
import styles from "../styles/homepage.module.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <div className={styles.logo}>
          <img
            src="https://img.pikbest.com/origin/09/29/46/07qpIkbEsTzCK.png!sw800"
            alt="logo"
            width={"100%"}
            height={"100%"}
          />
        </div>
        <div className={styles.btn}>
          <button onClick={() => navigate('/quiz')}>Start Quiz</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
