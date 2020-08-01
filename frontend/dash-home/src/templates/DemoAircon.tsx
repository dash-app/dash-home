import * as React from 'react';
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import Toggle from '../components/controller/Toggle';
import Range from '../components/controller/Range';
import List from '../components/controller/List';
import Shot from '../components/controller/Shot';

interface Props { }
interface State { 
    mode: string,
    modeColor: string,
}

class DemoAircon extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            mode: "cool",
            modeColor: "#0088FF",
        }
    }

    render() {
        return (
            <Container fluid>
                <h1>demo // aircon</h1>
                <BaseCard>
                    <Card.Body>
                        <Card.Title>
                            <Icon icon={["fas", "fan"]} style={{color: "#0088FF"}}/>
                        </Card.Title>
                        <Row xs={2} md={4} lg={6}>
                            <Col>
                                <Toggle description="運転" value={false} icon={["fas", "power-off"]} />
                            </Col>
                            <Col>
                                <Range description="温度" value={20} step={0.5} from={16.0} to={31.0} suffix="℃" />
                            </Col>
                            <Col>
                                <List description="モード" values={["cool", "dry", "heat"]} status={"cool"} />
                            </Col>
                            <Col>
                                <List description="風量" values={["auto", "1", "2", "3", "4", "5"]} status={"auto"} />
                            </Col>
                        </Row>
                    </Card.Body>
                </BaseCard>
            </Container>
        )
    }
}

const BaseCard = styled(Card)`
    border-color: #0088FF;
    box-shadow: 0.1px 0px 2px 0.5px #0088FF;
`

const Icon = styled(FontAwesomeIcon)`
    font-size: 2rem;
    margin-left: 4px;
    margin-right: 4px;
`

export default DemoAircon;