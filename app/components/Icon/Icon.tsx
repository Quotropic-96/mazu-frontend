import React from "react";
import Image from "next/image";
import styles from "./icon.module.css";

type IconProps = {
  name: string;
  image: string;
  callback: Function;
};

const Icon: React.FC<IconProps> = ({ name, image, callback }) => {
  const click = () => {
    callback();
  }
  
  return (
    <button onClick={click} className={styles.iconContainer}>
      <Image
        src={image}
        alt={`${name} logo`}
        width={50}
        height={50}
        className={styles.icon}
      ></Image>
    </button>
  );
};

export default Icon;
