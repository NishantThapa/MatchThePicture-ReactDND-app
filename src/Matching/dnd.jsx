import React, { useState, useRef } from "react";
import { useDragLayer } from "react-dnd";
import { ArcherContainer, ArcherElement } from "react-archer";
import Items from "./itemsObject";
import MatchBox from "./matchBox";
import ItemsBox from "./items";
import DropBox from "./drop";
import {
	FlexBox,
	MainContainer,
	ContainerBox,
	ButtonContainer,
	ButtonStyle,
	Heading,
	ImageContainer,
	ImageStyle,
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
	const [qsol1, setqsol1] = useState("");
	const [qsol2, setqsol2] = useState("");
	const [checkAnswer, setcheckAnswer] = useState(false);
	const [items, setitems] = useState(Items);
	const [match, setmatch] = useState(MatchBox);
	const ItemObj = {
		q1: "",
		q2: "",
	};
	const q1 = localStorage.getItem("q1");
	const q2 = localStorage.getItem("q2");
	if (q1) {
		ItemObj.q1 = localStorage.getItem("q1");
	}
	if (q2) {
		ItemObj.q2 = localStorage.getItem("q2");
	}
	const CheckAnswer = () => {
		q1 === "a1" ? setqsol1("true") : setqsol1("false");
		q2 === "a2" ? setqsol2("true") : setqsol2("false");
		setcheckAnswer(true);
	};
	const Shuffle = () => {
		setitems(_.shuffle(items));
		setmatch(_.shuffle(match));
		setcheckAnswer(false);
		setqsol1("");
		setqsol2("");
		localStorage.clear();
	};
	return (
		<div style={MainContainer}>
			<div style={Heading}>MATCHING</div>
			<ArcherContainer strokeColor="black" strokeWidth="1" arrowLength="6">
				<div style={ContainerBox}>
					<div style={FlexBox}>
						<ArcherElement
							id="q1"
							relations={[
								{
									targetId: `${ItemObj.q1}`,
									targetAnchor: `${q1 ? "left" : ""}`,
									sourceAnchor: `${q1 ? "left" : ""}`,
								},
							]}
						>
							<ItemsBox url={items[0].url} id={"q1"} idref={ref} />
						</ArcherElement>
						<ArcherElement
							id="q2"
							relations={[
								{
									targetId: `${ItemObj.q2}`,
									targetAnchor: `${q2 ? "left" : ""}`,
									sourceAnchor: `${q2 ? "left" : ""}`,
								},
							]}
						>
							<ItemsBox url={items[1].url} id={"q2"} idref={ref} />
						</ArcherElement>
					</div>

					<div style={FlexBox}>
						<ArcherElement id="a1">
							<DropBox
								url={items[0].url}
								backgroundview={
									qsol1 === "true" && qsol2 === "true" ? "cover" : match[0]
								}
								id={"a1"}
							/>
						</ArcherElement>
						<ArcherElement id="a2">
							<DropBox
								url={items[1].url}
								backgroundview={
									qsol1 === "true" && qsol2 === "true" ? "cover" : match[1]
								}
								id={"a2"}
							/>
						</ArcherElement>
					</div>
					<div style={ImageContainer}>
						<div>
							{
								<img
									src={
										qsol1 === "true"
											? "http://www.clker.com/cliparts/G/F/D/c/j/r/correct-md.png"
											: "http://clipart-library.com/data_images/49127.png"
									}
									style={checkAnswer ? ImageStyle : { display: "none" }}
									alt="Correct"
								/>
							}
						</div>
						<div>
							{
								<img
									src={
										qsol2 === "true"
											? "http://www.clker.com/cliparts/G/F/D/c/j/r/correct-md.png"
											: "http://clipart-library.com/data_images/49127.png"
									}
									style={checkAnswer ? ImageStyle : { display: "none" }}
									alt="Wrong"
								/>
							}
						</div>
					</div>
				</div>
			</ArcherContainer>
			<div style={ButtonContainer}>
				<button style={ButtonStyle} onClick={Shuffle}>
					Shuffle
        </button>
				<button style={ButtonStyle} onClick={CheckAnswer}>
					Check
        </button>
			</div>
		</div>
	);
};
export default Container;
