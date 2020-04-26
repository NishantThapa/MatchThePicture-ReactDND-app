import React from "react";
import { useDrag } from "react-dnd";
import ItemTypes from "./ItemTypes";
import { itemStyle } from "./style";

const ItemBox = ({ url, id , qid}) => {
  const [{ isDragging }, drag] = useDrag({
    item: { id, type: ItemTypes.BOX, qid},
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        let Obj = {"Storage":[{question:item},{answer:dropResult}]}
        localStorage.setItem(item.id , JSON.stringify(Obj));
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
      qid={qid}
      ref={drag}
      style={{ ...itemStyle, opacity, backgroundImage: `url(${url})` }}
    ></div>
  );
};
export default ItemBox;


