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
            <div>
                <h1>demo // aircon</h1>
                <BaseCard>
                    <Card.Body>
                        <Card.Title>
                            <Icon icon={["fas", "fan"]} style={{color: "#0088FF"}}/>
                        </Card.Title>
                        <Row>
                            <Contents>
                                <Toggle description="運転" value={false} icon={["fas", "power-off"]} />
                            </Contents>
                            <Contents>
                                <Range description="温度" value={20} step={0.5} from={16.0} to={31.0} suffix="℃" />
                            </Contents>
                            <Contents>
                                <List description="モード" values={["cool", "dry", "heat"]} status={"cool"} />
                            </Contents>
                            <Contents>
                                <List drop={true} description="風量" values={["auto", "1", "2", "3", "4", "5"]} status={"auto"} />
                            </Contents>
                            <Contents>
                                <List drop={true} description="風向上下" values={["auto", "swing", "1", "2", "3", "4", "5"]} status={"auto"} />
                            </Contents>
                            <Contents>
                                <List drop={true} description="風向左右" values={["left", "mid_left", "center", "mid_right", "right", "swing"]} status={"center"} />
                            </Contents>
                        </Row>
                    </Card.Body>
                </BaseCard>
            </div>
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
const Contents = styled(Col)`
    padding-top: 12px;
    padding-bottom: 12px;
    min-width: auto;
`
export default DemoAircon;