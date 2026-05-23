import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setGoals,
  deleteGoal,
} from "./features/goalsSlice";

import {
  getGoals,
  createGoal,
  removeGoal,
} from "./services/goalsService";

function App() {
  const dispatch = useDispatch();

  const goals = useSelector(
    (state) => state.goals.goals
  );

  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    const data = await getGoals();
    dispatch(setGoals(data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newGoal = {
      goal,
      deadline,
    };

    await createGoal(newGoal);

    loadGoals();

    setGoal("");
    setDeadline("");
  };

  const handleDelete = async (id) => {
    await removeGoal(id);

    loadGoals();
  };

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <h1>My Goals App</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Write your goal"
          value={goal}
          onChange={(e) =>
            setGoal(e.target.value)
          }
          style={{
            padding: "10px",
            flex: 1,
          }}
        />

        <input
          type="date"
          value={deadline}
          onChange={(e) =>
            setDeadline(e.target.value)
          }
          style={{
            padding: "10px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </form>

      {goals.map((goal) => (
        <div
          key={goal._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "10px",
          }}
        >
          <h3>{goal.goal}</h3>

          <p>
            Deadline: {goal.deadline}
          </p>

          <button
            onClick={() =>
              handleDelete(goal._id)
            }
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "8px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;