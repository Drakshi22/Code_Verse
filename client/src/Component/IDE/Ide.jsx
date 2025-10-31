import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import languages from "./Language";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Ide(props) {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("c");
  const [saveFileName, setSaveFileName] = useState("");
  const [codeId, setCodeId] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (props.codeId !== "") {
      const url = `http://localhost:5000/code/getCode/${props.codeId}`;
      axios.get(url)
        .then(res => {
          setCode(res.data.code);
          setLanguage(res.data.language);
          setCodeId(props.codeId);
          setSaveFileName(res.data.fileName);
        })
        .catch(err => console.error("Error retrieving code:", err));
    }
  }, []);

  const handleRun = (e) => {
    e.preventDefault();
    setIsRunning(true);
    axios.post("http://localhost:5000/ide/", {
      code,
      input,
      language,
    }).then(res => {
      setOutput(res.data.output);
      setIsRunning(false);
    });
  };

  const handleEditorChange = (value) => setCode(value);
  const handleInputChange = (value) => setInput(value);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Copied to clipboard!");
  };

  const handleSave = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (props.save) {
      if (!saveFileName) {
        const fileName = prompt("Enter file name:", "fileName");
        if (!fileName) return toast.error("File name can't be blank!");
        setSaveFileName(fileName);
      }
      const url = codeId 
        ? `http://localhost:5000/code/updatecode/${codeId}` 
        : `http://localhost:5000/code/savecode`;
      const method = codeId ? axios.put : axios.post;
      const body = {
        code,
        fileName: saveFileName,
        language,
        user
      };
      const response = await method(url, body);
      if (!codeId) setCodeId(response.data.id);
      toast.success(response.data.message);
    }
  };

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = saveFileName || "myFile";
    document.body.appendChild(element);
    element.click();
  };

  const showFile = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = (e) => setCode(e.target.result);
    reader.readAsText(e.target.files[0]);
  };

  return (
    <div className="container-fluid bg-dark text-light p-3" style={{ height: "95vh" }}>
      <ToastContainer position="bottom-right" theme="dark" />

      <div className="row">
        <div className="col-md-8">
          <div className="bg-secondary rounded shadow-sm mb-3 p-2">
            <div className="d-flex justify-content-between align-items-center">
              <select
                className="form-select w-auto bg-dark text-light"
                onChange={(e) => setLanguage(e.target.value)}
              >
                {languages.map(([label, val], i) => (
                  <option value={val} key={i}>{label}</option>
                ))}
              </select>
              <div className="d-flex gap-2 align-items-center">
                <button className="btn btn-sm btn-outline-light" onClick={downloadTxtFile} title="Download">
                  <i className="fa fa-download"></i>
                </button>
                <label htmlFor="file-upload" className="btn btn-sm btn-outline-light" title="Upload">
                  <i className="fa fa-upload"></i>
                </label>
                <input id="file-upload" type="file" onChange={showFile} style={{ display: "none" }} />
                <button className="btn btn-sm btn-outline-light" onClick={handleCopy} title="Copy">
                  <i className="fa fa-copy"></i>
                </button>
                {props.save && JSON.parse(localStorage.getItem("user")) && (
                  <button className="btn btn-sm btn-success" onClick={handleSave} title="Save">
                    <i className="fa fa-save"></i>
                  </button>
                )}
              </div>
              <button
                className="btn btn-outline-light"
                onClick={handleRun}
                disabled={isRunning}
              >
                {isRunning ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Running...
                  </>
                ) : "Run"}
              </button>
            </div>
            <Editor
              height="77vh"
              defaultLanguage={language[0]}
              theme="vs-dark"
              onChange={handleEditorChange}
              value={code}
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className="bg-secondary rounded shadow-sm p-2 mb-3">
            <h5>Input</h5>
            <Editor
              height="34vh"
              defaultLanguage="text"
              theme="vs-dark"
              onChange={handleInputChange}
              value={input}
            />
          </div>
          <div className="bg-secondary rounded shadow-sm p-2">
            <h5>Output</h5>
            <Editor
              height="35vh"
              defaultLanguage="text"
              theme="vs-dark"
              value={output}
              options={{ readOnly: true }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
