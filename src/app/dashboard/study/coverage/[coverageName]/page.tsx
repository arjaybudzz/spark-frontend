'use client'

import Subject from '@/components/subject/Subject'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'

const SubjectList = () => {
  const params = useParams();

  const [subjectObject, setSubjectObject] = useState<object[]>([]);

  const getSubjects = async(): Promise<void> => {
    const url = `https://spark-9bqv.onrender.com/api/v1/subject_coverages/${localStorage.getItem("coverageId")}`;

    await axios.get(url)
    .then((response) => {
      console.log(response.data.included);
      const result = response.data.included;
      result.map((element: {[key: string]: any}) => {
        if (element.type === "subject") {
          setSubjectObject(subjectObject => [...subjectObject, element]);
        }
      })

    })
    .catch((errors) => console.log(errors))
  }

  useEffect(() => {
    setTimeout(() => {
      getSubjects();
    }, 1000)
  }, [])

  return (
    <div className='flex flex-col w-screen h-screen justify-start items-center bg-homepage-background bg-cover p-16 gap-6 overflow-y-scroll'>
      <h1 className='text-4xl text-white self-start font-bold'>
        SUBJECTS
      </h1>
      <div className='flex flex-col justify-center items-center w-full h-auto'>
        {
          subjectObject.map((element: {[key: string]: any}) => {
            console.log(element)
            return <Subject subjectName={element.attributes.name} subjectFolder={`dashboard/study/coverage/${params.coverageName}`} mode={"topic"} key={element.id}/>
          })
        }
      </div>
    </div>
  )
}

export default SubjectList
