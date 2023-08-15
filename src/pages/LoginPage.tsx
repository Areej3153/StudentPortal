import React, { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'; 
import { loginUserAxios, registerUserAxios } from '../api/users';
import {useForm, FieldValues} from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCookies } from 'react-cookie';
import { Link, useNavigate} from 'react-router-dom'

const LoginPage = () => {
    const [postResult, setPostResult] = useState<string | null>(null);
    const [cookies, setCookie] = useCookies(['jwt','name','photo', 'levelStudy', 'program', 'faculity']);
    const navigate = useNavigate();

    const fortmatResponse = (res: any) => {
        return JSON.stringify(res, null, 2);
      };

      const schema = z.object({
       
        username: z.string().email({message: "Invalid email address"}),
        
        password: z.string()
       
    })

    type FormData = z.infer<typeof schema>;

    const {
        register,
        getValues,
        reset,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>({resolver: zodResolver(schema)});

      const  mutation =  useMutation({
        mutationFn:  loginUserAxios,
        onSuccess: (response) => {
            const {jwt, firstName, lastName, photoPath, graduate} = response.data;
            const {levelStudy, program, faculityDivision} = graduate
            //const {fileData} = photo
            setCookie('jwt', jwt, { path: '/' });
            setCookie('name', firstName + ' ' + lastName, { path: '/' });
            setCookie('photo', photoPath, { path: '/' });
            setCookie('levelStudy', levelStudy, { path: '/' });
            setCookie('program', program, { path: '/' });
            setCookie('faculity', faculityDivision, { path: '/' });
            //console.log(cookies.name)
            setPostResult(cookies.name);
            navigate('/dashboard')
          
        },
        onError: (err: Error) => {
            //console.log(err.message)
            //setPostResult(err.message);
            setPostResult('Incorrect username or password');
          }
    })

    const onSubmit = (data: FieldValues) => {
       
        const theData = {
         
         username: data['username'],
       
         password: data['password'],
        
        }
       //console.log(theData)
         mutation.mutate(theData);
     }

    //console.log(onsubmit)

  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
    <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700">Welcome Back</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label className="label">
                    <span className="text-base label-text">Email</span>
                </label>
                <input {...register("username")} id='email' type="text" placeholder="Enter email address" className="w-full input input-bordered" />
                {errors.username && (
                    <p className='text-error text-xs'>{errors.username.message}</p>
                )}
            </div>
            <div>
                <label className="label">
                    <span className="text-base label-text">Password</span>
                </label>
                <input {...register("password")} id='password' type="password" placeholder="Enter password"
                    className="w-full input input-bordered" />
            </div>
            <span>Don't have account?
                <Link className='text-blue-600 hover:text-blue-800 hover:underline' to={'/register'}>Register</Link>
                </span>
            <div>
                <button className="btn btn-block btn-primary mb-4">Sign In</button>
                {postResult && <p className='text-error text-xs'>{postResult}</p>}
            </div>
        </form>
    </div>
</div>
  )
}

export default LoginPage