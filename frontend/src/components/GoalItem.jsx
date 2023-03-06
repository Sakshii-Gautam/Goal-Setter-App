import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteGoal } from '../features/goals/goalService';

const GoalItem = ({ goal }) => {
  const dispatch = useDispatch();

  const handleDeleteGoal = () => {
    dispatch(deleteGoal(goal._id));
  };
  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h3>{goal.text}</h3>
      <button className='close' onClick={handleDeleteGoal}>
        X
      </button>
    </div>
  );
};

export default GoalItem;
