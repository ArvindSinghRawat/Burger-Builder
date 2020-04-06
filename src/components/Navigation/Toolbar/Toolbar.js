import React from "react";

import Logo from "../../Logo/Logo";

import styles from "./Toolbar.module.css";

const toolbar = (props) => {
  return (
    <header className={styles.Toolbar}>
      <div>Menu</div>
      <Logo />
      <nav>
        <ul>...</ul>
      </nav>
    </header>
  );
};

export default toolbar;
