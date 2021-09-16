import React, {useEffect, useState} from 'react';
import { Container} from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './components/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid'
import agent from '../api/agent';
import Loading from './components/Loading';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);


  // get all activities
  // replacing axios.get Activity by agent 
  useEffect(() => {
    agent.Activities.list()
    // axios.get<Activity[]>('http://localhost:5000/api/activities')
    .then(response => 
      {
    // splitting the date from time.
        let activities: Activity[] = [];

        response.forEach(activity => {
        activity.date = activity.date.split('T')[0];

        activities.push(activity)
        })

    // removing the data here.
    // setActivities(response.data) 
        setActivities(activities)

    // loading
        setLoading(false);
        
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
    setSubmitting(true);
    if(activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }
  // function handleCreateOrEditActivity(activity: Activity) {
  //   activity.id 
  //   ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
  //   : setActivities([...activities, {...activity, id: uuid()}])
    
  //   setEditMode(false)
  //   setSelectedActivity(activity)
  // }

  //handle delete activity
  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(()=> {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
      
    })
    
  }

  if (loading) return <Loading content='Loading app'/>

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

          submitting={submitting}

        />
      </Container> 
      
    </>
  );
}

export default App;

