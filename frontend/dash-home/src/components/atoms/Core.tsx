import React from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../themes/ThemeProvider';

export const H1 = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => {
  return (
    <h1
      {...props}
      style={{
        ...props.style,
        color: React.useContext(ThemeContext).theme === "CHEEKY_WHITE" ? "#000" : "#FFFFFF"
      }}>
      {props.children}
    </h1>
  )
}

export const H2 = (props: any) => {
  return (
    <h2
      {...props}
      style={{
        color: React.useContext(ThemeContext).theme === "CHEEKY_WHITE" ? "#000" : "#FFFFFF"
      }}>
      {props.children}
    </h2>
  )
}

export const H3 = (props: any) => {
  return (
    <h3
      {...props}
      style={{
        color: React.useContext(ThemeContext).theme === "CHEEKY_WHITE" ? "#000" : "#FFFFFF"
      }}>
      {props.children}
    </h3>
  )
}

export const P = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => {
  return (
    <p
      {...props}
      style={{
        ...props.style,
        color: React.useContext(ThemeContext).theme === "CHEEKY_WHITE" ? "#000" : "#FFFFFF"
      }}>
      {props.children}
    </p>
  )
}

export const Div = (props: any) => {
  return (
    <div
      style={{
      }} {...props}>
      {props.children}
    </div>
  )
}

export const Span = (props: any) => {
  return (
    <span
      {...props}
      style={{
        color: React.useContext(ThemeContext).theme === "CHEEKY_WHITE" ? "#000" : "#FFFFFF",
        ...props.style
      }}>
      {props.children}
    </span>
  )
}

export const Center = (props: any) => {
  const Div = styled.div`
        position: absolute;
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        -webkit-transform: translateY(-50%) translateX(-50%);
    `
  return (
    <Div
      {...props}
    >
      {props.children}
    </Div>
  )
}