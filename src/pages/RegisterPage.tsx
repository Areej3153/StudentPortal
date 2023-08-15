import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import {useForm, FieldValues} from 'react-hook-form';
import {z} from 'zod';
import axios from "axios";
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query'; 
import { registerGraduateAxios, registerUser, registerUserAxios } from '../api/users';
import { Link, useNavigate} from 'react-router-dom'

const RegisterPage = () => {

    const [postResult, setPostResult] = useState<string | null>(null);
    const [errorResult, setErrorResult] = useState<string | null>(null);
    const [step, setStep] = useState(1)
    const navigate = useNavigate();

    const [firstSelect, setFirstSelect] = useState("Diploma")
    const [secondSelect, setSecondSelect] = useState("Computer Science")
    const [thirdSelect, setThirdSelect] = useState("Information")

    const firstChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setFirstSelect(e.target.value)
    }

    const secondChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSecondSelect(e.target.value)
    }

    const thirdChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setThirdSelect(e.target.value)
    }

    const schema = z.object({
        firstName: z.string().min(3),
        lastName: z.string().min(3),
        email: z.string().email({message: "Invalid email address"}),
        birthDate: z.coerce.date(),
        password: z.string().min(6),
        confirmPassword: z.string().min(6),
        fileDetails: z.custom<File>()
    })
    .refine((data) => data.password === data.confirmPassword,{
        message: "Password don't match",
        path: ["confirmPassword"]
    });

    type FormData = z.infer<typeof schema>;

    const fortmatResponse = (res: any) => {
        return JSON.stringify(res, null, 2);
      };
    
        const {
            register,
            getValues,
            reset,
            handleSubmit,
            formState: {errors, isValid},
        } = useForm<FormData>({resolver: zodResolver(schema)});

    const  mutation =  useMutation({
        mutationFn:  registerUserAxios,
        onSuccess: (response) => {
            setStep(2);
            setPostResult(response.data);
            reset(formValues => ({
                ...formValues,
                firstName: '',
                lastName: '',
                email: '',
              
                password: '',
                
              }))
        },
        onError: (err: Error) => {
            setErrorResult(err.message);
          }
    })

    const  graduateMutation =  useMutation({
        mutationFn:  registerGraduateAxios,
        onSuccess: (response) => {
            navigate('/')
            setStep(3);
            setPostResult(response.data);
            
           
        },
        onError: (err: Error) => {
            setErrorResult(err.message);
          }
    })

  const onSubmitGraduate = (e:FormEvent) => {
    e.preventDefault();
    const theData = {
        Id: postResult,
        levelStudy: firstSelect,
        program: secondSelect,
        faculityDivision: thirdSelect
    }

    graduateMutation.mutate(theData)
  }
    

    const onSubmit = (data: FieldValues) => {
       
       const theData = {
        firstName: data['firstName'],
        lastName: data['lastName'],
        email: data['email'],
        birthDate: data['birthDate'],
        password: data['password'],
        fromFile: data['fileDetails'][0],
        //fileType: 1
       }
      
        mutation.mutate(theData);
    }

//console.log(mutation.error)

    
  return (
    <>
    
   
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
    <ul className="steps mb-0">
     <li className={step >= 1 ? "step step-primary" : 'step'}>Register</li>
     <li className={step >= 2 ? "step step-primary" : 'step'}>Choose plan</li>
     <li className={step >= 3 ? "step step-primary" : 'step'}>Finish</li>
  
    </ul>
    <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-4">Welcome to Areej University</h1>
        {step === 1 ? 
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-2 gap-4'>
            <div>
                <label className="label">
                    <span className="text-base label-text">First Name</span>
                </label>
                <input {...register("firstName")} id='firstName'  type="text" placeholder="Enter first name" className="w-full input input-bordered" />
                {errors.firstName && (
                    <p className='text-error text-xs'>{errors.firstName.message}</p>
                )}
            </div>
            <div>
                <label className="label">
                    <span className="text-base label-text">Last Name</span>
                </label>
                <input {...register("lastName")} id='lastName' type="text" placeholder="Enter last name" className="w-full input input-bordered" />
                {errors.lastName && (
                    <p className='text-error text-xs'>{errors.lastName.message}</p>
                )}
            </div>
            <div>
                <label className="label">
                    <span className="text-base label-text">Email</span>
                </label>
                <input {...register("email")} id='email' type="text" placeholder="Enter email address" className="w-full input input-bordered" />
                {errors.email && (
                    <p className='text-error text-xs'>{errors.email.message}</p>
                )}
            </div>
            <div>
                <label className="label">
                    <span className="text-base label-text">Birth Date</span>
                </label>
                <input {...register("birthDate")} id='birthDate' type="text" placeholder="1998-02-01" className="w-full input input-bordered" />
                {errors.birthDate && (
                    <p className='text-error text-xs'>{errors.birthDate.message}</p>
                )}
            </div>
           
            
            <div>
                <label className="label">
                    <span className="text-base label-text">Password</span>
                </label>
                <input {...register("password")} id='password'  type="password" placeholder="Enter Password"
                    className="w-full input input-bordered" />
                     {errors.password && (
                    <p className='text-error text-xs'>{errors.password.message}</p>
                )}
            </div>
            <div>
                <label className="label">
                    <span className="text-base label-text">Confirm password</span>
                </label>
                <input {...register("confirmPassword")} id='confirmPassword'  type="password" placeholder="Enter Password again"
                    className="w-full input input-bordered" />
                     {errors.confirmPassword && (
                    <p className='text-error text-xs'>{errors.confirmPassword.message}</p>
                )}
            </div>
           
            <div>
                <label className="label">
                    <span className="text-base label-text">Photo</span>
                </label>
                <input {...register("fileDetails")} id='photo' type="file" className="file-input file-input-bordered  w-full max-w-xs" />
                {errors.fileDetails && (
                    <p className='text-error text-xs'>{errors.fileDetails.message}</p>
                )}
            </div>

            </div>
            <div>
                <button  className="btn btn-block btn-primary mb-4">Sign Up</button>
                {errorResult && <p className='text-error text-xs'>{errorResult}</p>}
            </div>
           
            <span>Already have an account? 
            <Link className="text-blue-600 hover:text-blue-800 hover:underline" to={'/'}>Login</Link></span>
        </form>
        : 
        <form className="space-y-4" onSubmit={onSubmitGraduate}>
        <div className='grid grid-cols-1 gap-4'>
        <div>
                <label className="label">
                    <span className="text-base label-text">Level Of Study</span>
                </label>
                <select className="select select-bordered w-full " value={firstSelect} onChange={firstChange}>
  <option>Diploma</option>
  <option>Bechelor</option>
  <option>Master</option>
</select>
            </div>
            <div>
                <label className="label">
                    <span className="text-base label-text">Program</span>
                </label>
                <select className="select select-bordered w-full " value={secondSelect} onChange={secondChange} >
  <option >Computer Science</option>
  <option>Computer Engineering</option>
  <option>Software Engineering</option>
  <option>Data Science</option>
  <option>Cybersecurity</option>
</select>
            </div>
            <div>
                <label className="label">
                    <span className="text-base label-text">Faclity/Division</span>
                </label>
                <select className="select select-bordered w-full " value={thirdSelect} onChange={thirdChange}>
  <option>Information</option>
  <option>Engineering</option>
  <option>Sience</option>
</select>
            </div>
            <div>
                <button  className="btn btn-block btn-primary mb-4" onSubmit={onSubmitGraduate}>Choose plan</button>
                {errorResult && <p className='text-error text-xs'>{errorResult}</p>}
            </div>
           
            <span>Already have an account? 
                <Link className="text-blue-600 hover:text-blue-800 hover:underline" to={'/'}>Login</Link>
                </span>
        </div>
        </form>
        }
    </div>
</div>
</>
  )
}

export default RegisterPage