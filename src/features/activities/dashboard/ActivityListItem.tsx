
import { Link } from 'react-router-dom'
import { Button,Icon, Item, ItemContent, ItemDescription, ItemExtra, ItemGroup, ItemHeader, ItemImage, Segment, SegmentGroup } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'


interface Props {
    activity: Activity
}

const ActivityListItem = ({activity}: Props) => {
    
    return (
        <div>
            <SegmentGroup className='bgColor' style={{marginTop: '3rem'}}>
                <Segment className='bgColor'>
                    <ItemGroup  style={{margin: '2rem'}}>
                        <Item>
                            <ItemImage size='tiny' circular src='/assets/user.png'></ItemImage>
                            <ItemContent>
                                <ItemHeader as={Link} to={`/activities/${activity.id}`}>
                                    {activity.title}
                                </ItemHeader>
                                <ItemDescription >Hosted by: Bob</ItemDescription>
                            </ItemContent>
                        </Item>
                    </ItemGroup>
                </Segment>

                <Segment>
                    <span>
                        <Icon name='clock'/> {activity.date}
                        <Icon name='marker'/> {activity.venue}
                    </span>
                </Segment>

                <Segment secondary>
                    <span>
                        Attendees go here!
                    </span>
                </Segment>

                <Segment>
                    <ItemHeader>
                        {activity.description}
                    </ItemHeader>
                </Segment>

                <Segment clearing>
                    <ItemExtra>
                      
                        <Button floated='right' style={{color: 'white'}} as={Link} to={`/activities/${activity.id}`} content='View' className='btn'></Button>
                
                    </ItemExtra>
                    
                </Segment>
               
            </SegmentGroup>
        </div>
    )
}

export default ActivityListItem
