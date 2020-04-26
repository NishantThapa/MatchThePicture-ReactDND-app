import React, { useState, useRef } from "react";
import { useDragLayer } from "react-dnd";
import { ArcherContainer, ArcherElement } from "react-archer";
import Items from "./itemsObject";
import ItemsBox from "./items";
import DropBox from "./drop";
import RightIcon from './icons/right.png'
import WrongIcon from './icons/wrong.png'

import {
  FlexBox,
  MainContainer,
  ContainerBox,
  ButtonContainer,
  ButtonStyle,
  Heading,
  ImageContainer,
  ImageStyle,
  dnd
} from "./style";
let _ = require("lodash");

const Container = () => {
  window.addEventListener("load", (e) => {
    Shuffle();
  });
  useDragLayer((monitor) => ({
    draggedItem: monitor.getItem(),
  }));
  const ref = useRef("");
  const [checkAnswer, setcheckAnswer] = useState(false);
  const [items, setitems] = useState(Items);
  const [ansitems, setansitems] = useState(Items);
 

  const CheckAnswer = () => {
    setcheckAnswer(true);
  };
  const Shuffle = () => {
    setitems(_.shuffle(items));
    setansitems(_.shuffle(items))
    setcheckAnswer(false);
    localStorage.clear();
  };
  
  return (
    <div style={MainContainer}>
      <div style={Heading}>MATCHING</div>
      <div style={dnd}>Drag & Drop</div>
      <ArcherContainer strokeColor="black" strokeWidth="1" arrowLength="6">
        <div style={ContainerBox}>
           {/* ---------------------------------StartIconBox------------------------------------------- */}
        <div style={ImageContainer}>
            {items.map((res,i)=>{
              let user = JSON.parse(localStorage.getItem(i))
              let question = user && user.Storage[0].question.qid
              let answer = user && user.Storage[1].answer.aid
              return(
              <div key={i}>
              {
                <img
                  src={
                    (question === answer && question != null)
                      ? `${RightIcon}`
                      : `${WrongIcon}`
                  }
                  style={checkAnswer ? ImageStyle : { display: "none" }}
                  alt="Correct"
                />
              }
            </div>
            )})}
          </div>
          {/* ---------------------------------EndIconBox--------------------------------------------- */}
          {/* ---------------------------------StartQuestionBox------------------------------------------- */}
          <div style={FlexBox}>
            {items.map((res, i) => {
          let user = JSON.parse(localStorage.getItem(i))
          let answer = user && user.Storage[1].answer.id
           return ( 
              <ArcherElement
                key={i}
                id={i}
                relations={[
                  {
                    targetId:     `${answer + 'ans'}`,
                    targetAnchor: `${localStorage.getItem(i) ? "left" : ''}`,
                    sourceAnchor: `${localStorage.getItem(i) ? "left" : ''}`,
                  },
                ]}
              >
                <ItemsBox url={res.url} id={i} idref={ref} qid={res.id} />
              </ArcherElement>
            )
            })}
          </div>

          {/* ---------------------------------EndQuestionBox------------------------------------------*/}

          {/* ---------------------------------StartAnswerBox------------------------------------------- */}

          <div style={FlexBox}>
            {ansitems.map((res, i) => (
              <ArcherElement id={`${i + "ans"}`} key={i}>
                <DropBox url={res.url} id={i} idref={ref} aid={res.id} />
              </ArcherElement>
            ))}
          </div>

          {/* ---------------------------------EndAnswerBox------------------------------------------- */}
       
        </div>
      </ArcherContainer>

      {/* ---------------------------------StartButtonBox--------------------------------------------- */}
      <div style={ButtonContainer}>
        <button style={ButtonStyle} onClick={Shuffle}>
          Try Another
        </button>
        <button style={ButtonStyle} onClick={CheckAnswer}>
          Submit
        </button>
      </div>
      {/* ---------------------------------EndButtonBox----------------------------------------------- */}
    </div>
  );
};
export default Container;


