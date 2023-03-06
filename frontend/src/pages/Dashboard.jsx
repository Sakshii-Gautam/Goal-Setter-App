import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGoals } from '../features/goals/goalService';
import GoalForm from '../components/GoalForm';
import { resetGoals } from '../features/goals/goalSlice';
import Spinner from '../components/Spinner';
import GoalItem from '../components/GoalItem';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals, isError, isLoading, message } = useSelector(
    (state) => state.goals
  );
  useEffect(() => {
    // if (isError) console.log(message);
    if (!user) navigate('/login');

    dispatch(getGoals());

    //Clearing the goals when leaving the dashboard
    return () => {
      dispatch(resetGoals());
    };
  }, [user, navigate, dispatch, isError, message]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />

      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any Goals!</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
