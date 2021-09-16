import React from 'react'
import { Button, ButtonGroup, Card, CardDescription, Feed, Icon, Item, ItemContent, ItemDescription, ItemExtra, ItemGroup, ItemHeader, ItemMeta, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void

    deleteActivity: (id: string) => void
}

function ActivityList({
    activities,

    selectActivity,

    deleteActivity,
}: Props) {
    return (
        <>
           <Segment>
               <ItemGroup divided>
                        <div style={{textAlign: 'center',color: 'purple', fontSize: '20px', flex: 'auto'}}>
                           <h3>{`${activities.length} Lists of Activities`} </h3> 
                        </div>
                
                    {
                        activities.map(activity => 
                            (
                               <Item key={activity.id}>
                                   <ItemContent>
                                       <Card fluid  style={{paddingLeft: '10px', backgroundColor: 'wheat'}}>
                                       <Feed>
                                            <Feed.Event style={{borderRadius: '50%'}}>
                                                <Feed.Label style={{width: '10em', height: '7rem', flex: 'auto', marginTop: '10px', marginBottom: '10px', borderRadius: '50%'}} image={`/assets/categoryImages/${activity.category}.jpg`} 
                                                
                                                />
                                                <Feed.Content>
                                                    <Feed.Summary>
                                                        You added <a href='*'>{activity.title}</a> 
                                                    </Feed.Summary>
                                                    <Feed.Meta>
                                                    <Feed.Like>
                                                        <Icon name='like' />4 Likes
                                                    </Feed.Like>
                                                </Feed.Meta>
                                                </Feed.Content>
                                                
                                            </Feed.Event>
                                        </Feed>
                                       <div style={{paddingLeft: 'auto'}}>
                                           <ItemHeader as='a'>{activity.title}</ItemHeader>
                                            <ItemMeta>{activity.date}</ItemMeta>
                                            <ItemDescription style={{color: 'purple'}} >
                                                <CardDescription >{activity.description}</CardDescription>
                                            </ItemDescription>
                                            <div>{activity.city} </div>
                                            <div>{activity.venue}</div>
                                            <div>{activity.category}</div>
                                        </div> 
                                       
                                       <ItemExtra style={{paddingRight: '10px'}}>
                                           <ButtonGroup widths='2'>
                                               <Button  onClick={() => selectActivity(activity.id)} content='View' color='blue'></Button>
                                               <Button onClick={() => deleteActivity(activity.id)} content='Delete' color='orange'></Button>
                                           </ButtonGroup>
                                       </ItemExtra>
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

export default ActivityList
