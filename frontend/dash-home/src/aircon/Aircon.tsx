import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { AirconCard } from '../components/cards/CardBase';
import List from '../components/controller/List';
import Toggle from '../components/controller/Toggle';
import Range from '../components/controller/Range';
import { Aircon, AirconModes, AirconState } from '../remote-go/Controller';
import { Action, AirconModes as TplAirconModes, Template } from '../remote-go/Template';
import { useEffect, useState } from 'react';

interface Props {
  aircon: AirconState,
  template: Template,
}

interface SummonProps {
  onChange?: any,
  description: string,
  value: any,
  action: Action,
  // setter?: React.Dispatch<React.SetStateAction<any>>,
  setter?: any,
}

function SummonByTpl(props: SummonProps) {
  switch (props.action.type) {
    case "LIST":
      return (
        <List description={props.description} values={props.action.list} status={props.value} onClick={props.setter && ((e: any) => {
          props.setter(e);
        })}/>
      )
      break;
    case "RANGE":
      return (
        <Range
          description={props.description}
          value={props.value}
          step={props.action.range.step}
          from={props.action.range.from}
          to={props.action.range.to}
          suffix={props.action.range.suffix ? props.action.range.suffix : ""}
          onClick={props.setter && ((e: any) => {
            props.setter(e);
          })}
        />
      )
      break;

    case "TOGGLE":
      return (
        <Toggle description={props.description} value={props.value} icon={["fas", "power-off"]} onClick={props.setter && ((e: any) => {
          props.setter(e);
        })}/>
      )
      break;
    // case "SHOT":
    //   break;
    // case "MULTIPLE":
    //   break;
    default:
      return (<p>** Unknown **</p>)
  }
}

const AirconPanel: React.FC<Props> = props => {
  let modesTpl: Map<string, TplAirconModes> = new Map<string, TplAirconModes>(Object.entries(props.template.aircon!.modes));
  let modesEntry: Map<string, AirconModes> = new Map<string, AirconModes>(Object.entries(props.aircon.modes));

  console.log(modesTpl);

  // TODO: このままでは下記returnしているところが毎回全部再描画されて重いので良い感じにする
  const [operation, setOperation] = useState(props.aircon.operation);
  const [mode, setMode] = useState(props.aircon.mode);
  const [temp, setTemp] = useState(props.aircon.modes[props.aircon.mode].temp);
  const [humid, setHumid] = useState(props.aircon.modes[props.aircon.mode].humid);
  const [fan, setFan] = useState(props.aircon.modes[props.aircon.mode].fan);
  const [horizontalVane, setHorizontalVane] = useState(props.aircon.modes[props.aircon.mode].horizontal_vane);
  const [verticalVane, setVerticalVane] = useState(props.aircon.modes[props.aircon.mode].vertical_vane);

  useEffect(() => {
    console.log(`Updated: ${operation} ${mode} ${temp} ${humid} ${fan} ${horizontalVane} ${verticalVane}`);
  })

  return (
    <AirconCard mode={props.aircon.mode}>
      <Row>
        {/* Operation */}
        <Contents>
          <SummonByTpl description="operation" value={operation} setter={setOperation} action={props.template.aircon?.operation!} />
        </Contents>

        {/* Mode */}
        <Contents>
          <List description="mode" values={[...Array.from(modesTpl.keys())]} status={mode} onClick={(e: any) => {
            setMode(e);
          }}/>
        </Contents>

        {/* Temp */}
        {modesTpl.get(props.aircon.mode)?.temp &&
          <Contents>
            <SummonByTpl description="temp" value={temp} setter={setTemp} action={modesTpl.get(props.aircon.mode)?.temp!} />
          </Contents>
        }

        {/* Humid */}
        {modesTpl.get(props.aircon.mode)?.humid &&
          <Contents>
            <SummonByTpl description="humid" value={humid} setter={setHumid} action={modesTpl.get(props.aircon.mode)?.humid!} />
          </Contents>
        }

        {/* Fan */}
        {modesTpl.get(props.aircon.mode)?.fan &&
          <Contents>
            <SummonByTpl description="fan" value={fan} setter={setFan} action={modesTpl.get(props.aircon.mode)?.fan!} />
          </Contents>
        }

        {/* Horizontal Vane */}
        {modesTpl.get(props.aircon.mode)?.horizontal_vane &&
          <Contents>
            <SummonByTpl description="horizontal_vane" value={horizontalVane} setter={setHorizontalVane} action={modesTpl.get(props.aircon.mode)?.horizontal_vane!} />
          </Contents>
        }

        {/* Vertical Vane */}
        {modesTpl.get(props.aircon.mode)?.vertical_vane &&
          <Contents>
            <SummonByTpl description="vertical_vane" value={verticalVane} setter={setVerticalVane} action={modesTpl.get(props.aircon.mode)?.vertical_vane!} />
          </Contents>
        }
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