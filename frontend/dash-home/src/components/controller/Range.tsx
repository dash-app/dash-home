import * as React from 'react';
import { ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { H1, P } from '../atoms/Core';

import styled from 'styled-components';
import { Button } from '../atoms/Themed';

interface Props {
    description?: string,
    value: number,
    step: number,
    from: number,
    to: number,
    prefix?: string,
    suffix?: string,
    onClick?: any,
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
        if (this.props.onClick) {
            this.props.onClick(this.state.value + this.props.step);
        }
    }

    onDecrementEvent = () => {
        this.setState({
            value: this.state.value - this.props.step,
        })
        if (this.props.onClick) {
            this.props.onClick(this.state.value - this.props.step);
        }
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <H1>
                            <Span>
                                {this.state.value.toFixed(1)}
                                {this.props.suffix!}
                            </Span>
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
                        <ButtonGroup>
                            <Button
                                type="button"
                                size="lg"
                                onClick={this.onDecrementEvent}
                                disabled={this.state.value <= this.props.from}
                            >
                                <Icon icon={["fas", "chevron-down"]} />
                            </Button>
                            <Button
                                type="button"
                                size="lg"
                                onClick={this.onIncrementEvent}
                                disabled={this.state.value >= this.props.to}
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