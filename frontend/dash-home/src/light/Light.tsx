import * as React from 'react';
import { LightCard } from '../components/cards/Light';
import { Controller, Light, LightState, sendLight } from '../remote-go/Controller';
import { MiniPanelInner } from '../components/cards/MiniPanel';
import { SummonByTpl } from '../components/controller/Template';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { HR, Icon } from '../components/atoms/Themed';
import { ControllerProps } from '../components/controller/Controller';
import { useTranslation } from 'react-i18next';

export const LightMiniPanel: React.FC<Controller> = controller => {
  const { t } = useTranslation();
  return (
    <MiniPanelInner
      id={controller.id}
      title={
        controller.light?.last_action ?
          t([`controller.light.mode.${controller.light?.last_action}`, '_'], { value: controller.light?.last_action }) : "N/A"}
      note={t("controller.light.mode.name")}
      description={t("controller.light.name")}
    />
  )
}

export const LightPanel: React.FC<ControllerProps> = props => {
  const { t } = useTranslation();
  const stateToEntry = (state: LightState): Light => {
    return {
      action: state.last_action,
    }
  }

  const [light, setLight] = React.useState<Light>(stateToEntry(props.controller.light!));
  const update = (entry: Light, after?: any) => {
    setLight(entry);
    props.sendTimer(() => {
      props.setSending();
      sendLight(props.controller.id, entry, () => {
        if (after) {
          after();
        }
      });
    }, 500);
  }

  return (
    <LightCard name={props.controller.name} send={props.sending}>
      <Row>
        {/* Mode */}
        <Contents>
          <SummonByTpl
            description={t("controller.light.mode.name")}
            i18nKey="controller.light.mode"
            value={props.controller.light?.last_action}
            setter={(e: any) => light!.action = e}
            sender={(after: any) => update({ ...light! }, after)}
            action={props.template?.light?.mode!}
          />
        </Contents>
      </Row>
      <HR />
      <Row>
        {/* Bightness */}
        {props.template?.light?.brightness &&
          <Contents>
            <SummonByTpl
              title={
                <Icon icon={["fas", "sun"]} />
              }
              description={t("controller.light.brightness.name")}
              i18nKey="controller.light.brightness"
              value={""}
              setter={(e: any) => light!.action = e}
              sender={(after: any) => update({ ...light! }, after)}
              action={props.template?.light?.brightness!}
            />
          </Contents>
        }
        {/* Color */}
        {props.template?.light?.color &&
          <Contents>
            <SummonByTpl
              title={
                <Icon icon={["fas", "adjust"]} />
              }
              description={t("controller.light.color.name")}
              i18nKey="controller.light.color"
              value={""}
              setter={(e: any) => light!.action = e}
              sender={(after: any) => update({ ...light! }, after)}
              action={props.template?.light?.color!}
            />
          </Contents>
        }
      </Row>
    </LightCard>
  )
}

const Contents = styled(Col)`
  padding-top: 12px;
  padding-bottom: 12px;
  min-width: auto;
`