import { Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import { useHttpClient } from './../Shared/Hooks/HttpHook';
import AuthHandler from './../Utils/Common';
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


function Note(props) {
  const { error, status, sendRequest } = useHttpClient();
  const { getToken} = AuthHandler();

  const [Error, setError] = useState(null)
  const [message, setmessage] = useState(null)

  const closemodalhandler = () => {
    props.setshow(false);
  };

  const onchangehandler = (e) => {
    setmessage(e.target.value)
  };



  // Schema for yup

  const onMethod = async (values) => {

    try {

      setError(null)
      const responseData = await sendRequest(
        `${baseUrl}/calls/${props.callId}/note`,
        "POST",
        JSON.stringify({
          content: message,
        }),
        {

          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        }
      );
      alert("Note Added=" + message)
      closemodalhandler();

    } catch {
      if (status === 401 || status === 400) {
        setError(error);
        console.log(error);

      }
      else {
        setError("Something went wrong!");
      }
    }
  };





  return (
    <div>
      <Modal show={props.show}>
        <Modal.Header >
          <Modal.Title>Add Note Message</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <CONTAINER>

           //Sets initial values for form inputs

            <MYFORM className="mx-auto">
              <Form.Group controlId="formName">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  type="text"
                  name="msg"
                  onChange={onchangehandler}
                />
              </Form.Group>

              <BUTTON variant="primary" onClick={onMethod}>
                Add
              </BUTTON>

              {Error ? (
                <div className="error-message">Unable to Add! </div>
              ) : (
                " "
              )}
            </MYFORM>


          </CONTAINER>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => {
            closemodalhandler();
          }} variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Note;