import React, { useState, useEffect } from "react";
import axios from "axios";
import availableTags from "./Tags";
import { useHistory } from "react-router-dom";

export default function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState("all");
  const [flag, setFlag] = useState(false);
  const [tag, setTag] = useState("all");
  const history = useHistory();

  useEffect(() => {
    axios
      .get(
        `/question/MyQuestionList/${JSON.parse(localStorage.getItem("user"))._id}/${difficulty}/${tag}`
      )
      .then((res) => setQuestions(res.data))
      .catch(console.error);
  }, [difficulty, tag, flag]);

  const handleDelete = (e) => {
    const confirmBox = window.confirm("Do you really want to delete this Question?");
    if (confirmBox) {
      axios
        .delete("/question/" + e.target.id)
        .then((res) => {
          alert(res.data.message);
          setFlag(!flag);
        })
        .catch((err) => alert(err.message));
    }
  };

  return (
    <div className="container mt-5">
      {/* Filters */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <h5 className="mb-2">Filter by Difficulty</h5>
            <select
              className="form-select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="all">All</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="advance">Advance</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <h5 className="mb-2">Filter by Tag</h5>
            <select
              className="form-select"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            >
              <option value="all">All</option>
              {availableTags.map((value, index) => (
                <option value={value} key={index}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm">
        <div className="card-header bg-black text-white">
          <h5 className="mb-0">Your Questions</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Difficulty</th>
                <th>Tags</th>
                <th>View</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((item) => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>
                    <span className={`badge bg-${getBadgeColor(item.challengeDifficulty)}`}>
                      {item.challengeDifficulty}
                    </span>
                  </td>
                  <td>
                    {item.tags.map((tag, idx) => (
                      <span className="badge bg-secondary me-1" key={idx}>
                        {tag}
                      </span>
                    ))}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-success"
                      onClick={() => history.push("/question/" + item._id)}
                      title="Read"
                    >
                      <i className="bi bi-eye" />
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => history.push("/question/editor/" + item._id)}
                      title="Edit"
                    >
                      <i className="bi bi-pencil-square" />
                    </button>
                  </td>
                  <td>
                    <button
                      id={item._id}
                      className="btn btn-sm btn-outline-danger"
                      onClick={handleDelete}
                      title="Delete"
                    >
                      <i className="bi bi-trash" />
                    </button>
                  </td>
                </tr>
              ))}
              {questions.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No questions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Utility for badge color based on difficulty
function getBadgeColor(level) {
  switch (level.toLowerCase()) {
    case "easy":
      return "success";
    case "medium":
      return "warning";
    case "hard":
    case "advance":
      return "danger";
    case "expert":
      return "dark";
    default:
      return "secondary";
  }
}
