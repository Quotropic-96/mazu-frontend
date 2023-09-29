import Link from "next/link";
import React from "react";
import { UrlObject } from "url";
import './button.css';

const Button = (props: { link: string | UrlObject, type: string, text: string}) => {
  return <Link href={props.link} className={"generalButton "+ props.type}>{props.text}</Link>;
};

export default Button;
