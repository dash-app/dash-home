import * as React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from '../themes/ThemeProvider';

import {
  Spinner as BaseSpinner,
  Modal,
} from 'react-bootstrap';

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

export const ThemedModal = (props: any) => {
  switch (React.useContext(ThemeContext).theme) {
    case "NERD_BLACK":
      return (<DarkModal {...props} />)
    default:
      return (<Modal {...props} />)
  }
}

const DarkModal = styled(Modal)`
  .close {
    color: #FFF;
  }
  .modal-header {
    border-bottom: 1px solid #2F2F2F;
  }
  .modal-footer {
    border-top: 1px solid #2F2F2F;
  }
  .modal-title {
    color: #FFF;
  }
  .modal-content {
    background-color: #111112;
    border: none;
  }
`;