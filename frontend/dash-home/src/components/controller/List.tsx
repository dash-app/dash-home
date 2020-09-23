import * as React from 'react';
import { ButtonGroup, Col, Container, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import { H1, P } from '../atoms/Core';

import styled from 'styled-components';
import { Button } from '../atoms/Themed';

interface Props {
    description?: string,
    values: string[],
    status?: string,
    drop?: boolean,
    onClick?: any,
}
interface State {
    status?: string,
    values: string[],
}

class List extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            values: this.props.values,
            status: this.props.status,
        }
    }

    onClick = (e: string) => {
        this.setState({
            status: e
        })
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <H1>
                            <Span>
                                {this.state.status}
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
                    <Col className="d-block d-sm-none">
                        <DropdownButton title={this.state.status} size="lg" drop="right">
                            {this.props.values.map((e) => {
                                return (
                                    <Dropdown.Item
                                        key={e}
                                        onClick={() => this.onClick(e)}
                                        active={e === this.state.status}
                                    >
                                        {e}
                                    </Dropdown.Item>
                                )
                            })}
                        </DropdownButton>
                    </Col>
                    <SlideContents className="d-none d-sm-inline-flex">
                        <ButtonGroup>
                            {this.props.values.map((e) => {
                                return (
                                    <Button
                                        type="radio"
                                        size="lg"
                                        key={e}
                                        selected={e === this.state.status}
                                        onClick={() => this.onClick(e)}
                                    >
                                        {e}
                                    </Button>
                                )
                            })}
                        </ButtonGroup>
                    </SlideContents>
                </Row>
            </Container>
        )
    }
}

const SlideContents = styled(Col)`
    // overflow-x: auto;
`

const Span = styled.span`
    display: inline-block;
`

export default List