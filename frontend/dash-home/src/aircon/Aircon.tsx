import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { AirconCard } from '../components/cards/CardBase';
import List from '../components/controller/List';
import { Aircon, AirconState, sendAircon } from '../remote-go/Controller';
import { AirconModes as TplAirconModes, Template } from '../remote-go/Template';
import { useCallback, useEffect, useState } from 'react';
import { HR } from '../components/atoms/Themed';
import { SummonByTpl } from '../components/controller/Template';

interface Props {
  id: string,
  name: string,
  initialState: AirconState,
  template: Template,
}

const AirconPanel: React.FC<Props> = props => {
  let modesTpl: Map<string, TplAirconModes> = new Map<string, TplAirconModes>(Object.entries(props.template.aircon!.modes));

  // Task - later
  const useTask = () => {
    const [taskId, setTaskId] = useState(-1);
    const callTimer = (f: any, time: number) => {
      const t = setTimeout(() => {
        f();
      }, time);

      console.debug(`:: Task: ${t}`);
      setTaskId(t);
    }

    const clearTimer = useCallback((taskId) => {
      console.debug(`:: Task > Clean: ${taskId}`);
      clearTimeout(taskId);
    }, []);

    useEffect(() => {
      return () => {
        clearTimer(taskId);
      }
    }, [taskId, clearTimer])

    return callTimer;
  }

  const useSendingIcon = () => {
    const [taskId, setTaskId] = useState<number>(-1);
    const [sending, updateSending] = useState(false);

    const clearTimer = useCallback((taskId) => {
      clearTimeout(taskId);
    }, []);

    useEffect(() => {
      const t = setTimeout(() => {
        updateSending(false)
      }, 500);
      setTaskId(t);
      return () => {
        clearTimer(taskId);
      }
    }, [sending, clearTimer]);

    const setSending = () => {
      updateSending(true);
    }

    return { sending, setSending };
  }

  const { sending, setSending } = useSendingIcon();

  const callTimer = useTask();
  const [aircon, setAircon] = useState(props.initialState);
  const update = (state: AirconState, after?: any) => {
    setAircon(state);
    callTimer(() => {
      sendAircon(props.id, stateToEntry(state), () => {
        console.debug(stateToEntry(state));
        setSending();
        if (after) {
          after();
        }
      });
    }, 500);
  }

  const stateToEntry = (state: AirconState): Aircon => {
    return {
      operation: state.operation,
      mode: state.mode,
      ...state.modes[state.mode]
    }
  }

  return (
    <AirconCard name={props.name} mode={aircon.mode} send={sending}>
      <Row>
        {/* Operation */}
        <Contents>
          <SummonByTpl
            description="operation"
            value={aircon.operation}
            setter={(e: any) => aircon.operation = e}
            sender={(after: any) => update({ ...aircon }, after)}
            action={props.template.aircon?.operation!}
          />
        </Contents>

        {/* Mode */}
        <Contents>
          <List description="mode" values={[...Array.from(modesTpl.keys())]} status={aircon.mode} onClick={(e: any) => {
            aircon.mode = e;
            update({ ...aircon });
          }} />
        </Contents>
      </Row>

      <Row>
        {/* Temp */}
        {modesTpl.get(aircon.mode)?.temp &&
          <Contents>
            <HR />
            <SummonByTpl
              description="temp"
              value={aircon.modes[aircon.mode].temp}
              setter={(e: any) => aircon.modes[aircon.mode].temp = e}
              sender={(after: any) => update({ ...aircon }, after)}
              action={modesTpl.get(aircon.mode)?.temp!}
            />
          </Contents>
        }

        {/* Humid */}
        {modesTpl.get(aircon.mode)?.humid &&
          <Contents>
            <HR />
            <SummonByTpl
              description="humid"
              value={aircon.modes[aircon.mode].humid}
              setter={(e: any) => aircon.modes[aircon.mode].humid = e}
              sender={(after: any) => update({ ...aircon }, after)}
              action={modesTpl.get(aircon.mode)?.humid!}
            />
          </Contents>
        }
      </Row>
      <Row>
        {/* Fan */}
        {modesTpl.get(aircon.mode)?.fan &&
          <Contents>
            <HR />
            <SummonByTpl
              description="fan"
              value={aircon.modes[aircon.mode].fan}
              setter={(e: any) => aircon.modes[aircon.mode].fan = e}
              sender={(after: any) => update({ ...aircon }, after)}
              action={modesTpl.get(aircon.mode)?.fan!}
            />
          </Contents>
        }
      </Row>
      <Row>
        {/* Horizontal Vane */}
        {modesTpl.get(aircon.mode)?.horizontal_vane &&
          <Contents>
            <HR />
            <SummonByTpl
              description="horizontal_vane"
              value={aircon.modes[aircon.mode].horizontal_vane}
              setter={(e: any) => aircon.modes[aircon.mode].horizontal_vane = e}
              sender={(after: any) => update({ ...aircon }, after)}
              action={modesTpl.get(aircon.mode)?.horizontal_vane!}
            />
          </Contents>
        }
        {/* Vertical Vane */}
        {modesTpl.get(aircon.mode)?.vertical_vane &&
          <Contents>
            <HR />
            <SummonByTpl
              description="vertical_vane"
              value={aircon.modes[aircon.mode].vertical_vane}
              setter={(e: any) => aircon.modes[aircon.mode].vertical_vane = e}
              sender={(after: any) => update({ ...aircon }, after)}
              action={modesTpl.get(aircon.mode)?.vertical_vane!}
            />
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