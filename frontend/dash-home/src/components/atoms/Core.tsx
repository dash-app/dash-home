import React from 'react';
import { useSelector } from 'react-redux';

const H1 = (props: any) => {
    return (
        <h1
            style={{
                fontSize: "3rem",
                fontFamily: "M PLUS 1p",
                fontWeight: 300,
                color: useSelector<any, string>((state) => state.themes.name) === "CHEEKY_WHITE" ? "#000" : "#FFFFFF"
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
                color: useSelector<any, string>((state) => state.themes.name) === "CHEEKY_WHITE" ? "#000" : "#FFFFFF"
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
                color: useSelector<any, string>((state) => state.themes.name) === "CHEEKY_WHITE" ? "#000" : "#FFFFFF"
            }} {...props}>
            {props.children}
        </p>
    )
}

const Div = (props: any) => {
    return (
        <div
            style={{
                backgroundColor: useSelector<any, string>((state) => state.themes.name) === "CHEEKY_WHITE" ? "#FFFFFF" : "#111115"
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