import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { AirconCard } from '../components/cards/CardBase';
import List from '../components/controller/List';
import Toggle from '../components/controller/Toggle';
import Range from '../components/controller/Range';
import { Aircon, AirconModes, AirconState } from '../remote-go/Controller';
import { Action, AirconModes as TplAirconModes, Template } from '../remote-go/Template';

interface Props {
  aircon: AirconState,
  template: Template,
}

const AirconPanel: React.FC<Props> = props => {
  let modesTpl: Map<string, TplAirconModes> = new Map<string, TplAirconModes>(Object.entries(props.template.aircon!.modes));
  let modesCtrl: Map<string, any> = new Map<string, any>(Object.entries(props.aircon.modes));
  // const tes = Object.values(modesTpl.get("cool")!);
  const tes = new Map<string, Action>(Object.entries(modesTpl.get(props.aircon.mode)!));
  const mo = new Map<string, any>(Object.entries(modesCtrl.get(props.aircon.mode)!));
  // console.log(modesTpl.get(props.aircon.mode));

  mo.forEach((v, k) => {
    console.log(`${k}: ${v}`);
  })

  let entries: any = [];
  // v: template values (Action)
  // k: value name (ex: operation, temp, vertical_vane etc...)
  tes.forEach((v, k) => {
    switch (v.type) {
      case "RANGE":
        entries.push(
          <Contents key={k}>
            <Range description={k} value={mo.get(k)} step={v.range.step} from={v.range.from} to={v.range.to} suffix={v.range.suffix ? v.range.suffix : ""} />
          </Contents>
        )
        break;
      case "LIST":
        entries.push(
          <Contents key={k}>
            <List description={k} values={v.list} status={mo.get(k)} />
          </Contents>
        )
        break;
      default:
        entries.push(
          <Contents key={k}>
            <p>ERROR</p>
          </Contents>
        )
    }
  })

  return (
    <AirconCard mode={props.aircon.mode}>
      <Row>
        {/* Operation */}
        <Contents>
          <Toggle description="operation" value={props.aircon.operation} icon={["fas", "power-off"]} />
        </Contents>

        {/* Mode */}
        <Contents>
          <List description="mode" values={[...Array.from(modesTpl.keys())]} status={props.aircon.mode} />
        </Contents>

        {/* Modes entries... */}
        {entries.map((e: any) => {
          return e
        })}
      </Row>
    </AirconCard>
  )
}

const Contents = styled(Col)`
  padding-top: 12px;
  padding-bottom: 12px;
  min-width: auto;
`

export default AirconPanel;