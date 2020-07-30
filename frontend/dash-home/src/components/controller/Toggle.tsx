import * as React from 'react';
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';


import styled from 'styled-components';

interface Props {
    title?: string,
    description?: string,
    icon?: IconProp,
    btnText?: string,
    onClick?: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void)
}
interface State { }

class Toggle extends React.Component<Props, State> {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <h1>
                            <Span>{this.props.title}</Span>
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
                            {(this.props.icon || this.props.btnText) &&
                                <Button
                                    variant="primary"
                                    type="button"
                                    onClick={this.props.onClick}
                                >
                                    {this.props.icon &&
                                        <Icon icon={this.props.icon} />
                                    }
                                    {this.props.btnText}
                                </Button>
                            }
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

export default Toggle;