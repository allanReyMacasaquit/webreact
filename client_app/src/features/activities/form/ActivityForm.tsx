import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import { Button, ButtonGroup, Card, Form, Label, LabelDetail, Segment } from 'semantic-ui-react'
import Loading from '../../../app/layout/components/Loading';
import { useStore } from '../../../app/stores/Istore';
import {v4 as uuid} from 'uuid';
import { Link } from 'react-router-dom';

function ActivityForm() {  
    const history = useHistory();
    const {activityStore} = useStore();
    const {updateActivity, createActivity, loading, loadingInitial, loadActivity} = activityStore;
    const {id} = useParams<{id: string}>();

    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: '',
    });
    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    },[id, loadActivity]);


   
    //handle submit form
    function handleSubmit() 
    {
      if (activity.id.length === 0) 
      {
          let newActivity = 
          {
              ...activity,
              id: uuid()
          };
          createActivity(newActivity).then(() => 
          {
              history.push(`/activities/${newActivity.id}`)
          }) 
      } else 
            {
              updateActivity(activity).then(() => 
              {
                  history.push(`/activities/${activity.id}`)
              })
            }
    }

    //handle input change
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

    if (loadingInitial) return <Loading content='Loading Activity'/>
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
                        <Button loading={loading}  color='purple' type='submit' content='Submit'></Button>
                        <Button as={Link} to='/activities' color='orange' type='button' content='Cancel'></Button>
                    </ButtonGroup>
                    
                </Form>
            </Segment> 
           
        </>
    )
}

export default observer(ActivityForm)
