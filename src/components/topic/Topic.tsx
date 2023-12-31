'use client'

import React from 'react'
import Link from 'next/link'
import axios, { AxiosResponse } from 'axios'

const Topic = (props: {[key: string]: string}) => {

  const storeTopicToken = async(): Promise<void> => {
    const url = `https://spark-9bqv.onrender.com/api/v1/topic_tokens?topic[name]=${props.topicName}`;

    await axios.post(url).then((response: AxiosResponse<any, any>) => {
      console.log(response);
      localStorage.setItem("topicToken", response.data.topic_token);
      localStorage.setItem("topicId", response.data.id);
    }).catch((errors) => console.log(errors))
  }

  return (
    <div className='flex flex-row w-4/5 h-auto border-none rounded-md hover:shadow-black hover:shadow-md hover:cursor-pointer p-4 mb-4 border-gray-500 justify-between items-center bg-gradient-to-r from-blue-500 to-pink-500'>
        <h1 className='text-xl text-white'>
          {props.topicName}
        </h1>
        <div>
          <Link
            href={`/${props.majorFolder}/${props.mode}/${props.coverageName}/topic/${props.topicName}`}
            className='text-xl text-white hover:underline'
            onClick={storeTopicToken}>
            View Discussion
          </Link>
        </div>
    </div>
  )
}

export default Topic
