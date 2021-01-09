import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "react-bootstrap";
import { useTranslation } from 'react-i18next';

interface AlertProps {
  title?: string,
  message?: string,
}

export const NotifyError = (props: AlertProps) => {
  const { t } = useTranslation();
  return (
    <Alert variant="danger">
      <Alert.Heading>
        <FontAwesomeIcon style={{ marginRight: "4px" }} icon={["fas", "exclamation-triangle"]} />
        <span>{props.title ? props.title : t("error.title")}</span>
      </Alert.Heading>
      <p>{props.message ? props.message : t("error.message")}</p>
    </Alert>
  )
}