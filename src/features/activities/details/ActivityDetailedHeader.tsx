import { observer } from 'mobx-react-lite';
import React from 'react'
import {Button, Header, Item, Segment, Image, Card, ItemExtra, } from 'semantic-ui-react'
import {Activity} from "../../../app/models/activity";

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '0%',
    left: '5%',
    width: 'auto',
    height: 'auto',
    color: 'white'
};

interface Props {
    activity: Activity
}

export default observer (function ActivityDetailedHeader({activity}: Props) {
    return (
        <Segment.Group >
            <Segment  basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle}/>
                <Segment  style={activityImageTextStyle} basic>
                    <Item.Group style={{ borderRadius: '19px', padding: 20}}  className='bgColor'>
                        <Item >
                            <Item.Content >
                                <Header
                                    className='title'
                                    content={activity.title}
                                    style={{color: 'white'}}
                                />
                                <p  style={{color: 'wheat'}}>{activity.date}</p>
                                <p  style={{color: 'wheat'}}>
                                    Hosted by <strong>Bob</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                
                        
                <ItemExtra>
                    <Button  style={{color: 'white'}} floated='right' className='btn' content='Join Activity'></Button>
                    <Button  style={{color: 'white'}} floated='right' className='btn-cancel' content='Cancel attendance'></Button>
               
                    <Card>
                        <Button  style={{color: 'white'}}  className='bgColor btn'floated='right'>
                            Manage Event
                        </Button>
                    </Card>
                </ItemExtra>
                    
                
            </Segment>
        </Segment.Group>
    )
})