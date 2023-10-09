'use client'

import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import CreateQuizItem from '../createQuizItem/CreateQuizItem'
import axios, { AxiosResponse } from 'axios'

const Quiz = (props: {[key: string]: any}) => {
    const [isAddQuizItemClicked, setIsAddQuizItemClicked] = useState<boolean>(false);

    const storeQuizToken = async(): Promise<void> => {
      const url = `http://127.0.0.1:3001/api/v1/quiz_tokens?quiz[difficulty]=${props.difficulty}`;

      await axios.post(url).then((response: AxiosResponse<any, any>) => {
        console.log(response.data.quiz_token);
        localStorage.setItem("quizToken", response.data.quiz_token);
      }).catch((errors) => console.log(errors))
    }

    const updateIsQuizItemClicked = () => {
      setIsAddQuizItemClicked(!isAddQuizItemClicked)
    }

  return (
    <div className='flex flex-col w-4/5 h-auto border-none rounded-md hover:shadow-black hover:shadow-md hover:cursor-pointer p-4 mb-4 border-gray-500 justify-between items-center bg-gradient-to-r from-blue-500 to-pink-500'>
      <div className='flex flex-row w-full h-auto'>
        <h1 className='text-xl text-white'>
            {props.subjectName}
          </h1>
          <div className='flex flex-row w-full gap-4 justify-between items-center'>
            <Link
              href={`/${props.subjectFolder}/${props.mode}/${props.coverageName}/topic/${props.topicName}/quiz/${props.difficulty}/${props.quizId}`}
              className='text-xl text-white hover:underline'
              >
                Start Quiz
            </Link>
            {props.isAdmin && <button
              className='bg-blue-500 w-auto p-2 h-9 rounded-lg'
              onClick={() => {
                  updateIsQuizItemClicked();
                  if (!isAddQuizItemClicked) {
                    storeQuizToken();
                  }
                }
              }>
              Add Quiz Item
              </button>}
          </div>
      </div>

        {(isAddQuizItemClicked && props.isAdmin) && <CreateQuizItem state={isAddQuizItemClicked} setState={setIsAddQuizItemClicked}/>}
    </div>
  )
}

export default Quiz
