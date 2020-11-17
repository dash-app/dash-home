import * as React from 'react';
import { Modal, Button } from 'react-bootstrap';
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
          <Modal.Title>// Delete Controller: {props.controller.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Removed.</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => { props.handleClose(); props.whenSuccess() }}>
            Close
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
        <Modal.Title>// Delete Controller: {props.controller.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Are you sure you want to delete this item?</h6>
        <p style={{ fontWeight: 900 }}>This operation cannot be undone!</p>
        {deleteResult && deleteResult.status === FAILED && <NotifyError title="Failed delete controller" message={`${deleteResult.error!.data.error ? deleteResult.error!.data.error : deleteResult.error!.data}`} />}
      </Modal.Body>
      <Modal.Footer>
        {deleteResult && deleteResult.status === PENDING && <Spinner aria-hidden="true" />}
        <Button variant="secondary" onClick={() => props.handleClose()}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => handleDelete()} disabled={deleteResult && deleteResult.status === PENDING}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteController;