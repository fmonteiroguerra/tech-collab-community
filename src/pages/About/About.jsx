import React from "react";

import styles from "./About.module.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.about}>
      <h2> About TechCollab Community</h2>
      <p>This project consists in a Community where everyone can collab with tech knowledge through posts.</p>
      <p>Create easily your user (no need to confirm email), begin to create posts and manage them (edit, delete)</p>
      <p>© Felipe Monteiro</p>
      <p>
        <strong>Frontend:</strong> React (Javascript, CSS, HTML, React Hooks,
        Customized Hooks, Context API, Reat-Router-Dom, etc )
      </p>
      <p>
        <strong>Backend:</strong> made with Firebase (Authentication, Database).
      </p>
      <Link to="/posts/create" className="btn">
        Create Post
      </Link>
    </div>
  );
};

export default About;
