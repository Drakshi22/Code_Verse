import React, { useState, useEffect } from "react";
import axios from "axios";
import availableTags from "./Tags";
import { useHistory } from "react-router-dom";

export default function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState("all");
  const [tag, setTag] = useState("all");
  const [flag, setFlag] = useState(false);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/question/questionList/${difficulty}/${tag}`)
      .then((res) => setQuestions(res.data))
      .catch((err) => console.log(err));
  }, [difficulty, tag, flag]);

  return (
    <div className="container mt-5">
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h5>Filter by Difficulty</h5>
            <select
              className="form-select mt-2"
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
          <div className="card p-3 shadow-sm">
            <h5>Filter by Tag</h5>
            <select
              className="form-select mt-2"
              onChange={(e) => setTag(e.target.value)}
            >
              <option value="all">All</option>
              {availableTags.map((tag, index) => (
                <option key={index} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="card mt-5 shadow">
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Difficulty</th>
                <th>Tags</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => (
                <tr key={q._id}>
                  <td>{q.title}</td>
                  <td>
                    <span className={`badge bg-${getDifficultyColor(q.challengeDifficulty)}`}>
                      {q.challengeDifficulty}
                    </span>
                  </td>
                  <td>
                    {q.tags.map((tag, i) => (
                      <span key={i} className="badge bg-secondary me-1">
                        {tag}
                      </span>
                    ))}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-primary btn-sm me-2"
                      onClick={() => history.push("/question/" + q._id)}
                    >
                      Read
                    </button>
                   
                  </td>
                </tr>
              ))}
              {questions.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-muted">
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

// Helper to style difficulty levels
function getDifficultyColor(level) {
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
