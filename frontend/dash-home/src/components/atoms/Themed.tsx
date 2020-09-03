import * as React from 'react';
import { useSelector } from 'react-redux';

import {
    Button as BaseButton,
    Container as BaseContainer
} from 'react-bootstrap';

// Button
const Button = (props: any) => {
    const theme = useSelector<any, string>((state) => state.themes.name)
    // provided current (for Button Group)
    if (props.type === "radio") {
        return (
            <BaseButton
                variant={theme === "CHEEKY_WHITE" ?
                    props.selected ? "primary" : "light" :
                    props.selected ? "primary" : "gray"
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
                variant={theme === "CHEEKY_WHITE" ? "primary" : "primary"}
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
                useSelector<any, string>((state) => state.themes.name) === "CHEEKY_WHITE" ?
                    { backgroundColor: "#FFFFFF" } :
                    { backgroundColor: "#111115" }
            }
            {...props}
        >
            {props.children}
        </BaseContainer>
    )
}

export {
    Button,
    Container
};