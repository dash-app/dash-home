import * as React from 'react';
import { Button, ButtonGroup, Col, Container, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { H1, P } from '../atoms/Core';

import styled from 'styled-components';

interface Props {
    description?: string,
    values: string[],
    status?: string,
    drop?: boolean,
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
    }

    render() {
        console.log(this.props)
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
                                        type="button"
                                        size="lg"
                                        key={e}
                                        variant={e === this.state.status ? "primary" : "secondary"}
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
    overflow-x: auto;
`

const Span = styled.span`
    display: inline-block;
`

const Icon = styled(FontAwesomeIcon)`
    font-size: 1rem;
    margin-left: 4px;
    margin-right: 4px;
`
export default List