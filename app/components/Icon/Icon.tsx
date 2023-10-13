import React from "react";
import Image from "next/image";

type IconProps = {
  name: string;
  image: string;
  callback: Function;
};

const Icon: React.FC<IconProps> = ({ name, image, callback }) => {
  const click = () => {
    callback();
  };

  return (
    <Image
      onClick={click}
      src={image}
      alt={`${name} logo`}
      width={50}
      height={50}
      priority={true}
    ></Image>
  );
};

export default Icon;
