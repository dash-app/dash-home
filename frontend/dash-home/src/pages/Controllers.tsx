import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Container, Nav, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Div, H1, Span } from "../components/atoms/Core";
import { NotifyError } from "../components/atoms/Notify";
import { Button, Spinner } from "../components/atoms/Themed";
import Basement from "../components/basements/Basement";
import { Controller, ControllersResult, fetchControllers } from "../remote-go/Controller";
import DeleteController from "./DeleteController";
import { LinkContainer } from 'react-router-bootstrap';

interface Props { }

const Controllers: React.FC<Props> = () => {
  const { t } = useTranslation();
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
        <H1>{t("controller.list.title")}</H1>
        <Nav>
          <Nav.Item>
            <LinkContainer to="/">
              <Button>
                <FontAwesomeIcon icon={["fas", "arrow-left"]} />
                <span style={{ paddingLeft: "0.5rem" }}>{t("button.back")}</span>
              </Button>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/controllers/new">
              <Button>
                <FontAwesomeIcon icon={["fas", "plus"]} />
                <span style={{ paddingLeft: "0.5rem" }}>{t("button.add")}</span>
              </Button>
            </LinkContainer>
          </Nav.Item>
        </Nav>
        {controllersResult?.error ?
          <NotifyError title={t("controller.error.fetchControllers")} />
          :
          !controllersResult?.controllers ?
            <Div>
              <CustomSpinner animation="border" aria-hidden="true" />
              <Span>{t("status.loading")}</Span>
            </Div>
            :
            <Div>
              <Table variant="dark">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>{t("controller.entry.name.title")}</th>
                    <th>{t("controller.entry.kind")}</th>
                    <th>{t("controller.entry.options")}</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(controllersResult.controllers!).map((controller: Controller) => {
                    return (
                      <tr key={controller.id}>
                        <td>{controller.id}</td>
                        <td>
                          <LinkContainer to={`/controllers/${controller.id}`}>
                            <Button>{controller.name}</Button>
                          </LinkContainer>
                        </td>
                        <td>{controller.kind}</td>
                        <td>
                          {/* <Button onClick={() => { setShow(true) }}>Edit</Button> */}
                          <LinkContainer to={`/controllers/${controller.id}/edit`}>
                            <Button>
                              <FontAwesomeIcon icon={["fas", "edit"]} />
                              <span style={{ paddingLeft: "0.5rem" }}>{t("button.edit")}</span>
                            </Button>
                          </LinkContainer>
                          <Button variant="danger" onClick={() => {
                            setDeleteQueue(controller)
                          }}>
                            <FontAwesomeIcon icon={["fas", "trash"]} />
                            <span style={{ paddingLeft: "0.5rem" }}>{t("button.delete")}</span>
                          </Button>
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