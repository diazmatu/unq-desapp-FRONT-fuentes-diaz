import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import AuthService from "../services/auth.service";

const Register = () => {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required')
        .min(10, 'Name must be at least 10 characters')
        .max(30, 'Name must not exceed 30 characters'),
    surname: Yup.string()
        .required('Surname is required')
        .min(10, 'Surname must be at least 10 characters')
        .max(30, 'Surname must not exceed 30 characters'),
    userName: Yup.string()
        .required('User name is required')
        .min(10, 'User name must be at least 10 characters')
        .max(30, 'User name must not exceed 30 characters'),
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    address: Yup.string()
        .required('Address is required')
        .min(0, 'Address must be at least 0 characters')
        .max(30, 'Address must not exceed 30 characters'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    cvuMP: Yup.string()
        .required('CVU MercadoPago is required')
        .min(22, 'CVU MercadoPago must be exactly 22 characters')
        .max(22, 'CVU MercadoPago must be exactly 22 characters'),
    criptoWallet: Yup.string()
        .required('The CriptoWallet address is required')
        .min(8, 'The CriptoWallet address must be exactly 8 characters')
        .max(8, 'The CriptoWallet address must be exactly 8 characters'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = userData => {

      AuthService.register(userData).then(
          (response) => {
            setMessage(response.data.message);
            setSuccessful(true);
          },
          (error) => {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            setMessage(resMessage);
            setSuccessful(false);
          }
      );
    };

  return (
      <div className="register-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Name</label>
            <input
                name="name"
                type="text"
                {...register('name')}
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.name?.message}</div>
          </div>

          <div className="form-group">
            <label>Surname</label>
            <input
                name="surname"
                type="text"
                {...register('surname')}
                className={`form-control ${errors.surname ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.surname?.message}</div>
          </div>

          <div className="form-group">
<<<<<<< HEAD
<<<<<<< HEAD
            <label>Username</label>
            <input
                name="userName"
                type="text"
                {...register('userName')}
                className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.userName?.message}</div>
          </div>

          <div className="form-group">
=======
>>>>>>> cd6853c (Login and Register react)
=======
>>>>>>> 3aa136e (Login and Register react)
            <label>Email</label>
            <input
                name="email"
                type="text"
                {...register('email')}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
                name="address"
                type="text"
                {...register('address')}
                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.address?.message}</div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
                name="password"
                type="password"
                {...register('password')}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
                name="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                className={`form-control ${
                    errors.confirmPassword ? 'is-invalid' : ''
                }`}
            />
            <div className="invalid-feedback">
              {errors.confirmPassword?.message}
            </div>
          </div>

          <div className="form-group">
            <label>CVU MercadoPago</label>
            <input
                name="cvuMP"
                type="text"
                {...register('cvuMP')}
                className={`form-control ${
                    errors.cvuMP ? 'is-invalid' : ''
                }`}
            />
            <div className="invalid-feedback">
              {errors.cvuMP?.message}
            </div>
          </div>

          <div className="form-group">
            <label>CriptoWallet address</label>
            <input
                name="criptoWallet"
                type="text"
                {...register('criptoWallet')}
                className={`form-control ${
                    errors.criptoWallet ? 'is-invalid' : ''
                }`}
            />
            <div className="invalid-feedback">
              {errors.criptoWallet?.message}
            </div>
          </div>

          <div className="form-group form-check">
            <input
                name="acceptTerms"
                type="checkbox"
                {...register('acceptTerms')}
                className={`form-check-input ${
                    errors.acceptTerms ? 'is-invalid' : ''
                }`}
            />
            <label htmlFor="acceptTerms" className="form-check-label">
              I have read and agree to the <a href="https://docs.google.com/document/d/1B6kqVnkV2wICgwDZAw9yHenH8aJlz-_bJMzeGktzgqk/edit">Terms</a>
            </label>
            <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <button
                type="button"
                onClick={reset}
                className="btn btn-warning float-right"
            >
              Reset
            </button>
          </div>
          
          {
          message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
                )
          }
        </form>
      </div>
  );
}

export default Register;
