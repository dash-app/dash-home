import * as React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NotifyError } from '../components/atoms/Notify';
import { Spinner } from '../components/atoms/Themed';
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
      <Modal
        size="lg"
        show={props.visible}
        backdroup="static"
        variant="dark"
        animation={false}
        centered
        onHide={props.handleClose}
      >
        <Modal.Header>
          <Modal.Title>{t("controller.delete.title")} {props.controller.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>{t("controller.delete.success")}</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => { props.handleClose(); props.whenSuccess() }}>
            {t("button.close")}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  return (
    <Modal
      size="lg"
      show={props.visible}
      backdroup="static"
      variant="dark"
      animation={false}
      centered
      onHide={props.handleClose}
    >
      <Modal.Header>
        <Modal.Title>{t("controller.delete.title")} {props.controller.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>{t("controller.delete.question")}</h6>
        <p style={{ fontWeight: 900 }}>{t("controller.delete.confirm")}</p>
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
    </Modal>
  )
}

export default DeleteController;