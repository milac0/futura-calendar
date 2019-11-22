import React, { Fragment } from "react";
//mui
import Button from "@material-ui/core/Button";

const FilterTime = ({ filterBy }) => {
  return (
    <Fragment>
      <Button onClick={() => filterBy(1)}>Day</Button>
      <Button onClick={() => filterBy(7)}>Week</Button>
      <Button onClick={() => filterBy(30)}>Month</Button>
    </Fragment>
  );
};

export default FilterTime;
