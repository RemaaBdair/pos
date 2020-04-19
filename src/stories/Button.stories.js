import React from "react";
import { MyButton } from "../components/Button";
import { withKnobs, text, color } from "@storybook/addon-knobs";
export default {
  title: "Button",
  decorators: [withKnobs],
};

export const LogInButton = () => {
  const bgColor = color("BackGroundColor", "#1861ab");
  const colorr = color("Color", "#ffffff");
  return (
    <MyButton bgColor={bgColor} color={colorr}>
      {text("Label", "LogIn")}
    </MyButton>
  );
};