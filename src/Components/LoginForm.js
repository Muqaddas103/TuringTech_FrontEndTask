import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import AuthHandler from '../Utils/Common';

import { useHttpClient } from './../Shared/Hooks/HttpHook';
import { baseUrl } from '../config/config';

const CONTAINER = styled.div`
  background: #F7F9FA;
  height: auto;
  width: 90%;
  margin: 5em auto;
  color: snow;
  -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);

  @media(min-width: 786px) {
    width: 60%;
  }

  label {
    color: #24B9B6;
    font-size: 1.2em;
    font-weight: 400;
  }

  h1 {
    color: #24B9B6;
    padding-top: .5em;
  }

  .form-group {
    margin-bottom: 2.5em;
  }

  .error {
    border: 2px solid #FF6565;
  }

  .error-message {
    color: #FF6565;
    padding: .5em .2em;
    height: 1em;
    position: absolute;
    font-size: .8em;
  }
`;

const MYFORM = styled(Form)`
  width: 90%;
  text-align: left;
  padding-top: 2em;
  padding-bottom: 2em;

  @media(min-width: 786px) {
    width: 50%;
  }
`;

const BUTTON = styled(Button)`
  background: #1863AB;
  border: none;
  font-size: 1.2em;
  font-weight: 400;

  &:hover {
    background: #1D3461;
  }
`;




const LoginForm = (props) => {
    const { error, status, sendRequest } = useHttpClient();
    const { setUserSession } = AuthHandler();
    const [Error, setError] = useState(null)

    // Schema for yup
    const validationSchema = yup.object().shape({

        username: yup
            .string()
            .email("Enter valid email")
            .required("Email is required"),
        password: yup
            .string()
            .min(6, "Password must be atleast 8 characters long")
            .required("Password is required"),
    });


    const onSubmitMethod = async (values) => {
        // removeUserSession();
        try {
      
           setError(null)
            const responseData = await sendRequest(
                `${baseUrl}/auth/login`,
                "POST",
                JSON.stringify({
                    username: values.username,
                    password: values.password,
                }),
                {
                    "Content-Type": "application/json",
                }
            );
            setUserSession(responseData.access_token, responseData.user.id)
            props.setToken(responseData.access_token)
        } catch  {
            if (status === 401 || status === 400){
                setError(error);
                console.log(error);

            }              
            else {
                setError("Something went wrong!");
            }
        }
    };


    return (
        <CONTAINER>

            <Formik
                initialValues={props.initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmitMethod}
            >
                {({ values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    isSubmitting }) => (
                    <MYFORM onSubmit={handleSubmit} className="mx-auto">
                        <Form.Group controlId="formName">
                            <Form.Label>UserName</Form.Label>
                            <Form.Control
                                type="email"
                                name="username"
                                onChange={handleChange}
                                value={values.username}
                                className={touched.username && errors.username ? "error" : null}
                            />
                            {touched.username && errors.username ? (
                                <div className="error-message">{errors.username}</div>
                            ) : null}
                        </Form.Group>

                        <Form.Group controlId="formBlog">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                className={touched.password && errors.password ? "error" : null}
                            />
                            {touched.password && errors.password ? (
                                <div className="error-message">{errors.password}</div>
                            ) : null}
                        </Form.Group>
                        <BUTTON variant="primary" type="submit" disabled={isSubmitting}>
                            Submit
                        </BUTTON>

                        {Error ? (
                            <div className="error-message">Unable to Login! Incorrect UserName and Password</div>
                        ) : (
                            " "
                        )}
                    </MYFORM>
                )}
            </Formik>
        </CONTAINER>
    );
}

export default LoginForm;