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

export {
    H1,
    H2,
    P,
    Div
};