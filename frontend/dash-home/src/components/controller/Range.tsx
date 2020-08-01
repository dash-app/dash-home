import * as React from 'react';
import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styled from 'styled-components';

interface Props {
    description?: string,
    value: number,
    step: number,
    from: number,
    to: number,
    prefix?: string,
    suffix?: string,
}
interface State {
    value: number,
}

class Range extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            value: this.props.value,
        }
    }

    onIncrementEvent = () => {
        this.setState({
            value: this.state.value + this.props.step,
        })
    }

    onDecrementEvent = () => {
        this.setState({
            value: this.state.value - this.props.step,
        })
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h1>
                            <Span>
                                {this.state.value.toFixed(1)}
                                {this.props.suffix!}
                            </Span>
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>
                            <Span>{this.props.description}</Span>
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ButtonGroup>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={this.onDecrementEvent}
                                disabled={this.state.value <= this.props.from}
                                size="lg"
                            >
                                <Icon icon={["fas", "chevron-down"]} />
                            </Button>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={this.onIncrementEvent}
                                disabled={this.state.value >= this.props.to}
                                size="lg"
                            >
                                <Icon icon={["fas", "chevron-up"]} />
                            </Button>
                        </ButtonGroup>
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

export default Range