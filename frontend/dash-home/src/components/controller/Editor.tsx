import * as React from 'react';
import { Controller, Remote, SwitchBot } from '../../remote-go/Controller';
import { Button, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { P } from '../atoms/Core';
import RemoteChooser from '../controller/RemoteChooser';
import SwitchBotChooser from './SwitchBotChooser';
import AgentChooser from '../agent/AgentChooser';
import { useTranslation } from 'react-i18next';
import { Agent } from '../../remote-go/Agents';

interface Props {
  controller?: Controller,
  onUpdate: any,
}

const initial: Controller = {
  id: "",
  name: "",
  kind: "AIRCON",
  type: "REMOTE",
}

export const Editor: React.FC<Props> = props => {
  const { t } = useTranslation();
  const [controller, setController] = React.useState<Controller>({ ...initial });

  React.useEffect(() => {
    // Inject provided controller
    if (props.controller) {
      setController(props.controller)
    }

    props.onUpdate(controller);
  }, [props, controller])

  // Handle window state (remote/switchbot editor...)
  const [openChooser, setOpenChooser] = React.useState<boolean>(false);
  const [switchBotChooser, setSwitchBotChooser] = React.useState<boolean>(false);
  const [agentChooser, setAgentChooser] = React.useState<boolean>(false);

  return (
    <>
      {/* Name */}
      <Form.Group>
        {t("agent.useDefault")}
        <Form.Label><P>{t("controller.entry.name.title")}</P></Form.Label>
        <Form.Control
          value={controller.name}
          placeholder={t("controller.entry.name.placeholder")}
          aria-label={t("controller.entry.name.title")}
          onChange={(e: any) => {
            controller.name = e.currentTarget.value;
            setController({ ...controller });
          }}
          required
        ></Form.Control>
      </Form.Group>

      {/* Kind */}
      <Form.Group>
        <Form.Label><P>{t("controller.entry.kind")}: {controller.kind}</P></Form.Label>
        <DropdownButton title={controller.kind} drop="right">
          {["AIRCON", "LIGHT"].map((e) => {
            return (
              <Dropdown.Item
                key={e}
                onClick={() => {
                  controller.kind = e;
                  setController({ ...controller });
                }}
                active={e === controller.kind}
              >
                {e}
              </Dropdown.Item>
            )
          })}
        </DropdownButton>
      </Form.Group>

      {/* Type */}
      <Form.Group>
        <Form.Label><P>{t("controller.entry.type")}: {controller.type}</P></Form.Label>
        <DropdownButton title={controller.type} drop="right">
          {["REMOTE", "SWITCHBOT"].map((e) => {
            return (
              <Dropdown.Item
                key={e}
                onClick={() => {
                  controller.type = e;
                  setController({ ...controller });
                }}
                active={e === controller.type}
              >
                {e}
              </Dropdown.Item>
            )
          })}
        </DropdownButton>
      </Form.Group>

      {/* Show remote option (when choosed remote type) */}
      {controller.type === "REMOTE" &&
        <Form.Group>
          <Form.Label>
            {controller.remote ?
              (<P>{t("controller.entry.vendor")}: {controller.remote?.vendor + "/" + controller.remote?.model}</P>)
              :
              (<P>{t("controller.entry.vendor")}</P>)
            }
          </Form.Label>
          <div>
            <Button onClick={() => setOpenChooser(true)}>{t("controller.remote.select")}</Button>
            {/* Modal */}
            <RemoteChooser
              visible={openChooser}
              handleClose={() => setOpenChooser(false)}
              kind={controller.kind}
              handleUpdate={(remote: Remote) => {
                controller.remote = remote;
                setController({ ...controller });
              }}
            />
          </div>
        </Form.Group>
      }

      {/* Show switchbot option (when choosed switchbot type) */}
      {controller.type === "SWITCHBOT" &&
        <Form.Group>
          <Form.Label>
            <P>MAC: {controller.switchbot?.mac !== undefined && controller.switchbot?.mac}</P>
            <P>{t("controller.entry.type")}: {controller.switchbot?.type !== undefined && controller.switchbot?.type}</P>
          </Form.Label>
          <div>
            <Button onClick={() => setSwitchBotChooser(true)}>{t("controller.switchbot.openSettings")}</Button>
            <SwitchBotChooser
              initialState={controller.switchbot}
              visible={switchBotChooser}
              handleClose={() => setSwitchBotChooser(false)}
              handleUpdate={(switchbot: SwitchBot) => {
                controller.switchbot = switchbot;
                setController({ ...controller });
              }}
            />
          </div>
        </Form.Group>
      }

      {/* Extra: Agent option */}
      <Form.Group>
        <Form.Label>
          <P>{t("controller.entry.agent_id.title")}: {controller.agent_id ? controller.agent_id : t("agent.useDefault")}</P>
        </Form.Label>
        <div>
          <Button onClick={() => setAgentChooser(true)}>
            {t("agent.chooser")}
          </Button>
          <AgentChooser
            visible={agentChooser}
            checkedId={controller.agent_id && controller.agent_id}
            handleClose={() => setAgentChooser(false)}
            handleUpdate={(agent?: Agent) => {
              if (agent != null) {
                controller.agent_id = agent.id;
              } else {
                controller.agent_id = undefined;
              }
              setController({ ...controller });
              setAgentChooser(false);
            }}
          />
        </div>
      </Form.Group>
    </>
  )
}