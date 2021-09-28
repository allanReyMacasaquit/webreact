import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { Link} from 'react-router-dom';
import { Button, ButtonGroup, Card, CardDescription, Feed,   Icon, Item, ItemContent, ItemDescription, ItemExtra, ItemGroup,  LabelDetail, Segment } from 'semantic-ui-react'

import { useStore } from '../../../app/stores/Istore';


function ActivityList() {
    const [target, setTarget] = useState('')
    const {activityStore} = useStore();
    const {activitiesByDate, deleteActivity, loading} = activityStore;

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
       
    }

    return (
        <>
           <Segment>
               <ItemGroup divided>
                        <div style={{textAlign: 'center',color: 'purple', fontSize: '20px', flex: 'auto'}}>
                           <h3>{`${activitiesByDate.length} Lists of Activities`} </h3> 
                           
                        </div>
                
                    {
                        activitiesByDate.map(activity => 
                            (
                               <Item key={activity.id}>
                                   <ItemContent>
                                      
                                          
                                 
                                       <Card fluid  style={{paddingLeft: '10px', backgroundColor: 'wheat'}}>
                                        
                                    
                                                <Feed.Content>
                                                    <Feed.Summary>
                                                        You added <a href='*'>{activity.title}</a> 
                                                    </Feed.Summary>
                                                    <Feed.Meta>
                                                    <Feed.Like>
                                                        <Icon name='calendar check outline' /> {activity.date}
                                                    </Feed.Like>
                                                </Feed.Meta>
                                                <div style={{textAlign: 'center', fontSize: '20px', marginBottom: '5px'}}>{activity.category.toUpperCase()}</div>
                                        <hr style={{color: 'black', width: '4rem', marginTop: '0px'}}/>
                                       <div style={{paddingLeft: 'auto'}}>
                                            <ItemDescription style={{color: 'purple'}} >
                                                <CardDescription >{activity.description}</CardDescription>
                                            </ItemDescription>
                                            <br/>
                                        <LabelDetail content='city: ' />
                                            <div>{activity.city} </div>
                                           <br/>
                                        <LabelDetail content='venue: ' />
                                            <div>{activity.venue} </div>
                                    
                                        </div> 
                                       
                                       <ItemExtra style={{paddingRight: '10px'}}>
                                           <ButtonGroup widths='2'>
                                               <Button as={Link} to={`/activities/${activity.id}`}  content='View' color='blue'></Button>
                                               <Button 
                                                    name={activity.id}
                                                    loading={ loading && target === activity.id}  
                                                    onClick={(e) => handleActivityDelete(e, activity.id)} 
                                                    content='Delete' 
                                                    color='orange'>
                                               </Button>
                                           </ButtonGroup>
                                       </ItemExtra>
                                        </Feed.Content>
                                       </Card>
                                   </ItemContent>
                                </Item> 
                            ))
                    }
               </ItemGroup>
           </Segment>
           
        </>
    )
}

export default observer(ActivityList)
