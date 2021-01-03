import * as React from 'react';
import { LightCard } from '../components/cards/Light';
import { Controller, Light, LightState, sendLight } from '../remote-go/Controller';
import { Template } from '../remote-go/Template';
import { MiniPanelInner } from '../components/cards/MiniPanel';
import { SummonByTpl } from '../components/controller/Template';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { HR, Icon } from '../components/atoms/Themed';

interface Props {
  controller: Controller,
  template: Template,
}

interface MiniProps {
  controller: Controller,
}

export const LightMiniPanel: React.FC<MiniProps> = props => {
  console.log(props.controller)
  return (
    <LightCard name={props.controller.name}>
      <MiniPanelInner
        id={props.controller.id}
        title={props.controller.light?.last_action ? props.controller.light?.last_action : "N/A"}
        note="Mode"
        description="Light"
      />
    </LightCard>
  )
}

export const LightPanel: React.FC<Props> = props => {
  // Task - later
  const useTask = () => {
    const [taskId, setTaskId] = React.useState(-1);
    const callTimer = (f: any, time: number) => {
      const t = setTimeout(() => {
        f();
      }, time);

      console.debug(`:: Task: ${t}`);
      setTaskId(t);
    }

    const clearTimer = React.useCallback((taskId) => {
      console.debug(`:: Task > Clean: ${taskId}`);
      clearTimeout(taskId);
    }, []);

    React.useEffect(() => {
      return () => {
        clearTimer(taskId);
      }
    }, [taskId, clearTimer])

    return callTimer;
  }


  const stateToEntry = (state: LightState): Light => {
    return {
      action: state.last_action,
    }
  }

  // const stateToEntry = (entry: )

  const callTimer = useTask();
  const [light, setLight] = React.useState<Light>(stateToEntry(props.controller.light!));
  const update = (entry: Light, after?: any) => {
    setLight(entry);
    callTimer(() => {
      sendLight(props.controller.id, entry, () => {
        if (after) {
          after();
        }
      });
    }, 500);
  }

  return (
    <LightCard name={props.controller.name}>
      <Row>
        {/* Mode */}
        <Contents>
          <SummonByTpl
            description="mode"
            value={props.controller.light?.last_action}
            setter={(e: any) => light!.action = e}
            sender={(after: any) => update({ ...light! }, after)}
            action={props.template.light?.mode!}
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
            action={props.template.light?.brightness!}
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
            action={props.template.light?.color!}
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