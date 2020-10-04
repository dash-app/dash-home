import React from 'react';
import ThemeContext from '../themes/Theme';

const H1 = (props: any) => {
    return (
        <h1
            style={{
                fontSize: "3rem",
                fontFamily: "M PLUS 1p",
                fontWeight: 300,
                color: React.useContext(ThemeContext) === "CHEEKY_WHITE" ? "#000" : "#FFFFFF"
            }} {...props}>
            {props.children}
        </h1>
    )
}

const H2 = (props: any) => {
    return (
        <h2
            style={{
                fontSize: "2rem",
                fontFamily: "M PLUS 1p",
                fontWeight: 400,
                color: React.useContext(ThemeContext) === "CHEEKY_WHITE" ? "#000" : "#FFFFFF"
            }} {...props}>
            {props.children}
        </h2>
    )
}

const H3 = (props: any) => {
    return (
        <h3
            {...props}
            style={{
                fontSize: "2rem",
                fontFamily: "M PLUS 1p",
                fontWeight: 400,
                color: React.useContext(ThemeContext) === "CHEEKY_WHITE" ? "#000" : "#FFFFFF"
            }}>
            {props.children}
        </h3>
    )
}

const P = (props: any) => {
    return (
        <p
            style={{
                fontFamily: "M PLUS 1p",
                fontWeight: 400,
                color: React.useContext(ThemeContext) === "CHEEKY_WHITE" ? "#000" : "#FFFFFF"
            }} {...props}>
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

export {
    H1,
    H2,
    H3,
    P,
    Div,
    Span
};