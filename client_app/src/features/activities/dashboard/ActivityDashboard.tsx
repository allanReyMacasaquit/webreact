import { observer } from 'mobx-react-lite'
import React from 'react'
import { Grid, GridColumn} from 'semantic-ui-react'
import { useStore } from '../../../app/stores/Istore'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

function ActivityDashboard() {
     const {activityStore} = useStore();
     const {selectedActivity, editMode} = activityStore;
    return (
        <>
            <Grid>
                <Grid.Column width='10'>
                    <ActivityList/>
                </Grid.Column>

                <GridColumn width='6'>
                    {selectedActivity && !editMode &&
                    <ActivityDetails 

                    />}
                   
                    {editMode &&
                    <ActivityForm
                       
                     
                    />}
                </GridColumn>
            </Grid>
           
        </>
    )
}

export default observer( ActivityDashboard)