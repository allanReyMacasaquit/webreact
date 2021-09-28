import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Grid, GridColumn} from 'semantic-ui-react'
import Loading from '../../../app/layout/components/Loading'
import { useStore } from '../../../app/stores/Istore'
import ActivityList from './ActivityList'

function ActivityDashboard() {
    const {activityStore} = useStore();
    const {loadActivities, activityCollection} = activityStore;
    

  useEffect(() => {
    if (activityCollection.size <= 1) loadActivities();
  }, [activityCollection.size, loadActivities])

  if (activityStore.loadingInitial) return <Loading content='Loading app'/>

    return (
        <>
            <Grid>
                <Grid.Column width='10'>
                    <ActivityList/>
                </Grid.Column>

                <GridColumn width='6'>
                  <h2>Activity Filter</h2>
                </GridColumn>
            </Grid>
           
        </>
    )
}
export default observer( ActivityDashboard)
