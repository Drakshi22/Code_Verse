import React, { useState } from "react";
import EditorBox from "../EditorBox";
import availableTags from "./Tags";

export default function QuestionWriter() {
  const [question, setQuestion] = useState({
    userId: "",
    challengeDifficulty: "",
    title: "",
    description: "",
    inputFormat: "",
    outputFormat: "",
    sampleInput: "",
    sampleOutput: "",
    tags: [],
  });

  const tempTags = new Map();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

  const handleChangeTag = (e) => {
    const { name, value } = e.target;
    if (tempTags.has(name)) tempTags.delete(name);
    else tempTags.set(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    question.tags = Array.from(tempTags.values());
    question.userId = JSON.parse(localStorage.getItem("user"))._id;

    fetch("http://localhost:5000/question/questionWriter", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(question),
    })
      .then(() => alert("Question added successfully"))
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4">
        <h3 className="text-center mb-4">Write a New Question</h3>
        <form onSubmit={handleSubmit}>
          {/* Difficulty */}
          <div className="mb-3">
            <label className="form-label">Difficulty Level</label>
            <select
              className="form-select"
              name="challengeDifficulty"
              value={question.challengeDifficulty}
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
              placeholder="e.g. Find Longest Substring"
              value={question.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Editor Sections */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <EditorBox name="description" setQuestion={setQuestion} question={question} value={question.description} />
          </div>

          <div className="mb-3">
            <label className="form-label">Input Format</label>
            <EditorBox name="inputFormat" setQuestion={setQuestion} question={question} value={question.inputFormat} />
          </div>

          <div className="mb-3">
            <label className="form-label">Output Format</label>
            <EditorBox name="outputFormat" setQuestion={setQuestion} question={question} value={question.outputFormat} />
          </div>

          <div className="mb-3">
            <label className="form-label">Sample Input</label>
            <EditorBox name="sampleInput" setQuestion={setQuestion} question={question} value={question.sampleInput} />
          </div>

          <div className="mb-3">
            <label className="form-label">Sample Output</label>
            <EditorBox name="sampleOutput" setQuestion={setQuestion} question={question} value={question.sampleOutput} />
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
              Submit Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
