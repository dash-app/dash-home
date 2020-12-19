import React from 'react';
import { ThemeContext } from '../themes/ThemeProvider';
import FanSymbol from '../../svg/FanSymbol';
import Fan1 from '../../svg/Fan1';
import Fan2 from '../../svg/Fan2';
import Fan3 from '../../svg/Fan3';
import Fan4 from '../../svg/Fan4';
import Fan5 from '../../svg/Fan5';
import HorizontalVane from '../../svg/HorizontalVane';
import HorizontalVaneSwing from '../../svg/HorizontalVaneSwing';
import HorizontalVane51 from '../../svg/HorizontalVane51';
import HorizontalVane52 from '../../svg/HorizontalVane52';
import HorizontalVane53 from '../../svg/HorizontalVane53';
import HorizontalVane54 from '../../svg/HorizontalVane54';
import HorizontalVane55 from '../../svg/HorizontalVane55';

interface DashIconProps {
  icon: "fan",
  value?: any,
}

interface FanProps {
  current: string,
}

interface HorizontalVaneProps {
  current: string,
}

export const ThemedIcon = (props: any) => {
  return (
    <span style={{ fill: React.useContext(ThemeContext).theme === "CHEEKY_WHITE" ? "#000" : "#FFFFFF" }}>
      {props.children}
    </span>
  )
}

export const DashIcon = (props: DashIconProps) => {
  switch (props.icon) {
    case "fan":
      return (<FanIcon />)
    // case "fan_1":
    //   return (<FanStep current="1" />)
  }
}

export const FanIcon = (props: any) => {
  return (<FanSymbol style={{ fill: React.useContext(ThemeContext).theme === "CHEEKY_WHITE" ? "#000" : "#FFFFFF" }} {...props} />)
}

export const FanStep = (props: FanProps) => {
  switch (props.current) {
    case "1": return (<Fan1 {...props} />)
    case "2": return (<Fan2 {...props} />)
    case "3": return (<Fan3 {...props} />)
    case "4": return (<Fan4 {...props} />)
    case "5": return (<Fan5 {...props} />)
    default:
      return (<>{props.current}</>)
  }
}

export const HorizontalVaneStep = (props: HorizontalVaneProps) => {
  switch (props.current) {
    case "1": return (<HorizontalVane51 {...props} />)
    case "2": return (<HorizontalVane52 {...props} />)
    case "3": return (<HorizontalVane53 {...props} />)
    case "4": return (<HorizontalVane54 {...props} />)
    case "5": return (<HorizontalVane55 {...props} />)
    case "swing": return (<HorizontalVaneSwing {...props} />)
    case "keep": return (<HorizontalVane {...props} />)
    default:
      return (<>{props.current}</>)
  }
}