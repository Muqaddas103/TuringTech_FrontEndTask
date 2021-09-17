import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import AuthHandler from './../Utils/Common';
import { useHttpClient } from './../Shared/Hooks/HttpHook';
import CallList from '../Components/CallList';
import CallPagination from '../Components/Pagination';
import { Button } from 'react-bootstrap';
import { baseUrl } from '../config/config';

function Home({ setToken }) {
  const { isLoading,sendRequest } = useHttpClient();
  const [callslist, setCallslist] = useState([]);
  const { getToken, setUserSession, removeUserSession } = AuthHandler();
  const [currentPage, setCurrentPage] = useState(1);
  const [callsPerPage] = useState(4);

  const refreshToken = async () => {
    try {
      const responseData = await sendRequest(
        `${baseUrl}/auth/refresh-token`,
        "POST",
        null,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        }
      );
      setUserSession(responseData.access_token, responseData.user.id)
    } catch (err) {
      if (err.message === 'Unauthorized') {
        removeUserSession()
        setToken('')
      }
    }
  };
  useEffect(() => {
    function handleClickOutside(event) {
      refreshToken();
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const LogOut = () => {
    removeUserSession();
    setToken('');

  };
  const getCalls = async () => {
    try {
      setCallslist(null)
      const responseData = await sendRequest(
        `${baseUrl}/calls?offset=${currentPage}&limit=${callsPerPage}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        }
      );
      setCallslist(responseData.nodes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCalls();
  }, []);



  let currentCalls;
     
  useEffect(() =>{
    if(!callslist) 
    return;
    const indexOfLastcall = currentPage * callsPerPage;
   const indexOfFirstcall = indexOfLastcall - callsPerPage;
    currentCalls= callslist.slice(indexOfFirstcall, indexOfLastcall); 
    console.log("" +currentCalls)
    }, [callslist ] )

                                                                            

const paginate = pageNumber => setCurrentPage(pageNumber);



  return (
    <>
      {isLoading ? 
      <div className="centered">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      </div> :
        <Card>
          <Card.Body>
            <h1>Call Lists</h1>
            <Button onClick={LogOut} variant="primary">Log Out</Button>
            {callslist && <CallList callslist={callslist} getCalls={getCalls} />}
            { callslist &&<CallPagination
        callsPerPage={callsPerPage}
        totalCalls={callslist.length}
        paginate={paginate}/>}
          </Card.Body>
        </Card>
      }

    </>
  );
}

export default Home;