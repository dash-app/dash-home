import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom'
import { Center, Div, P, Span } from '../components/atoms/Core';
import { Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import { Button, Container, Icon, Spinner } from '../components/atoms/Themed';
import Basement from '../components/basements/Basement';
import { NotifyError } from '../components/atoms/Notify';
import { SummonPanel } from '../components/controller/SummonPanel';
import { CardBase } from '../components/cards/CardBase';
import { ControllerResult, fetchController } from '../remote-go/Controller';
import { fetchTemplate, TemplateResult } from '../remote-go/Template';
import { SUCCESS } from '../remote-go/Status';

interface Props extends RouteComponentProps<{ id: string }> { }

const Controller: React.FC<Props> = props => {
  const id = props.match.params.id;

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

  const sendTimer = useTask();

  // Sending Icon
  const useSendingIcon = () => {
    const [taskId, setTaskId] = React.useState<number>(-1);
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
        <Basement>
          <Container fluid="lg">
            <Center>
              <CardBase color="#2A2A2A">
                <Span>
                  <Icon style={{ fontSize: "4rem", marginBottom: "1rem" }} icon={["fas", "ghost"]} />
                  <P style={{ fontSize: "1rem", fontWeight: 800, textTransform: "initial" }}>This controller does not exist...</P>
                </Span>
              </CardBase>
            </Center>
          </Container>
        </Basement>
      )
    }
  }

  return (
    <Basement>
      <Container fluid="lg">
        {/* Error Message (Template) */}
        {templateResult?.error &&
          <NotifyError title="Failed fetch template data" />
        }

        {/* Error Message (Controller) */}
        {controllerResult?.error &&
          <NotifyError title="Failed fetch controller data" />
        }
        <Navbar>
          <Navbar.Brand>
            {/* Loading Message */}
            {templateResult?.error == null &&
              templateResult == null &&
              controllerResult?.error == null &&
              controllerResult == null ?
              <Div>
                <CustomSpinner animation="border" aria-hidden="true" />
                <Span>Loading...</Span>
              </Div>
              :
              <Div>
                <Link to="/">
                  <Button>{"Back"}</Button>
                </Link>
              </Div>
            }
          </Navbar.Brand>
        </Navbar>

        {(templateResult != null && templateResult?.template != null &&
          controllerResult != null && controllerResult?.controller != null) &&
          <SummonPanel
            controller={controllerResult?.controller}
            template={templateResult?.template}
            sending={sending}
            setSending={setSending}
            sendTimer={sendTimer}
          />
        }
      </Container>
    </Basement>
  )
}

const CustomSpinner = styled(Spinner)`
  margin-left: 4px;
  margin-right: 4px;
`

export default Controller;