import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteGoal, updateGoal } from '../features/goals/goalService';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';

const GoalItem = ({ goal }) => {
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState(false);
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateGoal({ ...goal, text: text }));
    setUpdating(false);
    setText('');
  };

  const handleDeleteGoal = () => {
    dispatch(deleteGoal(goal._id));
  };

  return (
    <>
      {updating ? (
        <section className='form'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <input
                type='text'
                name='text'
                id='text'
                value={text}
                placeholder='Update goal'
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className='form-group btn-container'>
              <button className='btn btn-reverse' type='submit'>
                Update
              </button>
              <button
                className='btn btn-reverse'
                type='buttton'
                onClick={(e) => {
                  e.preventDefault();
                  setUpdating(!updating);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      ) : (
        <div className='goal'>
          <div>{new Date(goal.createdAt).toLocaleString('en-IN')}</div>
          <span>
            <h3>{goal.text}</h3>
          </span>
          <button className='edit' onClick={() => setUpdating(!updating)}>
            <FaEdit />
          </button>
          <button className='close' onClick={handleDeleteGoal}>
            <FaRegTrashAlt />
          </button>
        </div>
      )}
    </>
  );
};

export default GoalItem;
