import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import {useHistory} from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import i18n from 'i18next'
import { useTranslation } from 'react-i18next';
import AuthService from "../services/auth.service";

const Register = () => {
  const history = useHistory();
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const {t} = useTranslation();
  const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required(i18n.t('name') + i18n.t('isRequired'))
        .min(10, i18n.t('name') + i18n.t('least10'))
        .max(30, i18n.t('name') + i18n.t('exceed30')),
    surname: Yup.string()
        .required(i18n.t('surname') + i18n.t('isRequired'))
        .min(10, i18n.t('surname') + i18n.t('least10'))
        .max(30, i18n.t('surname') + i18n.t('exceed30')),
    userName: Yup.string()
        .required(i18n.t('userName') + i18n.t('isRequired'))
        .min(10, i18n.t('userName') + i18n.t('least10'))
        .max(30, i18n.t('userName') + i18n.t('exceed30')),
    email: Yup.string()
        .required(i18n.t('email') + i18n.t('isRequired'))
        .email(i18n.t('email') + i18n.t('isInvalid')),
    address: Yup.string()
        .required(i18n.t('address') + i18n.t('isRequired'))
        .min(10, i18n.t('address') + i18n.t('least10'))
        .max(30, i18n.t('address') + i18n.t('exceed30')),
    password: Yup.string()
        .required(i18n.t('password') + i18n.t('isRequired'))
        .min(6, i18n.t('password') + i18n.t('least6'))
        .max(40, i18n.t('password') + i18n.t('exceed40')),
    confirmPassword: Yup.string()
        .required(i18n.t('confirmPassword') + i18n.t('isRequired'))
        .oneOf([Yup.ref('password'), null], i18n.t('confirmPassword') + i18n.t('notmatch')),
    cvuMP: Yup.string()
        .required(i18n.t('cvuMP') + i18n.t('isRequired'))
        .min(22, i18n.t('cvuMP') + i18n.t('exactly22'))
        .max(22, i18n.t('cvuMP') + i18n.t('exactly22')),
    criptoWallet: Yup.string()
        .required(i18n.t('theCriptoWallet') + i18n.t('isRequired'))
        .min(8, i18n.t('theCriptoWallet') + i18n.t('exactly8'))
        .max(8, i18n.t('theCriptoWallet') + i18n.t('exactly8')),
    acceptTerms: Yup.bool().oneOf([true], i18n.t('acceptTerms') + i18n.t('isRequired'))
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
    console.log(userData)
      AuthService.register(userData).then(
          (response) => {
            setMessage(response.data.message);
            setSuccessful(true);
            history.push("/activeCripto")
            window.location.reload();
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
    
    <div className="col-md-12">
      <div className="card card-container">
        <div className="register-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>{t('name')}</label>
              <input
                  name="name"
                  type="text"
                  {...register('name')}
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.name?.message}</div>
            </div>

            <div className="form-group">
              <label>{t('surname')}</label>
              <input
                  name="surname"
                  type="text"
                  {...register('surname')}
                  className={`form-control ${errors.surname ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.surname?.message}</div>
            </div>

            <div className="form-group">
              <label>{t('userName')}</label>
              <input
                  name="userName"
                  type="text"
                  {...register('userName')}
                  className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.userName?.message}</div>
            </div>

            <div className="form-group">
              <label>{t('email')}</label>
              <input
                  name="email"
                  type="text"
                  {...register('email')}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>

            <div className="form-group">
              <label>{t('address')}</label>
              <input
                  name="address"
                  type="text"
                  {...register('address')}
                  className={`form-control ${errors.address ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.address?.message}</div>
            </div>

            <div className="form-group">
              <label>{t('password')}</label>
              <input
                  name="password"
                  type="password"
                  {...register('password')}
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>

            <div className="form-group">
              <label>{t('confirmPassword')}</label>
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
              <label>{t('cvuMP')}</label>
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
              <label>{t('criptoWallet')}</label>
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
                {t('agreed')}<a href="https://docs.google.com/document/d/1B6kqVnkV2wICgwDZAw9yHenH8aJlz-_bJMzeGktzgqk/edit">{t('terms')}</a>
              </label>
              <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                {t('register')}
              </button>{' '}
              <button
                  type="button"
                  onClick={reset}
                  className="btn btn-warning float-right"
                  hidden
              >
                {t('resetData')}
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
      </div>
    </div>
  );
}

export default Register;
