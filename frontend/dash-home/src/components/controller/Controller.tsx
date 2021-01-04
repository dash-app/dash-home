import { Controller } from '../../remote-go/Controller';
import { Template } from '../../remote-go/Template';

export interface ControllerProps {
  controller: Controller,
  template?: Template,
  sending: boolean,
  setSending: () => void,
  sendTimer: (f: any, time: number) => void,
}