import React, { useState, useEffect } from "react";
import axios from "axios";
import EditorBox from "../EditorBox";
import availableTags from "./Tags";

export default function QuestionEditor({ id }) {
  const [question, setQuestion] = useState({});
  const tempTags = new Map();

  useEffect(() => {
    axios
      .get(`/question/${id}`)
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((err) => {
        console.log("Error while retrieving question\n" + err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeTag = (e) => {
    const { name, value } = e.target;
    if (tempTags.has(name)) tempTags.delete(name);
    else tempTags.set(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    question.tags = Array.from(tempTags.values());

    fetch(`http://localhost:5000/question/questionEditor/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(question),
    })
      .then(() => alert("Question updated successfully."))
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4">
        <h3 className="text-center mb-4">Edit Question</h3>
        <form onSubmit={handleSubmit}>
          {/* Difficulty */}
          <div className="mb-3">
            <label className="form-label">Difficulty Level</label>
            <select
              className="form-select"
              name="challengeDifficulty"
              value={question.challengeDifficulty || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="advance">Advance</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          {/* Title */}
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={question.title || ""}
              onChange={handleChange}
              required
            />
          </div>

          {/* Editors */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <EditorBox name="description" setQuestion={setQuestion} question={question} value={question.description || ""} />
          </div>

          <div className="mb-3">
            <label className="form-label">Input Format</label>
            <EditorBox name="inputFormat" setQuestion={setQuestion} question={question} value={question.inputFormat || ""} />
          </div>

          <div className="mb-3">
            <label className="form-label">Output Format</label>
            <EditorBox name="outputFormat" setQuestion={setQuestion} question={question} value={question.outputFormat || ""} />
          </div>

          <div className="mb-3">
            <label className="form-label">Sample Input</label>
            <EditorBox name="sampleInput" setQuestion={setQuestion} question={question} value={question.sampleInput || ""} />
          </div>

          <div className="mb-3">
            <label className="form-label">Sample Output</label>
            <EditorBox name="sampleOutput" setQuestion={setQuestion} question={question} value={question.sampleOutput || ""} />
          </div>

          {/* Tags */}
          <div className="mb-4">
            <label className="form-label">Tags</label>
            <div className="border rounded p-3 bg-light" style={{ maxHeight: "200px", overflowY: "scroll" }}>
              {availableTags.map((value, key) => (
                <div key={key} className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`tag-${key}`}
                    name={`tag-${key}`}
                    value={value}
                    onChange={handleChangeTag}
                    defaultChecked={question.tags?.includes(value)}
                  />
                  <label className="form-check-label badge bg-secondary text-white mx-1" htmlFor={`tag-${key}`}>
                    {value}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="d-grid">
            <button type="submit" className="btn btn-success btn-lg">
              Update Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
