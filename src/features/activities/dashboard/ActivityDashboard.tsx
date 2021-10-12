import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Container, Grid, GridColumn } from 'semantic-ui-react'
import Loading from '../../../app/layout/Loading'
import { useStore } from '../../../app/stores/contexts/storeContext'
import ActivityFilters from './ActivityFilters'
import ActivityList from './ActivityList'


const ActivityDashboard = () => {
const {activityStore} = useStore();
const {activityRegistry, loadActivities} = activityStore;
        
        
 
  useEffect(() => {
    if(activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry.size, activityStore, loadActivities])

  if (activityStore.loadingInitial) return <Loading content='Loading Activities...'/>;

    return (
        <Container>
            <Grid>
            <GridColumn width='8'>
                <Container> 
                    <ActivityList/>  
                </Container>
            </GridColumn>

            <GridColumn width='8'>
                <Container > 
                   <ActivityFilters/>
                </Container>
            </GridColumn>
        </Grid>
        </Container>
        
        
    )
}

export default observer(ActivityDashboard) 
