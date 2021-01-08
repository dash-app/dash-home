import React from 'react';
import { ThemeContext } from '../themes/ThemeProvider';
import { Fan1, Fan2, Fan3, Fan4, Fan5, FanSymbol } from '../../svg/aircon/fan';
import { HorizontalVane, HorizontalVane51, HorizontalVane52, HorizontalVane53, HorizontalVane54, HorizontalVane55, HorizontalVaneSwing } from '../../svg/aircon/horizontal_vane';
import { VerticalVane, VerticalVaneCenter, VerticalVaneCenterLeft, VerticalVaneCenterRight, VerticalVaneLeft, VerticalVaneMidLeft, VerticalVaneMidRight, VerticalVaneRight, VerticalVaneSide, VerticalVaneSwing } from '../../svg/aircon/vertical_vane';

interface DashIconProps {
  icon: "fan",
  value?: any,
}

interface FanProps {
  current: string,
  default?: string,
}

interface HorizontalVaneProps {
  current: string,
  default?: string,
}

interface VerticalVaneProps {
  current: string,
  default?: string,
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
      return (<>{props.default}</>)
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
      return (<>{props.default}</>)
  }
}

export const VerticalVaneStep = (props: VerticalVaneProps) => {
  switch (props.current) {
    case "left": return (<VerticalVaneLeft {...props} />)
    case "mid_left": return (<VerticalVaneMidLeft {...props} />)
    case "center": return (<VerticalVaneCenter {...props} />)
    case "mid_right": return (<VerticalVaneMidRight {...props} />)
    case "right": return (<VerticalVaneRight {...props} />)
    case "center_left": return (<VerticalVaneCenterLeft {...props} />)
    case "center_right": return (<VerticalVaneCenterRight {...props} />)
    case "side": return (<VerticalVaneSide {...props} />)
    case "swing": return (<VerticalVaneSwing {...props} />)
    case "keep": return (<VerticalVane {...props} />)
    default:
      return (<>{props.default}</>)
  }
}