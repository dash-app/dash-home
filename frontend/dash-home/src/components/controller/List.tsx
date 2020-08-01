import * as React from 'react';
import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styled from 'styled-components';

interface Props {
    description?: string,
    values: string[],
    status?: string,
}
interface State {
    status?: string,
    values: string[],
    variant?: string,
}

function setvariant() {
    var btn = <Button/>
    
}

class List extends React.Component<Props, State> {

    constructor(props: Props){
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
        styled(Button)`
        
        `
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h1>
                            <Span>
                                {this.state.status}
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
export default List