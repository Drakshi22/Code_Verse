import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

export default function Dummy(props) {

  function handleChangeBox(content, delta, source, editor) {
    props.setQuestion({
      ...props.question,
      [props.name]: content,
    });
    console.log(props.question);
  }

  return (
    <div className='container border border-5 m-3 p-3 rounded'>
      <ReactQuill
        theme="snow"
        value={props.value}
        onChange={handleChangeBox}
        modules={Dummy.modules}
        formats={Dummy.formats}
      />
    </div>
  );
}

// You can customize the toolbar here:
Dummy.modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline','strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'image'],
    ['clean']
  ],
};

Dummy.formats = [
  'header', 'bold', 'italic', 'underline', 'strike',
  'list', 'bullet', 'link', 'image'
];
