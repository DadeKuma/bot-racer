import React from "react";
import styles from "../style/AboutTab.module.scss";
import { TabProps } from "../types";

const AboutTab: React.FC<TabProps> = ({ handleTabChange }) => {
  return (
    <div className={styles.infoContainer}>
      <h2>About Bot Racer</h2>
      <p>
        Bot Racer is a tool created and maintained by{" "}
        <a href="https://twitter.com/DadeKuma" target="_blank" rel="noreferrer">
          @DadeKuma
        </a>{" "}
        to assist participants in{" "}
        <a href="https://code4rena.com/register/bot" target="_blank" rel="noreferrer">
          Code4rena
        </a>{" "} bot races. It provides statistics and information to enhance your racing experience.
      </p>
      <p>
        With Bot Racer, you can access race results, rankings, and other relevant data to analyze your performance and gain insights.
      </p>
      <p>
        The code for this website is fully open source, and it's available {" "}
        <a href="https://github.com/DadeKuma/bot-racer" target="_blank" rel="noreferrer">
          here
        </a>. Feel free to contribute, and don't forget to star the repository! 😊
      </p>
    </div>
  );
};

export default AboutTab;
