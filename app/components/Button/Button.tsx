import Link from "next/link";
import React from "react";
import { UrlObject } from "url";
import styles from "./button.module.css";

type ButtonProps = {
  link: string | UrlObject;
  type: "primary" | "secondary";
  text: string;
};

const Button: React.FC<ButtonProps> = ({ link, type, text }) => {
  const styleClass = `${styles.generalButton} ${styles[type]}`;

  return (
    <button className={styleClass}>
      <Link href={link}>{text}</Link>
    </button>
  );
};

export default Button;
