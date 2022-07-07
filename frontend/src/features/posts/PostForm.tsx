// External Third Party Dependencies
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// Internal Dependencies
import { AppDispatch } from '../../app/store';
import { createPostAsync } from './postSlice';

function PostForm() {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  function submitHandler(e: any) {
    e.preventDefault();
    const formData = {
      post: {
        title,
        body,
      },
    };
    dispatch(createPostAsync(formData));
    resetState();
  }

  function resetState() {
    setTitle('');
    setBody('');
  }

  return (
    <div>
      <h1>PostForm</h1>
      <form>
        <input
          type='text'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='form-control text-start'
        />
        <textarea
          className='form-control text-start'
          name='body'
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type='submit' onClick={(e) => submitHandler(e)}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default PostForm;
