import * as React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { H1, P } from '../../atoms/Core';

import styled from 'styled-components';

interface Props {
    description?: string,
    default: string,
    onClick?: any,
    value: string,
}

class Shot extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
        this.state = {
            currentValue: props.value,
        }
    }

    onClick = () => {
        if (this.props.onClick) {
            this.props.onClick(this.props.value);
        }
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <H1>
                            <Span>{this.props.default}</Span>
                        </H1>
                        <H1>
                            <Span>{this.props.value}</Span>
                        </H1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <P>
                            <Span>{this.props.description}</Span>
                        </P>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            type="button"
                            size="lg"
                            onClick={() => this.onClick()}
                        >
                            {this.props.default}
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