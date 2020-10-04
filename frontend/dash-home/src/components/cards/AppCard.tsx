import { Card } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import * as React from 'react';
import styled from 'styled-components';

interface Props {
  type: string,
}
interface State { }


class AppCard extends React.Component<Props, State> {
  render() {
    return (
      <Card>
        {this.card()}
      </Card>
    );
  }

  card() {
    console.debug(this.props.type);
    switch (this.props.type) {
      case "AIRCON":
        return (
          <CardContent>
            {/*  ICON */}
            <Icon icon={["fas", "fan"]} />
            {/* Temp */}
            <Title>27.5</Title>
            {/* Mode */}
            <Description>冷房</Description>
          </CardContent>
        );

      case "LIGHT":
        return (
          <CardContent>
            <Icon icon={["fas", "lightbulb"]} />
            <Title>全灯</Title>
            {/* Mode */}
            <Description>昼光色</Description>
          </CardContent>
        );
      default:
        return (
          <CardContent>
            <Icon icon={["fas", "exclamation-triangle"]} />
            <Title></Title>
            <Description>不明なデバイス</Description>
          </CardContent>
        )
    }
  }
};

// TODO: オブジェクト化してステータスベースで配色を変更させる (カード内すべて対応すること)
const Icon = styled(FontAwesomeIcon)`
  font-size: 4em;
`

const CardContent = styled.div`
  margin: 2em;
`

// TODO: テーマに対応させる
const Title = styled(Card.Title)`
  color: #000000;
  font-size: 6em;
  font-family: "M PLUS 1p";
  font-weight: 300;
`

const Description = styled(Card.Subtitle)`
  color: #000000;
  font-size: 2em;
  font-family: "M PLUS 1p";
  font-weight: 300;
`

export default AppCard;