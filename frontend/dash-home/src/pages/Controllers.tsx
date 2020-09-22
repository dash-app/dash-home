import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/atoms/Themed";
import Basement from "../components/basements/Basement";

interface Props { }

const Controllers: React.FC<Props> = props => {
  return (
    <Basement>
      <Link to="/controllers/843b801d-db9c-11ea-a405-5a0dc9c53c1f">
        <Button>Controller...</Button>
      </Link>
    </Basement>
  )
}

export default Controllers;