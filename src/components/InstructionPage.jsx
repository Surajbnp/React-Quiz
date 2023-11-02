import React from "react";
import styles from "../styles/instruction.module.css";

const InstructionPage = ({ func }) => {
  return (
    <div className={styles.container}>
      <p>Instruction For Quiz</p>
      <div className={styles.para}>
        <li>There is total 10 questions in quiz.</li>
        <li>For each question you have 20 seconds to answer.</li>
        <li>There is no negative marking.</li>
        <li>Each question containing 5 marks each.</li>
        <li>Do not refresh the browser.</li>
      </div>
      <div className={styles.btn}>
        <button onClick={() => func()}>Start Quiz</button>
      </div>
    </div>
  );
};

export default InstructionPage;
