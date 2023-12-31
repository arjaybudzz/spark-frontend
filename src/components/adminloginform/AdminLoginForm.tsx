'use client';

import React from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import type { LogInData } from '@/models/loginData'
import { yupResolver } from '@hookform/resolvers/yup'
import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation';

const AdminLoginForm = () => {
  const router = useRouter();

    const [user, setUser] = useState<LogInData>({
        email: '',
        password: ''
      })

      const validity = yup.object().shape({
        email: yup.string().email().required().min(10).max(30),
        password: yup.string().min(8).max(20).required()
      })

      const { register, handleSubmit } = useForm({
        resolver: yupResolver(validity)
      });

      const updateEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUser({ ...user, email: event.target.value })
      };

      const updatePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUser({ ...user, password: event.target.value })
      };

      const loginAdmin = async (data: LogInData): Promise<void> => {
        const url = `https://spark-9bqv.onrender.com/api/v1/tokens?admin[email]=${data.email}&admin[password]=${data.password}`;

        await axios.post(url).then((response: AxiosResponse<any, any>) => {
          console.log(response.data.token);
          localStorage.setItem("adminToken", response.data.token);
          router.push("/admin/coverage");
        }).catch((errors) => console.log(errors));
      }
  return (
    <div className="flex flex-col justify-center items-center flex-1 h-screen relative p-6">
        <h1 className="text-xl text-white self-center mb-6">Login your profile now!</h1>
        <form
          method="POST"
          className='flex flex-col'
          onSubmit={handleSubmit(loginAdmin)}>
          <div className="flex flex-row justify-between items-center w-[500px] mb-9">
            <label htmlFor="email-input" className="text-xl text-white">
              Email:
            </label>
            <input
              id="email-input" {...register("email")}
              className="outline-none w-[300px] h-10 p-4 rounded-xl"
              onChange={updateEmail}/>
          </div>
          <div className="flex flex-row justify-between items-center w-[500px] mb-10">
            <label htmlFor="password-input" className="text-xl text-white">
              Password:
            </label>
            <input
              id="password-input" {...register("password")}
              className="outline-none w-[300px] h-10 p-4 rounded-xl"
              type="password"
              onChange={updatePassword}/>
          </div>
          <button
            type='submit'
            className="w-[200px] h-11 bg-blue-500 rounded-xl self-center text-xl hover:bg-blue-400 hover:text-blue-600 duration-200 active:bg-blue-500">
            Submit
          </button>
        </form>
      </div>
  )
}

export default AdminLoginForm


