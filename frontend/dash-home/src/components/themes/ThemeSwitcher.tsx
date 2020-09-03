import { ButtonGroup } from 'react-bootstrap';
import { Button } from '../atoms/Themed';

import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { setThemes } from '../../actions/themes';
import { ThemeAction } from '../../reducers/themes/type';
import { P } from '../atoms/Core';

interface Props {
    name?: string,
    setThemes?: any
}
interface State { }

const mapStateToProps = (store: {themes: ThemeAction}) => {
    return {
        name: store.themes.name,
    }
}

const mapDispatchToProps = (dispatch: Dispatch, Props: Props) => ({    
    setThemes(name: string) {
        dispatch(setThemes(name))
    }
});

class ThemeSwitcher extends React.Component<Props, State> {
    render() {
        return (
            <div>
                <span>
                    <P>Current: {this.props.name}</P>
                </span>
                <ButtonGroup>
                    <Button
                        type="radio"
                        onClick={() => {
                            this.props.setThemes("CHEEKY_WHITE")
                        }}
                        key={"CHEEKY_WHITE"}
                        selected={this.props.name === "CHEEKY_WHITE"}
                    >
                        Cheeky White
                    </Button>
                    <Button
                        type="radio"
                        onClick={() => {
                            this.props.setThemes("NERD_BLACK")
                        }}
                        key={"NERD_BLACK"}
                        selected={this.props.name === "NERD_BLACK"}
                    >
                        Nerd Black
                    </Button>
                </ButtonGroup>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitcher);