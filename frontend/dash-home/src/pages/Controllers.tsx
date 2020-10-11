import React, { useEffect, useState } from "react";
import { Container, Modal, Nav, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Div, H2, Span } from "../components/atoms/Core";
import { Button, Spinner } from "../components/atoms/Themed";
import Basement from "../components/basements/Basement";
import { Controller, ControllersResult, fetchControllers } from "../remote-go/Controller";

interface Props { }

interface EditorProps {
  show: boolean,
  handleClose: any,
}

const Editor: React.FC<EditorProps> = (props: EditorProps) => {
  return (
    <Modal
      show={props.show}
      backdrop="static"
      onHide={props.handleClose}
      keyboard={false}
      variant="dark"
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit: ***</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        // WIP
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => { props.handleClose() }}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

const Controllers: React.FC<Props> = () => {
  const [controllersResult, setControllers] = useState<ControllersResult | undefined>(undefined);
  const [show, setShow] = useState<boolean>(false);

  const fetch = () => {
    fetchControllers(setControllers);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Basement>
      <Container fluid="lg">
        <Nav>
          <Nav.Item>
            <Link to="/">
              <Button>Back</Button>
            </Link>
          </Nav.Item>
        </Nav>
        <H2>Controllers...</H2>
        {controllersResult?.error == null && !controllersResult?.controllers ?
          <Div>
            <CustomSpinner animation="border" aria-hidden="true" />
            <Span>Loading...</Span>
          </Div>
          :
          <Div>
            <Editor show={show} handleClose={() => { setShow(false) }} />
            <Table hover variant="dark">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Kind</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(controllersResult.controllers!).map((controller: Controller) => {
                  return (
                    <tr key={controller.id}>
                      <td>{controller.id}</td>
                      <td>
                        <Link to={`/controllers/${controller.id}`}>
                          <Button>{controller.name}</Button>
                        </Link>
                      </td>
                      <td>{controller.kind}</td>
                      <td>
                        <Button onClick={() => { setShow(true) }}>Edit</Button>
                      </td>
                    </tr>
                  )
                })
                }
              </tbody>
            </Table>
          </Div>
        }
      </Container>
    </Basement>
  )
}

const CustomSpinner = styled(Spinner)`
  margin-left: 4px;
  margin-right: 4px;
`

export default Controllers;