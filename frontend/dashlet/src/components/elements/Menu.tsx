import { Button, Modal } from 'react-bootstrap';
import { RELEASE_VERSION } from '../../config';

interface Props {
  show: boolean,
  handleClose: () => void,
};

export const Menu = (props: Props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>MENU</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <p>Version: {RELEASE_VERSION}</p>
        </Modal.Footer>
      </Modal>
    </>
  );
};