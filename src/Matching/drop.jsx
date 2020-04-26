import React from "react";
import { useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import {dropStyle} from './style'
const DropBox = ({ url, id , aid }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: () => ({ id: id, aid: aid }),
  });
  return (
    <div
      id={id}
      aid={aid}
      ref={drop}
      style={{
        ...dropStyle,
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
      }}
    ></div>
  );
};
export default DropBox;
