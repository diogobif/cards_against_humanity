import React from "react";
import { useHandleConnection } from "../../hooks/useHandleConnection";
import styles from "./style.module.css";
import { Header } from "../Header";

export function App() {
  useHandleConnection();

  return (
    <div className={`${styles.appContainer}`}>
      <div className={`${styles.appGrid}`}>
        <Header />
        <div>MAIN</div>
        <div>FOOTER</div>
      </div>
    </div>
  );
}
