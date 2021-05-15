import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { P } from '../components/atoms/Core';
import { NotifyError } from '../components/atoms/Notify';
import {  Spinner, ThemedModal } from '../components/atoms/Themed';
import { Controller, ControllerResult, deleteController } from '../remote-go/Controller';
import { PENDING, SUCCESS, FAILED } from '../remote-go/Status';

interface Props {
  visible: boolean,
  handleClose: any,
  whenSuccess?: any,
  controller: Controller
}

const DeleteController: React.FC<Props> = (props: Props) => {
  const { t } = useTranslation();
  const [deleteResult, setDeleteResult] = React.useState<ControllerResult | undefined>(undefined);

  const handleDelete = () => {
    deleteController(props.controller.id, setDeleteResult);
  }

  if (deleteResult && deleteResult.status === SUCCESS) {
    return (
      <ThemedModal
        size="lg"
        show={props.visible}
        backdrop="static"
        variant="dark"
        centered
        onHide={props.handleClose}
      >
        <Modal.Header>
          <Modal.Title>{t("controller.delete.title")} {props.controller.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <P>{t("controller.delete.success")}</P>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => { props.handleClose(); props.whenSuccess() }}>
            {t("button.close")}
          </Button>
        </Modal.Footer>
      </ThemedModal>
    )
  }

  return (
    <ThemedModal
      size="lg"
      show={props.visible}
      backdrop="static"
      variant="dark"
      centered
      onHide={props.handleClose}
    >
      <Modal.Header>
        <Modal.Title>{t("controller.delete.title")} {props.controller.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <P style={{ fontSize: "1.5rem" }}>{t("controller.delete.question")}</P>
        <P style={{ fontWeight: 900 }}>{t("controller.delete.confirm")}</P>
        {deleteResult && deleteResult.status === FAILED && <NotifyError title="Failed delete controller" message={`${deleteResult.error!.response?.data.error ? deleteResult.error!.response.data.error : deleteResult.error!}`} />}
      </Modal.Body>
      <Modal.Footer>
        {deleteResult && deleteResult.status === PENDING && <Spinner aria-hidden="true" />}
        <Button variant="secondary" onClick={() => props.handleClose()}>
          {t("button.cancel")}
        </Button>
        <Button variant="danger" onClick={() => handleDelete()} disabled={deleteResult && deleteResult.status === PENDING}>
          {t("button.delete")}
        </Button>
      </Modal.Footer>
    </ThemedModal>
  )
}

export default DeleteController;