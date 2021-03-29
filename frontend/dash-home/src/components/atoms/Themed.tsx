import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from '../themes/ThemeProvider';

import {
  Spinner as BaseSpinner,
  Tabs as BaseTabs,
  Modal,
  TabsProps,
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
  const theme = React.useContext(ThemeContext).theme;
  return (
    <>
      <style type="text/css">
        {theme === "NERD_BLACK" &&
          `
            .close {
              color: #FFF;
            }
            .close:hover {
              color: #5A5A5A;
            }
            .modal-header {
              border-bottom: 1px solid #2F2F2F;
            }
            .modal-content {
              background-color: #0E0E0E;
              color: #DDD;
            }
            .modal-footer {
              border-top: 1px solid #2F2F2F;
            }
            .modal-title {
              color: #FFF;
            }
            .modal-section-title {
              color: #FFF;
            }
          `
        }
      </style>
      <Modal {...props} />
    </>
  )
}
export const Tabs = (props: TabsProps) => {
  const theme = React.useContext(ThemeContext).theme;
  return (
    <>
      <style type="text/css">
        {`
          .nav-tabs {
            border-bottom: 1px solid ${theme === "NERD_BLACK" ? "#2F2F2F" : "#ECEEEF"};
          }
          .nav-tabs .nav-link {
            background-color: initial;
            color: ${theme === "NERD_BLACK" ? "#FFFFFF" : "#5F5F5F"};
            border: none;
          }

          .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
            background-color: initial;
            color: ${theme === "NERD_BLACK" ? "#FFFFFF" : "#000000"};
            border-bottom: 2px solid #007BFF;
          }
      `}
      </style>
      <BaseTabs
        {...props}
        style={{
          color: theme === "NERD_BLACK" ? "#FFFFFF" : "#2F2F2F",
        }}
      />
    </>
  )
}

export const MenuTitle = (props: any) => {
  return (<p className={"modal-section-title"}>{props.children}</p>)
}