import React, { ChangeEvent, useState } from 'react'
import { Button, ButtonGroup, Card, Form, Label, LabelDetail, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'


interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void
    submitting: boolean;

}

function ActivityForm({
    activity: selectedActivity,
    closeForm,

    createOrEdit,

    submitting,

}: Props) {  

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: '',
        
    }

    const [activity, setActivity] = useState(initialState);

    //handle submit form
    function handleSubmit() {
        createOrEdit(activity)
    }

    //handle input change
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }


    return (
        <>
            <Segment style={{marginTop: '0px'}} clearing color='purple'>
                <Card fluid color='purple'>
                    <Label content='Submit Activity Form' size='huge' color="purple"/>
                </Card>
            
                <Form onSubmit={handleSubmit} autoComplete='off'> 
                    <LabelDetail content='Title' />
                    <Form.Input placeholder='eg.Praise and Worship Practice' value={activity.title} name='title' onChange={handleInputChange}/>

                    <LabelDetail content='Description' />
                    <Form.TextArea placeholder='eg. Learn on how to lead music team' value={activity.description} name='description' onChange={handleInputChange}/>

                    <LabelDetail content='Category' />
                    <Form.Input placeholder='eg. Worship' value={activity.category} name='category' onChange={handleInputChange}/>
                   
                    <LabelDetail content='Date' />
                    <Form.Input type ='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange}/>

                    <LabelDetail content='City' />
                    <Form.Input placeholder='eg. toronto' value={activity.city} name='city' onChange={handleInputChange}/>

                    <LabelDetail content='Venue' />
                    <Form.Input placeholder='eg. 191 address' value={activity.venue} name='venue' onChange={handleInputChange}/>
                    
                    <ButtonGroup widths='2'>
                        <Button loading={submitting}  color='purple' type='submit' content='Submit'></Button>
                        <Button onClick={closeForm} color='orange' type='button' content='Cancel'></Button>
                    </ButtonGroup>
                    
                </Form>
            </Segment> 
           
        </>
    )
}

export default ActivityForm
