import React from 'react';
import { ControllerResult, fetchController } from '../../remote-go/Controller';
import { SUCCESS } from '../../remote-go/Status';
import { fetchTemplate, TemplateResult } from '../../remote-go/Template';

interface Props {
  id: string,
  children: React.ReactNode,
}

export interface ControllerState {
  controllerResult?: ControllerResult;
  templateResult?: TemplateResult;
}

const initialState: ControllerState = {
  controllerResult: undefined,
  templateResult: undefined,
}

export const ControllerContext = React.createContext<ControllerState>(initialState);

export const ControllerProvider: React.FC<Props> = props => {
  const [controllerResult, setController] = React.useState<ControllerResult | undefined>(undefined);
  React.useEffect(() => {
    fetchController(props.id, setController);
  }, [props.id]);

  const [templateResult, setTemplate] = React.useState<TemplateResult | undefined>(undefined);
  React.useEffect(() => {
    if (controllerResult?.status === SUCCESS) {
      fetchTemplate(props.id, setTemplate);
    }
  }, [props.id, controllerResult?.status])

  const [controllerState, setControllerState] = React.useState<ControllerState>(initialState);
  React.useEffect(() => {
    const state: ControllerState = {
      ...controllerState,
      controllerResult: controllerResult,
      templateResult: templateResult,
    }
    setControllerState(state)
  }, [props.id, controllerState, controllerResult, templateResult])

  return (
    <ControllerContext.Provider value={controllerState}>
      {props.children}
    </ControllerContext.Provider>
  )
}