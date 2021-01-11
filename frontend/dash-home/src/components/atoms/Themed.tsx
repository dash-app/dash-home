import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from '../themes/ThemeProvider';

import {
  Button as BaseButton,
  Spinner as BaseSpinner
} from 'react-bootstrap';

// Button
export const Button = (props: any) => {
  const theme = React.useContext(ThemeContext).theme
  // provided current (for Button Group)
  if (props.type === "radio") {
    return (
      <BaseButton
        variant={theme === "CHEEKY_WHITE" ?
          props.selected && "primary" :
          props.selected && "gray"
        }
        // variant={theme === "CHEEKY_WHITE" ? "primary" : "light"}
        type="button"
        {...props}
      >
        {props.children}
      </BaseButton >
    )
  } else {
    return (
      <BaseButton
        variant={theme === "CHEEKY_WHITE" ? "primary" : "gray"}
        {...props}
        selected={false}
      >
        {props.children}
      </BaseButton>
    )
  }
}

export const Icon = (props: any) => {
  return (
    <FontAwesomeIcon
      style={{
        color: React.useContext(ThemeContext).theme === "CHEEKY_WHITE" ? "#000" : "#FFF"
      }}
      {...props}
    >
      {props.children}
    </FontAwesomeIcon>
  )
}

export const IconInvert = (props: any) => {
  return (
    <FontAwesomeIcon
      style={{
        color: React.useContext(ThemeContext).theme === "CHEEKY_WHITE" ? "#FFF" : "#000"
      }}
      {...props}
    >
      {props.children}
    </FontAwesomeIcon>
  )
}

export const Spinner = (props: any) => {
  return (
    <BaseSpinner
      style={{
        color: React.useContext(ThemeContext).theme === "CHEEKY_WHITE" ? "#000" : "#FFF",
        border: "0.15em solid currentColor",
        borderRightColor: "transparent"
      }}
      {...props}
    >
      {props.children}
    </BaseSpinner>
  )
}

export const SpinnerInvert = (props: any) => {
  return (
    <BaseSpinner
      style={{
        color: React.useContext(ThemeContext).theme === "CHEEKY_WHITE" ? "#FFF" : "#000",
        border: "0.15em solid currentColor",
        borderRightColor: "transparent"
      }}
      {...props}
    >
      {props.children}
    </BaseSpinner>
  )
}

export const HR = (props: any) => {
  return (
    <hr
      style={{
        borderColor: "#8080803A"
      }}
      {...props}
    />
  )
}