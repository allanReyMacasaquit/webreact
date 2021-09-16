import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './components/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid'

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);
  //get all activities
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
    .then(response => 
      {
        setActivities(response.data)
      })
  }, [])

  //get activity by id
  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id))
  }
  //cancel activity
  function handleCancelSelectActivity() {
    setSelectedActivity(undefined)
  }

  //handle open Form
  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity()
    setEditMode(true)
  }

  //handle form close
  function handleFormClose() {
    setEditMode(false)
  }

  //handle create/edit Activity
  function handleCreateOrEditActivity(activity: Activity) {
    activity.id 
    ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
    : setActivities([...activities, {...activity, id: uuid()}])
    
    setEditMode(false)
    setSelectedActivity(activity)
  }

  //handle delete activity
  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter(x => x.id !== id)])
  }



  return (
    <>
     <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        
        <ActivityDashboard
          //show all list of activities 
          activities={activities}

          //show view and cancel select by id activity
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}

          //show form and create form activity
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}

          //show createOrEdit submit activity
          createOrEdit={handleCreateOrEditActivity}

          //show delete activity
          deleteActivity={handleDeleteActivity}

        />
      </Container> 
      
    </>
  );
}

export default App;

