import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    Button as BaseButton,
    Container as BaseContainer,
    Spinner as BaseSpinner
} from 'react-bootstrap';
import ThemeContext from '../themes/Theme';

// Button
const Button = (props: any) => {
    const theme = React.useContext(ThemeContext).theme
    // provided current (for Button Group)
    if (props.type === "radio") {
        return (
            <BaseButton
                variant={theme === "CHEEKY_WHITE" ?
                    props.selected && "primary" :
                    props.selected && "gray"
                }
                // variant={theme === "CHEEKY_WHITE" ? "primary" : "light"}
                type="button"
                {...props}
            >
                {props.children}
            </BaseButton >
        )
    } else {
        return (
            <BaseButton
                variant={theme === "CHEEKY_WHITE" ? "primary" : "gray"}
                {...props}
                selected={false}
            >
                {props.children}
            </BaseButton>
        )
    }
}

// Container
const Container = (props: any) => {
    return (
        <BaseContainer
            style={
                React.useContext(ThemeContext).theme === "CHEEKY_WHITE" ?
                    { backgroundColor: "#FFFFFF" } :
                    { backgroundColor: "#111115" }
            }
            {...props}
        >
            {props.children}
        </BaseContainer>
    )
}

const Icon = (props: any) => {
    return (
        <FontAwesomeIcon
            style={{
                color: React.useContext(ThemeContext).theme === "CHEEKY_WHITE" ? "#000" : "#FFF"
            }}
            {...props}
        >
            {props.children}
        </FontAwesomeIcon>
    )
}

const IconInvert = (props: any) => {
    return (
        <FontAwesomeIcon
            style={{
                color: React.useContext(ThemeContext).theme === "CHEEKY_WHITE" ? "#FFF" : "#000"
            }}
            {...props}
        >
            {props.children}
        </FontAwesomeIcon>
    )
}

const Spinner = (props: any) => {
    return (
        <BaseSpinner
            style={{
                color: React.useContext(ThemeContext).theme === "CHEEKY_WHITE" ? "#000" : "#FFF",
                border: "0.15em solid currentColor",
                borderRightColor: "transparent"
            }}
            {...props}
        >
            {props.children}
        </BaseSpinner>
    )
}

const SpinnerInvert = (props: any) => {
    return (
        <BaseSpinner
            style={{
                color: React.useContext(ThemeContext).theme === "CHEEKY_WHITE" ? "#FFF" : "#000",
                border: "0.15em solid currentColor",
                borderRightColor: "transparent"
            }}
            {...props}
        >
            {props.children}
        </BaseSpinner>
    )
}

const HR = (props: any) => {
    return (
        <hr 
            style={{
                borderColor: "#8080803A"
            }}
            {...props}
        />
    )
}

export {
    Button,
    Container,
    Icon,
    IconInvert,
    Spinner,
    SpinnerInvert,
    HR,
};