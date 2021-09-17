import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

import { Button } from 'react-bootstrap';
import Note from './Note';
import { useHttpClient } from './../Shared/Hooks/HttpHook';
import AuthHandler from './../Utils/Common';
import { baseUrl } from '../config/config';


function CallListItem(props) {
  const { sendRequest } = useHttpClient();
  const { getToken} = AuthHandler();

  const [show, setshow] = useState(false)

  const openmodalhandler = () => {
    setshow(true);
  };

  const archiveCall = async () => {
    try {
      await sendRequest(
        `${baseUrl}/calls/${props.id}/archive`,
        "PUT",
        null,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        }
      );
      props.getCalls()
      // setCallslist(responseData.nodes);
    } catch (error) {
      console.log(error);
    }
    ;
  }

  return (

    <Card style={{ width: '18rem' }} className="box">
      <Card.Body>
        <Card.Title>Call Details</Card.Title>
        {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}

        <Card.Text>
          Duration: {props.duration}
        </Card.Text>

        <Card.Text>
          To: {props.to}
        </Card.Text>

        <Card.Text>
          From: {props.from}
        </Card.Text>

        <Card.Text>
          Call Type: {props.call_type}
        </Card.Text>


        <Card.Text>
          Via: {props.via}
        </Card.Text>

        <Button variant="secondary" onClick={() => {
          openmodalhandler();
        }}>
          Add Note
        </Button>{' '}
        <Button variant="secondary" onClick={() => archiveCall()} >{props.is_archived ? "Unarchive " : "Archive "}Chat</Button>
        <Note show={show} setshow={setshow} callId={props.id} />
      </Card.Body>
    </Card>





  );
}

export default CallListItem;