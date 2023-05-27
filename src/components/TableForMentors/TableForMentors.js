import React, { Fragment, useEffect, useState } from "react";
import clsx from "clsx";

import { getCommonPoints, getPercentGrade } from "./helpers";

import {
  MAX_GRADE,
  MESSAGE_TYPE,
  MESSAGE_TYPE_TEXT,
  SUCCESSFUL_GRADE,
} from "./constants";

import styles from "./TableForMentors.module.css";

export function TableForMentors({ data }) {
  const [points, setPoints] = useState(0);
  const [grade, setGrade] = useState(0);
  const [isSuccessful, setSuccessful] = useState(false);
  const [messageType, setMessageType] = useState(MESSAGE_TYPE.FAILED);

  const common = getCommonPoints(data);
  const isSuccessfulGrade = () => grade >= SUCCESSFUL_GRADE;

  const calculateResult = () => {
    const finalGrade = getPercentGrade(common, points);

    setGrade(finalGrade);
  };

  const handleInputChange = (isChecked, point) => {
    setPoints((prevState) => prevState + point * (isChecked ? 1 : -1));
  };

  const handleReset = () => {
    const inputs = document.querySelectorAll("input[type='checkbox']");

    inputs.forEach((element) => (element.checked = false));

    setPoints(0);
    setGrade(0);
  };

  const getMessageType = () => {
    if (isSuccessfulGrade()) {
      if (grade !== MAX_GRADE) {
        setMessageType(MESSAGE_TYPE.SUCCESSFUL_WITH_IMPROVEMENT);
      } else {
        setMessageType(MESSAGE_TYPE.SUCCESSFUL);
      }
    } else {
      if (grade > 0) {
        setMessageType(MESSAGE_TYPE.FAILED_WITH_IMPROVEMENT);
      }
    }
  };

  useEffect(() => {
    calculateResult();
  }, [points]);

  useEffect(() => {
    setSuccessful(isSuccessfulGrade());

    getMessageType();
  }, [grade]);

  const list = data.map((item, index) => (
    <Fragment key={item.title}>
      <tr>
        <td colSpan="3" className={styles.topic}>
          {item.title}
        </td>
      </tr>
      {item.items.map((point, index1) => (
        <tr key={point.text}>
          <td>{point.text}</td>
          <td className={styles.center}>{point.points}</td>
          <td className={styles.center}>
            <input
              className={styles.checkbox}
              id={`${index}${index1}`}
              type="checkbox"
              onChange={(event) =>
                handleInputChange(event.target.checked, point.points)
              }
            />
            <label
              className={styles.checkboxLabel}
              htmlFor={`${index}${index1}`}
            />
          </td>
        </tr>
      ))}
    </Fragment>
  ));

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Criteria</th>
            <th>Coefficient</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{list}</tbody>
      </table>
      <div className={styles.gradeContainer}>
        <div className={styles.gradeTable}>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.topic}>
                <th>Student's grade</th>
                <td
                  className={clsx(styles.grade, styles.danger, {
                    [styles.success]: isSuccessful,
                  })}
                >
                  {grade}%
                </td>
              </tr>
            </tbody>
          </table>
          <button className={styles.btn} onClick={handleReset}>
            Reset
          </button>
        </div>
        <p className={clsx(styles.danger, { [styles.success]: isSuccessful })}>
          {MESSAGE_TYPE_TEXT[messageType]}
        </p>
      </div>
    </div>
  );
}
