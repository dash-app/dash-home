import * as React from 'react';
import { Container, Form, Modal, ModalTitle, ModalFooter } from 'react-bootstrap';
import { Controller, ControllerResult, createController } from '../remote-go/Controller';
import { FAILED, PENDING, SUCCESS } from '../remote-go/Status';
import { Redirect } from 'react-router-dom';
import { Spinner, Button, ThemedModal } from '../components/atoms/Themed';
import { Editor } from '../components/controller/Editor';
import { NotifyError } from '../components/atoms/Notify';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from 'react-router-bootstrap';

interface Props { }

const NewController: React.FC<Props> = () => {
  const { t } = useTranslation();

  const [controller, setController] = React.useState<Controller | undefined>(undefined);
  const [postResult, setPostResult] = React.useState<ControllerResult | undefined>(undefined);

  const handleSubmit = (event: any) => {
    if (controller) {
      createController(controller, setPostResult)
    }
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <ThemedModal
      size="lg"
      show={true}
      keyboard={false}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <ModalTitle>{t("controller.create.title")}</ModalTitle>
        </Modal.Header>
        <Modal.Body>
          <Editor onUpdate={((c: Controller) => {
            setController(c);
          })} />
          <div>
            {postResult && postResult.status === FAILED && <NotifyError title="Failed create controller" message={`${postResult.error!.response?.data.error ? postResult.error!.response.data.error : postResult.error!}`} />}
          </div>
        </Modal.Body>
        <ModalFooter>
          {postResult && postResult.status === PENDING && <Spinner animation="border" aria-hidden="true" />}
          {postResult && postResult.status === SUCCESS && <Redirect to="/controllers" />}
          <Button type="submit" disabled={postResult && postResult.status === PENDING}>{t("button.add")}</Button>
          <LinkContainer exact to="/controllers">
            <Button variant="secondary">{t("button.back")}</Button>
          </LinkContainer>
        </ModalFooter>
      </Form>
    </ThemedModal>
  )
}

export default NewController;