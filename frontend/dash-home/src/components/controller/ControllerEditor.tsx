import * as React from 'react';
import { Container, Modal, Form, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Controller } from '../../remote-go/Controller';
import { FAILED, PENDING, Status, SUCCESS } from '../../remote-go/Status';
import { IconInvert, SpinnerInvert } from '../atoms/Themed';
import { LinkContainer } from 'react-router-bootstrap';

interface Props {
  controller: Controller,
  handleSubmit: any,
  status: Status,
}

const ControllerEditor: React.FC<Props> = (props: Props) => {
  const { t } = useTranslation();
  const [controller, setController] = React.useState<Controller>(props.controller);

  const handleSubmit = (event: any) => {
    props.handleSubmit(controller);
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <Container fluid="lg">
      <Modal
        show={true}
        backdrop="static"
        keyboard={false}
        variant="dark"
        animation={false}
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title>{t("controller.edit.title")} {controller.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            {/* Name */}
            <Form.Group>
              <Form.Label>{t("controller.entry.name.title")}</Form.Label>
              <Form.Control
                placeholder={t("controller.entry.name.placeholder")}
                aria-label={t("controller.entry.name.title")}
                defaultValue={controller.name}
                onChange={(e: any) => {
                  controller.name = e.currentTarget.value;
                  setController(controller);
                }}
                required
              />
            </Form.Group>

            {/* Kind */}
            <Form.Group controlId="formGridKind">
              <Form.Label>{t("controller.entry.kind")}</Form.Label>
              <Form.Control
                aria-label={t("controller.entry.kind")}
                as="select"
                defaultValue={controller.kind}
                onChange={(e: any) => {
                  controller.kind = e.currentTarget.value;
                  setController(controller);
                }}
              >
                <option>AIRCON</option>
              </Form.Control>
            </Form.Group>

            {/* Type */}
            <Form.Group>
              <Form.Label>{t("controller.entry.type")}</Form.Label>
              <Form.Control
                aria-label={t("controller.entry.type")}
                as="select"
                defaultValue={controller.type}
                required
                onChange={(e: any) => {
                  controller.kind = e.currentTarget.value;
                  setController(controller);
                }}
              >
                <option>REMOTE</option>
              </Form.Control>
            </Form.Group>

            {/* Remote */}
            <Form.Row>
              <Col>
                <Form.Control
                  placeholder={t("controller.entry.vendor")}
                  defaultValue={controller.remote?.vendor}
                  onChange={(e: any) => {
                    controller.remote!.vendor = e.currentTarget.value;
                    setController(controller);
                  }}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder={t("controller.entry.model")}
                  defaultValue={controller.remote?.model}
                  onChange={(e: any) => {
                    controller.remote!.model = e.currentTarget.value;
                    setController(controller);
                  }}
                />
              </Col>
            </Form.Row>
          </Modal.Body>
          <Modal.Footer>
            {props.status === PENDING && <SpinnerInvert aria-hidden="true" />}
            {props.status === SUCCESS && <IconInvert icon={["fas", "check"]} />}
            {props.status === FAILED && <IconInvert icon={["fas", "exclamation-triangle"]} />}
            <Button type="submit" disabled={props.status === PENDING}>{t("button.update")}</Button>
            <LinkContainer exact to="/controllers">
              <Button variant="secondary">{t("button.back")}</Button>
            </LinkContainer>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}

export default ControllerEditor;