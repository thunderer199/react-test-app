import React from "react";
import {List, ListItem} from "material-ui";


const identity = (...args) => args;

const Question = ({question, dispatch = identity}) => {
    const {name, answers = []} = question;

    const onClick = (id) => dispatch({answer: id, question: question.id});
    const getElement = ({value, id}) => {
        const isDisabled = question.isAnsweredCorrectly !== void 0;
        return (
            <ListItem disabled={isDisabled}
                      className="answer-element"
                      style={{margin: 4, backgroundColor: isDisabled ? '#ababab' : 'initial'}}
                      key={id} onClick={() => onClick(id)}>{value}</ListItem>
        );
    };
    return (
        <div>
            <h4>{name}</h4>
            <List>{answers.map(getElement)}</List>
        </div>
    )
};

export default Question;