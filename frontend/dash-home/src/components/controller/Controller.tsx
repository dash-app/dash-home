import React from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, ControllerResult, fetchController } from '../../remote-go/Controller';
import { ErrorResponse, SUCCESS } from '../../remote-go/Status';
import { fetchTemplate, Template, TemplateResult } from '../../remote-go/Template';
import { Div, P, Span } from '../atoms/Core';
import { NotifyError } from '../atoms/Notify';
import { Icon, Spinner } from '../atoms/Themed';
import { CardBase } from '../cards/CardBase';
import { SummonPanel } from './SummonPanel';
import styled from 'styled-components';
import { AxiosError } from 'axios';

export interface ControllerProps {
  controller: Controller,
  template?: Template,
  sending: boolean,
  setSending: () => void,
  sendTimer: (f: any, time: number) => void,
  error?: AxiosError<ErrorResponse> | undefined,
}

interface Props {
  id: string,
}

export const ControllerUI: React.FC<Props> = props => {
  const { t } = useTranslation();
  const id = props.id;

  const [controllerResult, setController] = React.useState<ControllerResult | undefined>(undefined);
  React.useEffect(() => {
    fetchController(id, setController);
  }, [id]);

  const [templateResult, setTemplate] = React.useState<TemplateResult | undefined>(undefined);
  React.useEffect(() => {
    if (controllerResult?.status === SUCCESS) {
      fetchTemplate(id, setTemplate);
    }
  }, [id, controllerResult?.status])

  // Task
  const useTask = () => {
    const [taskId, setTaskId] = React.useState<any>(-1);
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

  const sendTimer = useTask();

  // Sending Icon
  const useSendingIcon = () => {
    const [taskId, setTaskId] = React.useState<any>(-1);
    const [sending, updateSending] = React.useState(false);
    React.useEffect(() => {
      setTaskId(setTimeout(() => {
        updateSending(false)
      }, 500));
    }, [sending])

    React.useEffect(() => {
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

  if (templateResult !== null && controllerResult !== null) {
    if (controllerResult?.error?.response?.data?.code === "ERR_CONTROLLER_NOT_FOUND") {
      return (
        <CardBase color="#2A2A2A" style={{ textAlign: "center" }}>
          <Span>
            <Icon style={{ fontSize: "4rem", marginBottom: "1rem" }} icon={["fas", "ghost"]} />
            <P style={{ fontSize: "1rem", fontWeight: 800, textTransform: "initial" }}>{t("controller.error.notfound")}</P>
          </Span>
        </CardBase>
      )
    }
  }

  return (
    <span>
      {/* Error Message (Template) */}
      {templateResult?.error &&
        <NotifyError title={t("controller.error.fetchTemplate")} />
      }

      {/* Error Message (Controller) */}
      {controllerResult?.error &&
        <NotifyError title={t("controller.error.fetchController")} />
      }

      {/* Loading Message */}
      {templateResult?.error == null &&
        templateResult == null &&
        controllerResult?.error == null &&
        controllerResult == null &&
        <Div>
          <CustomSpinner animation="border" aria-hidden="true" />
          <Span>{t("status.loading")}</Span>
        </Div>
      }

      {(templateResult != null && templateResult?.template != null &&
        controllerResult != null && controllerResult?.controller != null) &&
        <SummonPanel
          controller={controllerResult?.controller}
          template={templateResult?.template}
          sending={sending}
          setSending={setSending}
          sendTimer={sendTimer}
          error={controllerResult?.error}
        />
      }
    </span>
  )
}

const CustomSpinner = styled(Spinner)`
  margin-left: 4px;
  margin-right: 4px;
`