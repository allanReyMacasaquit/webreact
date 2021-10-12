import { observer } from 'mobx-react-lite'
import { Fragment } from 'react'
import {Header, ItemGroup, } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/contexts/storeContext'
import ActivityListItem from './ActivityListItem'


const ActivityList = () => {
    const {activityStore} = useStore();
    const {groupedActivities} = activityStore
    
    return (
       <>
       {groupedActivities.map(([group, activities]) => (
           <Fragment key={group}>
               <Header >
                    {group}
               </Header>
               <ItemGroup className='title' >
                {activities.map(activity => (
                       <ActivityListItem key={activity.id} activity={activity}/>
                    ))}
                </ItemGroup>   
           </Fragment>
       ))}
       </>
       
      
    )
}

export default observer(ActivityList) 
