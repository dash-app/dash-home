import * as React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { H1 } from '../atoms/Core';

import styled from 'styled-components';

interface Props {
    description?: string,
    value?: string,
    text?: string,
}

interface State {
    value?: string,
}

class Shot extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            value: this.props.value,
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
                            type="button"
                            size="lg"
                            onClick={() => this.onclick()}
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

export default Shot;