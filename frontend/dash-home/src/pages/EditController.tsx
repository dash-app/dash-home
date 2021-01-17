import * as React from 'react';
import { Button, Form, Modal, ModalFooter, ModalTitle, Spinner } from 'react-bootstrap';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Controller, ControllerResult, fetchController, updateController } from '../remote-go/Controller';
import { FAILED, PENDING, SUCCESS } from '../remote-go/Status';
import { NotifyError } from '../components/atoms/Notify';
import { LinkContainer } from 'react-router-bootstrap';
import { ThemedModal } from '../components/atoms/Themed';
import { Editor } from '../components/controller/Editor';
import { useTranslation } from 'react-i18next';

interface Props extends RouteComponentProps<{ id: string }> {
  controller: Controller,
  show?: boolean,
  onHide?: () => void,
}

const initial: Controller = {
  id: "",
  name: "",
  kind: "AIRCON",
  type: "REMOTE",
}

const EditController: React.FC<Props> = (props: Props) => {
  const { t } = useTranslation();
  const id = props.match.params.id;
  const [controllerResult, setControllerResult] = React.useState<ControllerResult | undefined>(undefined);

  const [postResult, setPostResult] = React.useState<ControllerResult | undefined>(undefined);
  const [controller, setController] = React.useState<Controller>(initial);

  React.useEffect(() => {
    fetchController(id, setControllerResult);
  }, [id]);

  const handleSubmit = (event: any) => {
    updateController(id, controller, setPostResult)
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <ThemedModal
      size="lg"
      show={props.show !== undefined ? props.show : true}
      keyboard={false}
      onHide={() => {
        if (props.onHide) {
          props.onHide();
        }
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton={props.onHide !== undefined}>
          <ModalTitle>{t("controller.edit.title")}</ModalTitle>
        </Modal.Header>
        <Modal.Body>
          {/* Error Message (Controller) */}
          {controllerResult?.error &&
            <NotifyError title="Failed fetch controller data" />
          }

          {controllerResult?.controller &&
            <Editor
              controller={controllerResult.controller}
              onUpdate={(c: Controller) => {
                setController(c);
              }}
            />
          }
          <div>
            {postResult && postResult.status === FAILED && <NotifyError title="Failed update controller" message={`${postResult.error!.response?.data.error ? postResult.error!.response.data.error : postResult.error!}`} />}
          </div>
        </Modal.Body>
        <ModalFooter>
          {postResult && postResult.status === PENDING && <Spinner animation="border" aria-hidden="true" />}
          {postResult && postResult.status === SUCCESS && <Redirect to="/controllers" />}
          <Button type="submit" disabled={postResult && postResult.status === PENDING}>{t("button.edit")}</Button>
          <LinkContainer exact to="/controllers">
            <Button variant="secondary">{t("button.back")}</Button>
          </LinkContainer>
        </ModalFooter>
      </Form>
    </ThemedModal>
  )
}

export default EditController;