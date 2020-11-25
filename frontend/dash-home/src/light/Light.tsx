import * as React from 'react';
import { LightCard } from '../components/cards/Light';
import { Controller, Light, LightState, sendLight } from '../remote-go/Controller';
import { Template } from '../remote-go/Template';
import { MiniPanelInner } from '../components/cards/MiniPanel';
import { SummonByTpl } from '../components/controller/Template';
import { Row } from 'react-bootstrap';

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

  const entryToState = (entry: Light): LightState => {
    return {
      last_action: entry.action,
    }
  }

  // const stateToEntry = (entry: )

  // const callTimer = useTask();
  // const [light, setLight] = React.useState<Light>();
  // const update = (entry: Light, after?: any) => {
  //   setLight(entryToState(entry));
  //   callTimer(() => {
  //     sendLight(props.controller.id, entry, () => {
  //       if (after) {
  //         after();
  //       }
  //     });
  //   }, 500);
  // }

  return (
    <p>wip</p>
  )

  // return (
  //   <LightCard name={props.controller.name}>
  //     <Row>
  //       {/* Mode */}
  //       <Contents>
  //         <SummonByTpl 
  //           description="mode"
  //           value={light.last_action}
  //           setter={(e: any) => light}
  //         />
  //       </Contents>
  //     </Row>
  //   </LightCard>
  // )
}
