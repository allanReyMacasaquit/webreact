import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import {Button, Container, Form, FormTextArea, Input, ItemExtra, Segment } from 'semantic-ui-react'
import Loading from '../../../app/layout/Loading';
import { useStore } from '../../../app/stores/contexts/storeContext'
import {v4 as uuid} from 'uuid'
import { Link } from 'react-router-dom';

const ActivityForm = () => {
    const {activityStore} = useStore();
    const {createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();
    const history = useHistory();

    const [activity, setActivity] = useState({
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    })

    useEffect(() => {
        if (id) {
            loadActivity(id).then((activity)=> {
                return setActivity(activity!);
            })
        }
    }, [id, loadActivity])
    
    function handleSubmitForm() {
       if (activity.id.length === 0 ) {
           let newActivity = {
               ...activity,
               id: uuid(),
            };

            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
       } else {
           updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
       }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target
        setActivity({...activity, [name]: value})
    }

    if (loadingInitial) return <Loading content='Loading Activity...'/>

    return (
        <div>
            <Container>
                <Segment style={{marginTop: '6rem'}} clearing>
                <Form  onSubmit={handleSubmitForm} autoComplete='off'>
                    <Form.Field required>
                        <label>Title</label>
                        <Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange}/>
                    </Form.Field>
                    
                       
                    <FormTextArea required label='Description' placeholder='decription' value={activity.description} name='description' onChange={handleInputChange}></FormTextArea>
                   
                   
                    <Form.Field required>
                        <label>Category</label>
                        <Input placeholder='City' value={activity.category} name='category' onChange={handleInputChange}/>
                    </Form.Field>

                    <Form.Field required>
                        <label>City</label>
                        <Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange}/>
                    </Form.Field>

                      <Form.Field required>
                        <label>Venue</label>
                        <Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange}/>
                    </Form.Field>

                     <Form.Field required>
                        <label>Date</label>
                        <Input placeholder='Date' type='date' value={activity.date} name='date' onChange={handleInputChange}/>
                    </Form.Field>
                    <ItemExtra>
                        <Button loading={loading} floated='right' content='Submit' className='btn'></Button>
                        <Button as={Link} to='/activities' floated='right' content='Cancel' className='btn-cancel'></Button>
                    </ItemExtra>
                    
                </Form>
            </Segment>
            </Container>
           
        </div>
    )
}

export default observer(ActivityForm) 
