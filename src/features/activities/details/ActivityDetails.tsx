import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import {  Grid,  GridColumn} from 'semantic-ui-react'
import Loading from '../../../app/layout/Loading';
import { useStore } from '../../../app/stores/contexts/storeContext'
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSideBar from './ActivityDetailedSideBar';


const ActivityDetails = () => {
    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity])

    if (loadingInitial || !activity) return <Loading/>;

    return (
        <div>
            <Grid style={{marginTop: '5rem'}}>
                <GridColumn width={10}>
                    <ActivityDetailedHeader activity={activity}/>
                    <ActivityDetailedInfo activity={activity}/>
                    <ActivityDetailedChat/>
                    
                </GridColumn>
                <GridColumn width={6}>
                    <ActivityDetailedSideBar/>
                </GridColumn>
            </Grid>
        </div>
    )
}

export default observer(ActivityDetails) 
