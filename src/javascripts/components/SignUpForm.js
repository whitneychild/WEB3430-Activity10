import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as yup from 'yup'

toast.configure()

export function VHelp({message}){
    return <p className="help">{message}</p>
}


const validationSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    username: yup.string().required(),
    password: yup.string().required()
})
export default function SignUpForm() {
    let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: ""
        } ,
        validationSchema,
        onSubmit(values){
            fetch('/api/users/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'same-origin',
                body: JSON.stringify(values)
            }).then((response) => {
                if(!response.ok) throw Error('Failed to sign up')
                return response.text()
            }).then(() => {
                toast('Successfully signed up', {
                    onClose: () => {
                        document.location ="/movies"
                    }
                })
            }).catch((error) => {
                toast('Failed to sign up', {
                    onClose: () => {
                        document.location = "/movies" 
                    }
                })
            })
        }
    })

    const history = useHistory()

    return (
        <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div className="field">
                <label htmlFor="firstName">First Name</label>
                <div className="control">
                    <input type="text" name="firstName" value={values.firstName} onChange={handleChange}/>
                    <VHelp message={errors.firstName}/>
                </div>
            </div>
            <div className="field">
                <label htmlFor="lastName">Last Name</label>
                <div className="control">
                    <input type="text" name="lastName" value={values.lastName} onChange={handleChange}/>
                    <VHelp message={errors.lastName}/>
                </div>
            </div>
            <div className="field">
                <label htmlFor="email">Email</label>
                <div className="control">
                    <input name="email" id="email" selected={values.email} onChange={handleChange}/>
                    <VHelp message={errors.email}/>
                </div>
            </div>
            <div className="field">
                <label htmlFor="username">Username</label>
                <div className="control">
                    <input type="text" name="username" value={values.username} onChange={handleChange}/>
                    <VHelp message={errors.username}/>
                </div>
            </div>
            <div className="field">
                <label htmlFor="password">Password</label>
                <div className="control">
                <input type="password" name="password" value={values.password} onChange={handleChange}/>
                    <VHelp message={errors.password}/>
                </div>
            </div>


            <div className="field">
                <div className="control">
                    <button className="primary" type="submit">Submit</button>
                    <button className="primary" onClick={()=>document.location = '/movies'}>Cancel</button>
                </div>
            </div>
        </form>
    )
}