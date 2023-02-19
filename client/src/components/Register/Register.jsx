import React, { useEffect, useRef } from 'react'
import {useFormik} from 'formik'
import { registerSchema } from '../../Schemas/Schemas'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { checkEmailExist } from '../../features/UserSlice';
import './Register.css'

export default function Register() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isValid = useRef(false);
  const {users} = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(checkEmailExist())
  }, [dispatch])

  const formik = useFormik({
    initialValues: {
      fname: '',
      lname: '',
      email: '',
      password: ''
    },
    validationSchema: registerSchema,
    onSubmit
  })

  async function onSubmit(values, {resetForm}) {
    try {
      const exist = users.find((user) => user.email === formik.values.email && user.email === formik.values.email ? isValid.current = true : isValid.current = false);
      if (!exist) {
        await axios.post('http://localhost:8080/users', values)
        console.log('Successful');
        resetForm()
        navigate('/')
      } else {
        console.log('Email already exist');
      }
    } catch (err) {
      console.log(err);
    }
  }

  const errorStyle = isValid.current ? {display: 'inline-block', color: 'crimson'} : {display: 'none'};

  return (
    <form className='register_form' onSubmit={formik.handleSubmit}>
      <div className="fname_lname_field">
        <div className="fname_field input_fields">
          <label htmlFor="fname">Name<span style={errorStyle}>*</span></label>
          <input type="text" placeholder='Enter your name' value={formik.values.fname} onChange={formik.handleChange} onBlur={formik.handleBlur} id='fname' name='fname' />
          <div className='error_box'>
            {formik.touched.fname && formik.errors.fname ? <span style={{color: 'crimson', fontSize: '12px'}}>{formik.errors.fname}</span> : null}
          </div>
        </div>
        <div className="lname_field input_fields">
          <label htmlFor="lname">Surname<span style={errorStyle}>*</span></label>
          <input type="text" placeholder='Enter your surname' value={formik.values.lname} onChange={formik.handleChange} onBlur={formik.handleBlur} id='lname' name='lname' />
          <div className='error_box'>
            {formik.touched.lname && formik.errors.lname ? <span style={{color: 'crimson', fontSize: '12px'}}>{formik.errors.lname}</span> : null}
          </div>
        </div>
      </div>
      <div className="email_field input_fields">
        <label htmlFor="email">Email<span style={errorStyle}>*</span></label>
        <input type="email" placeholder='Enter your email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id='email' name='email' />
        <div className='error_box'>
          {formik.touched.email && formik.errors.email ? <span style={{color: 'crimson', fontSize: '12px'}}>{formik.errors.email}</span> : null}
        </div>
      </div>
      <div className="pwd_field input_fields">
        <label htmlFor="pwd">Password<span style={errorStyle}>*</span></label>
        <input type="password" placeholder='Enter your password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id='pwd' name='password' />
        <div className='error_box'>
          {formik.touched.password && formik.errors.password ? <span style={{color: 'crimson', fontSize: '12px'}}>{formik.errors.password}</span> : null}
        </div>
      </div>
      <div className="button_field">
        <button type='submit' onClick={formik.handleSubmit} disabled={formik.isSubmitting}>Submit</button>
        {
          isValid.current ?
          <span style={{color: 'crimson'}}>Email already exist</span> : null
        }
      </div>
    </form>
  )
}
