import React, { useEffect, useState } from "react";
import { Container, Nav, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Div, H2, Span } from "../components/atoms/Core";
import { NotifyError } from "../components/atoms/Notify";
import { Button, Spinner } from "../components/atoms/Themed";
import Basement from "../components/basements/Basement";
import { Controller, ControllersResult, fetchControllers } from "../remote-go/Controller";
import DeleteController from "./DeleteController";

interface Props { }

const Controllers: React.FC<Props> = () => {
  const [controllersResult, setControllers] = useState<ControllersResult | undefined>(undefined);
  const [deleteQueue, setDeleteQueue] = React.useState<Controller | null>(null);

  const fetch = () => {
    fetchControllers(setControllers);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Basement>
      <Container fluid="lg">
        {deleteQueue != null &&
          <DeleteController
            controller={deleteQueue}
            handleClose={() => setDeleteQueue(null)}
            whenSuccess={() => fetch()}
            visible={deleteQueue != null}
          />
        }
        <Nav>
          <Nav.Item>
            <Link to="/">
              <Button>Back</Button>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/controllers/new">
              <Button>New</Button>
            </Link>
          </Nav.Item>
        </Nav>
        <H2>Controllers...</H2>
        {controllersResult?.error ?
          <NotifyError title="Failed fetch controllers" />
          :
          !controllersResult?.controllers ?
            <Div>
              <CustomSpinner animation="border" aria-hidden="true" />
              <Span>Loading...</Span>
            </Div>
            :
            <Div>
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
                          {/* <Button onClick={() => { setShow(true) }}>Edit</Button> */}
                          <Link to={`/controllers/${controller.id}/edit`}>
                            <Button>Edit</Button>
                          </Link>
                          <Button variant="danger" onClick={() => {
                            setDeleteQueue(controller)
                          }}>Delete</Button>
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