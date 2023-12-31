'use client'

import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios';
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'next/navigation';

const CreateComment = (props: {[key: string]: any}) => {
  const validation = yup.object().shape({
    body: yup.string().required(),
  })

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(validation)
  })

  const [commentBody, setCommentBody] = useState<string>("");
  const [userInfo, setUserInfo] = useState<{[key: string]: any}>({});

  const updateComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentBody(event.target.value);
  }

  const uploadComment = async(): Promise<void> => {
    const url = "https://spark-9bqv.onrender.com/api/v1/comments";
    await axios.post(url,{
      user_name: `${userInfo.attributes.first_name} ${userInfo.attributes.middle_name} ${userInfo.attributes.last_name}`,
      body: commentBody
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("postToken")
      }
    }).then((response: AxiosResponse<any, any>) => {
      console.log(response);
      redirect("/dashboard")
    }).catch((errors) => console.log(errors))
  }

  const getCommentOwner = async(): Promise<void> => {
    const url = `https://spark-9bqv.onrender.com/api/v1/users/${localStorage.getItem("userId")}`;
    await axios.get(url).then((response: AxiosResponse<any, any>) => {
      console.log(response.data.data);
      setUserInfo(response.data.data);
    }).catch((errors) => console.log(errors))
  }

  useEffect(() => {
    getCommentOwner();
  }, [])

  return (
    <form
      className='flex-row flex-1 h-auto bg-slate-900 p-4 mt-6 justify-between items-center'
      style={{display: props.isCommentClicked? "flex" : "none"}}
      method='POST'
      onSubmit={handleSubmit(uploadComment)}>
      <textarea
        {...register("body")}
        className='w-3/4 outline-none h-auto rounded-xl p-2 bg-slate-500'
        onChange={updateComment}/>
      <button
        type='submit'
        className='bg-blue-500 w-[115px] h-11 border-none rounded-lg'>
        Comment
      </button>
    </form>
  )
}

export default CreateComment
