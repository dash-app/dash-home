import * as React from 'react';
import { LightCard } from '../components/cards/Light';
import { Controller, Light, LightState, sendLight } from '../remote-go/Controller';
import { MiniPanelInner } from '../components/cards/MiniPanel';
import { SummonByTpl } from '../components/controller/Template';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { HR, Icon } from '../components/atoms/Themed';
import { ControllerProps } from '../components/controller/Controller';

export const LightMiniPanel: React.FC<Controller> = controller => {
  return (
    <LightCard name={controller.name}>
      <MiniPanelInner
        id={controller.id}
        title={controller.light?.last_action ? controller.light?.last_action : "N/A"}
        note="Mode"
        description="Light"
      />
    </LightCard>
  )
}

export const LightPanel: React.FC<ControllerProps> = props => {
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
            description="mode"
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
        <Contents>
          <SummonByTpl
            title={
              <Icon icon={["fas", "sun"]} />
            }
            description="brightness"
            value={""}
            setter={(e: any) => light!.action = e}
            sender={(after: any) => update({ ...light! }, after)}
            action={props.template?.light?.brightness!}
          />
        </Contents>

        {/* Color */}
        <Contents>
          <SummonByTpl
            title={
              <Icon icon={["fas", "adjust"]} />
            }
            description="color"
            value={""}
            setter={(e: any) => light!.action = e}
            sender={(after: any) => update({ ...light! }, after)}
            action={props.template?.light?.color!}
          />
        </Contents>
      </Row>
    </LightCard>
  )
}

const Contents = styled(Col)`
  padding-top: 12px;
  padding-bottom: 12px;
  min-width: auto;
`