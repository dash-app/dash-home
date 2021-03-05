import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { AirconCard } from '../components/cards/Aircon';
import List from '../components/controller/template/List';
import { Aircon, AirconState, Controller, sendAircon } from '../remote-go/Controller';
import { AirconModes as TplAirconModes } from '../remote-go/Template';
import { useState } from 'react';
import { HR } from '../components/atoms/Themed';
import { SummonByTpl } from '../components/controller/Template';
import { MiniPanelInner } from '../components/cards/MiniPanel';
import { FanIcon, FanStep, HorizontalVaneStep, ThemedIcon, VerticalVaneStep } from '../components/atoms/DashIcon';
import { ValueSet } from '../components/controller/template/TplBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ControllerProps } from '../components/controller/Controller';
import { useTranslation } from 'react-i18next';

const AirconMiniPanel: React.FC<Controller> = controller => {
  const { t } = useTranslation();
  const aircon = controller.aircon!;

  if (!aircon.operation) {
    return (
      <MiniPanelInner
        id={controller.id}
        title={t("controller.aircon.operation.off")}
        note={t("controller.aircon.operation.name")}
        description={t([`controller.aircon.mode.${aircon.mode}`, '_'], { value: aircon.mode })}
      />
    )
  }

  if (aircon.modes[aircon.mode].temp !== undefined) {
    return (
      <MiniPanelInner
        id={controller.id}
        title={aircon.modes[aircon.mode].temp.toFixed(1)}
        note={t("controller.aircon.temp.name")}
        description={t([`controller.aircon.mode.${aircon.mode}`, '_'], { value: aircon.mode })}
      />
    )
  }

  if (aircon.modes[aircon.mode].humid !== undefined) {
    return (
      <MiniPanelInner
        id={controller.id}
        title={aircon.modes[aircon.mode].humid}
        note={t("controller.aircon.humid.name")}
        description={t([`controller.aircon.mode.${aircon.mode}`, '_'], { value: aircon.mode })}
      />
    )
  }

  if (aircon.modes[aircon.mode].fan !== undefined) {
    return (
      <MiniPanelInner
        id={controller.id}
        title={
          <ThemedIcon style={{ fontSize: "1rem" }}>
            <FanIcon />
            <FanStep
              current={aircon.modes[aircon.mode].fan}
              default={t([`controller.aircon.fan.${aircon.modes[aircon.mode].fan}`, '_'], { value: aircon.modes[aircon.mode].fan })}
            />
          </ThemedIcon>
        }
        note={t("controller.aircon.fan.name")}
        description={t([`controller.aircon.mode.${aircon.mode}`, '_'], { value: aircon.mode })}
      />
    )
  }

  return (
    <MiniPanelInner
      id={controller.id}
      title={<></>}
      note={t("controller.aircon.fan.name")}
      description={t([`controller.aircon.mode.${aircon.mode}`, '_'], { value: aircon.mode })}
    />
  )
}

const AirconPanel: React.FC<ControllerProps> = props => {
  const { t } = useTranslation();
  let modesTpl: Map<string, TplAirconModes> = new Map<string, TplAirconModes>(Object.entries(props.template!.aircon!.modes));

  const [aircon, setAircon] = useState<AirconState>(props.controller.aircon!);
  const update = (state: AirconState, after?: any) => {
    setAircon(state);
    props.sendTimer(() => {
      props.setSending();
      sendAircon(props.controller.id, stateToEntry(state), () => {
        console.debug(stateToEntry(state));
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
    <AirconCard name={props.controller.name} mode={aircon.mode} send={props.sending}>
      <Row>
        {/* Operation */}
        <Contents>
          <SummonByTpl
            description={t("controller.aircon.operation.name")}
            i18nKey={"controller.aircon.operation"}
            value={aircon.operation}
            setter={(e: any) => aircon.operation = e}
            sender={(after: any) => update({ ...aircon }, after)}
            action={props.template?.aircon?.operation!}
          />
        </Contents>

        {/* Mode */}
        <Contents>
          <Container fluid>
            <List
              description={t("controller.aircon.mode.name")}
              i18nKey={"controller.aircon.mode"}
              values={((): ValueSet[] => {
                let values: ValueSet[] = [];
                [...Array.from(modesTpl.keys())].forEach((v) => {
                  values.push({
                    value: v,
                    displayComponent: t(`controller.aircon.mode.${v}`),
                  })
                })
                return values
              })()}
              status={aircon.mode} onClick={(e: any) => {
                aircon.mode = e;
                update({ ...aircon });
              }}
            />
          </Container>
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
                  <FontAwesomeIcon style={{ marginRight: "0.5rem" }} icon={["fas", "thermometer-three-quarters"]} />
                </ThemedIcon>
              }
              description={t("controller.aircon.temp.name")}
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
              title={
                <ThemedIcon>
                  <FontAwesomeIcon style={{ marginRight: "0.1rem" }} icon={["fas", "tint"]} />
                  <span style={{ paddingLeft: "0.1em" }}>{aircon.modes[aircon.mode].humid}</span>
                </ThemedIcon>
              }
              description={t("controller.aircon.humid.name")}
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
              title={
                <ThemedIcon>
                  <FanIcon />
                  <FanStep
                    current={aircon.modes[aircon.mode].fan}
                    default={t([`controller.aircon.fan.${aircon.modes[aircon.mode].fan}`, '_'], { value: aircon.modes[aircon.mode].fan })}
                  />
                </ThemedIcon>
              }
              description={t("controller.aircon.fan.name")}
              i18nKey={"controller.aircon.fan"}
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
                        default={t([`controller.aircon.horizontalVane.${aircon.modes[aircon.mode].horizontal_vane}`, '_'], { value: aircon.modes[aircon.mode].horizontal_vane })}
                      />
                    </ThemedIcon>
                  }
                  description={t("controller.aircon.horizontalVane.name")}
                  i18nKey={"controller.aircon.horizontalVane"}
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
                        default={t([`controller.aircon.verticalVane.${aircon.modes[aircon.mode].vertical_vane}`, '_'], { value: aircon.modes[aircon.mode].vertical_vane })}
                      />
                    </ThemedIcon>
                  }
                  description={t("controller.aircon.verticalVane.name")}
                  i18nKey={"controller.aircon.verticalVane"}
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