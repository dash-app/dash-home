import React from 'react';
import styled from 'styled-components';
import ThemeContext from '../themes/Theme';

const H1 = (props: any) => {
    return (
        <h1
            {...props}
            style={{
                fontFamily: "M PLUS 1p",
                color: React.useContext(ThemeContext) === "CHEEKY_WHITE" ? "#000" : "#FFFFFF"
            }}>
            {props.children}
        </h1>
    )
}

const H2 = (props: any) => {
    return (
        <h2
            {...props}
            style={{
                fontFamily: "M PLUS 1p",
                color: React.useContext(ThemeContext) === "CHEEKY_WHITE" ? "#000" : "#FFFFFF"
            }}>
            {props.children}
        </h2>
    )
}

const H3 = (props: any) => {
    return (
        <h3
            {...props}
            style={{
                fontFamily: "M PLUS 1p",
                color: React.useContext(ThemeContext) === "CHEEKY_WHITE" ? "#000" : "#FFFFFF"
            }}>
            {props.children}
        </h3>
    )
}

const P = (props: any) => {
    return (
        <p
            {...props}
            style={{
                color: React.useContext(ThemeContext) === "CHEEKY_WHITE" ? "#000" : "#FFFFFF"
            }}>
            {props.children}
        </p>
    )
}

const Div = (props: any) => {
    return (
        <div
            style={{
                backgroundColor: React.useContext(ThemeContext) === "CHEEKY_WHITE" ? "#FFFFFF" : "#111115"
            }} {...props}>
            {props.children}
        </div>
    )
}

const Span = (props: any) => {
    return (
        <span
            {...props}
            style={{
                fontFamily: "M PLUS 1p",
                fontWeight: 400,
                color: React.useContext(ThemeContext) === "CHEEKY_WHITE" ? "#000" : "#FFFFFF",
                ...props.style
            }}>
            {props.children}
        </span>
    )
}

const Center = (props: any) => {
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

export {
    H1,
    H2,
    H3,
    P,
    Div,
    Span,
    Center
};