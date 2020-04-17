import React from "react";
import { useDrag } from "react-dnd";
import ItemTypes from "./ItemTypes";
import { itemStyle } from "./style";

const ItemBox = ({ url, id }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { id, type: ItemTypes.BOX },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        localStorage.setItem(`${item.id}`, `${dropResult.id}`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  return (
    <div
      id={id}
      ref={drag}
      style={{ ...itemStyle, opacity, backgroundImage: `url(${url})` }}
    ></div>
  );
};
export default ItemBox;
