import React from 'react';
import { css } from '@emotion/css';
import { ThemeContext } from '../themes/ThemeProvider';
import { GetThemeEntry } from '../themes/Theme';

export const H1 = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => {
  return (
    <h1
      {...props}
      className={`${props.className != undefined ? props.className : ""} text-${GetThemeEntry(React.useContext(ThemeContext).theme).variant.name}`}
    >
      {props.children}
    </h1>
  );
};

export const Div = (props: any) => {
  return (
    <div
      {...props}
      className={`${GetThemeEntry(React.useContext(ThemeContext).theme).variant.name}`}
    >
      {props.children}
    </div>
  );
};

export const Span = (props: any) => {
  return (
    <span
      {...props}
      style={{
        color: React.useContext(ThemeContext).theme === 'CHEEKY_WHITE' ? '#000' : '#FFFFFF',
        ...props.style
      }}>
      {props.children}
    </span>
  );
};

export const Center = (props: any) => {
  const style = css`
    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    -webkit-transform: translateY(-50%) translateX(-50%);
  `;
  return (
    <Div
      className={style}
      {...props}
    >
      {props.children}
    </Div>
  );
};