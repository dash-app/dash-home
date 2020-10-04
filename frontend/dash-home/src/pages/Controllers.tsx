import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Div, H2, Span } from "../components/atoms/Core";
import { Spinner } from "../components/atoms/Themed";
import Basement from "../components/basements/Basement";
import { Controller, ControllersResult, fetchControllers } from "../remote-go/Controller";

interface Props { }

const Controllers: React.FC<Props> = () => {
  const [controllersResult, setControllers] = useState<ControllersResult | undefined>(undefined);

  const fetch = () => {
    fetchControllers(setControllers);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Basement>
      <Container fluid="lg">
        <H2>Controllers...</H2>
        {controllersResult?.error == null && !controllersResult?.controllers ?
          <Div>
            <CustomSpinner animation="border" aria-hidden="true" />
            <Span>Loading...</Span>
          </Div>
          :
          <Div>
            {Object.values(controllersResult.controllers!).map((controller: Controller) => {
              return (
                <Div>
                  <Link to={`/controllers/${controller.id}`}>
                    <Button>{controller.name}</Button>
                  </Link>
                </Div>
              )
            })}
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