import * as React from 'react';
import { Alert, Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { H1, P } from '../atoms/Core';

import styled from 'styled-components';

interface Props {
    description?: string,
    value?: string,
    text?: string,
}

interface State {
    variant?: string,
    value?: string,
}

class Shot extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state ={
            variant: "outline-secondary",
            value : this.props.value,
        }
    }

    onclick = () => {
        alert(this.props.value)
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <H1>
                            <Span>{this.props.description}</Span>
                        </H1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            variant = "primary"
                            type="button"
                            size="lg"
                            onClick = {() => this.onclick()}
                        >
                            {this.props.text}
                        </Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const Span = styled.span`
    display: inline-block;
`

const Icon = styled(FontAwesomeIcon)`
    font-size: 1rem;
    margin-left: 4px;
    margin-right: 4px;
`

export default Shot;