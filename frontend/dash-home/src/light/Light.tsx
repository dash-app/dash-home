import * as React from 'react';
import { Aircon, AirconState, Controller, sendAircon } from '../remote-go/Controller';
import { AirconModes as TplAirconModes, Template } from '../remote-go/Template';

interface Props {
  controller: Controller,
  template: Template,
}

interface MiniProps {
  controller: Controller,
}

