import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react"
import { Alert } from "react-bootstrap";

interface AlertProps {
  title?: string,
  message?: string,
}

export const NotifyError = (props: AlertProps) => {
  return (
    <Alert variant="danger">
      <Alert.Heading>
        <FontAwesomeIcon style={{ marginRight: "4px" }} icon={["fas", "exclamation-triangle"]} />
        <span>{props.title ? props.title : "Something went wrong!"}</span>
      </Alert.Heading>
      <p>{props.message ? props.message : "(Please see console.)"}</p>
    </Alert>
  )
}