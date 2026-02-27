'use client'
import React from "react";
import styles from "./stylesheet.module.css"
type WindowProps = {
  children: React.ReactNode;
};
const windowName = "Arrangementer"
export default function Window({ children }: WindowProps) {
  return (
    <>
      <div className={styles.TopBar}>
        {windowName}
      </div>

      {children}

    </>
  );
}


