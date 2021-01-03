import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { AirconCard } from '../components/cards/Aircon';
import List from '../components/controller/template/List';
import { Aircon, AirconState, Controller, sendAircon } from '../remote-go/Controller';
import { AirconModes as TplAirconModes, Template } from '../remote-go/Template';
import { useCallback, useEffect, useState } from 'react';
import { HR } from '../components/atoms/Themed';
import { SummonByTpl } from '../components/controller/Template';
import { MiniPanelInner } from '../components/cards/MiniPanel';
import { FanIcon, FanStep, HorizontalVaneStep, ThemedIcon, VerticalVaneStep } from '../components/atoms/DashIcon';
import { ValueSet } from '../components/controller/template/TplBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  controller: Controller,
  template: Template,
}

interface MiniProps {
  controller: Controller,
}

const AirconMiniPanel: React.FC<MiniProps> = props => {
  const aircon = props.controller.aircon!;
  return (
    <AirconCard name={props.controller.name} mode={aircon.mode}>
      {(() => {
        if (!aircon.operation) {
          return (
            <MiniPanelInner
              id={props.controller.id}
              title="OFF"
              note="operation"
              description={aircon.mode}
            />
          )
        }

        if (aircon.modes[aircon.mode].temp !== undefined) {
          return (
            <MiniPanelInner
              id={props.controller.id}
              title={aircon.modes[aircon.mode].temp.toFixed(1)}
              note="temp"
              description={aircon.mode}
            />
          )
        }

        if (aircon.modes[aircon.mode].humid !== undefined) {
          return (
            <MiniPanelInner
              id={props.controller.id}
              title={aircon.modes[aircon.mode].humid}
              note="humid"
              description={aircon.mode}
            />
          )
        }

        if (aircon.modes[aircon.mode].fan !== undefined) {
          return (
            <MiniPanelInner
              id={props.controller.id}
              title={
                <ThemedIcon style={{ fontSize: "1rem" }}>
                  <FanIcon />
                  <FanStep
                    current={aircon.modes[aircon.mode].fan}
                  />
                </ThemedIcon>
              }
              note="fan"
              description={aircon.mode}
            />
          )
        }
      })()}
    </AirconCard>
  )
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
    useEffect(() => {
      setTaskId(setTimeout(() => {
        updateSending(false)
      }, 500));
    }, [sending])

    useEffect(() => {
      return () => {
        clearTimeout(taskId);
      };
    }, [taskId]);

    const setSending = () => {
      updateSending(true);
    }

    return { sending, setSending };
  }

  const { sending, setSending } = useSendingIcon();

  const callTimer = useTask();
  const [aircon, setAircon] = useState<AirconState>(props.controller.aircon!);
  const update = (state: AirconState, after?: any) => {
    setAircon(state);
    callTimer(() => {
      sendAircon(props.controller.id, stateToEntry(state), () => {
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
    <AirconCard name={props.controller.name} mode={aircon.mode} send={sending}>
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
          <List description="mode" values={((): ValueSet[] => {
            let values: ValueSet[] = [];
            [...Array.from(modesTpl.keys())].forEach((v) => {
              values.push({
                value: v,
                displayComponent: v,
              })
            })
            return values
          })()}
            status={aircon.mode} onClick={(e: any) => {
              aircon.mode = e;
              update({ ...aircon });
            }}
          />
        </Contents>
      </Row>

      <Row>
        {/* Temp */}
        {modesTpl.get(aircon.mode)?.temp &&
          <Contents>
            <HR />
            <SummonByTpl
              title={
                <ThemedIcon>
                  <FontAwesomeIcon icon={["fas", "thermometer-three-quarters"]} />
                </ThemedIcon>
              }
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
      <Row xs={1} md={2}>
        {/* Fan */}
        {modesTpl.get(aircon.mode)?.fan &&
          <Contents>
            <HR />
            <SummonByTpl
              title={
                <ThemedIcon>
                  <FanIcon />
                  <FanStep
                    current={aircon.modes[aircon.mode].fan}
                  />
                </ThemedIcon>
              }
              description="fan"
              value={aircon.modes[aircon.mode].fan}
              setter={(e: any) => aircon.modes[aircon.mode].fan = e}
              sender={(after: any) => update({ ...aircon }, after)}
              action={modesTpl.get(aircon.mode)?.fan!}
            />
          </Contents>
        }
        <Col>
          <Row>
            {/* Horizontal Vane */}
            {modesTpl.get(aircon.mode)?.horizontal_vane &&
              <Contents>
                <HR />
                <SummonByTpl
                  title={
                    <ThemedIcon>
                      <HorizontalVaneStep
                        current={aircon.modes[aircon.mode].horizontal_vane}
                      />
                    </ThemedIcon>
                  }
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
                  title={
                    <ThemedIcon>
                      <VerticalVaneStep
                        current={aircon.modes[aircon.mode].vertical_vane}
                      />
                    </ThemedIcon>
                  }
                  description="vertical_vane"
                  value={aircon.modes[aircon.mode].vertical_vane}
                  setter={(e: any) => aircon.modes[aircon.mode].vertical_vane = e}
                  sender={(after: any) => update({ ...aircon }, after)}
                  action={modesTpl.get(aircon.mode)?.vertical_vane!}
                />
              </Contents>
            }
          </Row>
        </Col>
      </Row>
    </AirconCard>
  )
}

const Contents = styled(Col)`
  padding-top: 12px;
  padding-bottom: 12px;
  min-width: auto;
`

export {
  AirconMiniPanel,
  AirconPanel,
};