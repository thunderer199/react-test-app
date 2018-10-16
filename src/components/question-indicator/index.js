import React from 'react';
import PropTypes from 'prop-types';

import './question-indicator.css'
import {Paper} from "material-ui";

const QuestionIndicator = ({questionNumber, isAnsweredCorrectly, click}) => {

    const getColor = (state) => {
        if (state === true)
            return '#97CF82';
        if (state === false)
            return '#D08D8D';
        return '#d0d0d0';
    };

    return (
        <Paper className="question-indicator" elevation={5} square={false}
               style={{backgroundColor: getColor(isAnsweredCorrectly)}} onClick={click}>
            <span className="question-indicator--text">
                {questionNumber}
            </span>
        </Paper>
    )
};

QuestionIndicator.propTypes = {
    questionNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    isAnsweredCorrectly: PropTypes.bool,
    click: PropTypes.func
};

export default QuestionIndicator;
