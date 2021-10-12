import axios from 'axios';
import React, { useState } from 'react'
import { Button, ItemContent, Segment } from 'semantic-ui-react';
import ValidationErrors from './ValidationErrors';

const TestError = () => {
    const baseUrl = 'http://localhost:5000/api/'
    const [errors, setErrors] = useState(null)

    function handleNotFound() {
        axios.get(baseUrl + 'buggy/not-found').catch(err => console.log(err.response));
    }

    function handleBadRequest() {
        axios.get(baseUrl + 'buggy/bad-request').catch(err => console.log(err.response));
    }

    function handleServerError() {
        axios.get(baseUrl + 'buggy/server-error').catch(err => console.log(err.response));
    }

    function handleUnauthorised() {
        axios.get(baseUrl + 'buggy/unauthorised').catch(err => console.log(err.response));
    }

    function handleBadGuid() {
        axios.get(baseUrl + 'activities/notaguid').catch(err => console.log(err.response));
    }

    function handleValidationError() {
        axios.post(baseUrl + 'activities', {}).catch(err => setErrors(err));
    }
    return (
        <div>
            
            <Segment className='bgColor'  style={{marginTop: '20vh', backgroundColor: 'blue', color: 'black'}}>
                 <ItemContent  style={{textAlign: 'center'}} as='h3' content='Testing Components' />
                <Button.Group widths='7'>
                    <Button onClick={handleNotFound} content='Not Found' basic primary />
                    <Button onClick={handleBadRequest} content='Bad Request' basic primary />
                    <Button onClick={handleValidationError} content='Validation Error' basic primary />
                    <Button onClick={handleServerError} content='Server Error' basic primary />
                    <Button onClick={handleUnauthorised} content='Unauthorised' basic primary />
                    <Button onClick={handleBadGuid} content='Bad Guid' basic primary />
                </Button.Group>
            </Segment>
            {errors && 
            <ValidationErrors errors={errors}/>}
        </div>
    )
}

export default TestError
