import React from "react";
import { useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import {dropStyle} from './style'
const DropBox = ({ url, backgroundview, id }) => {
  const [{isOver ,canDrop}, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: () => ({ id: `${id}` }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  return (
    <div
      id={id}
      ref={drop}
      style={{
        ...dropStyle,
        backgroundImage: `url(${url})`,
        backgroundSize: `${backgroundview}`,
      }}
    ></div>
  );
};
export default DropBox;
