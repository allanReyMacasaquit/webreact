import React from 'react'
import Calendar from 'react-calendar'
import {Header, HeaderContent, Item, ItemContent, ItemGroup, Segment, SegmentGroup,} from 'semantic-ui-react'

const ActivityFilters = () => {
    return (
        <div>
            <SegmentGroup style={{marginTop: '4.5rem'}} stacked>
               
                <Segment className='bgColor' clearing>
                     <ItemGroup>
                         <Header style={{borderRadius: '20px'}} color='orange' size='large' attached icon='filter' content='filters'/>
                        <Item>
                            <ItemContent content='All Activities'/>
                            <ItemContent content="I'm Going"/>
                             <ItemContent content="I'm Hosting"/>
                        </Item>
                    </ItemGroup>
                    
                </Segment>

                <Segment  className='bgColor'>
                    
                    <HeaderContent content='Calendar'/>
                    <Calendar className='bgColor'/>
                </Segment>
            </SegmentGroup>
           

            
           
            
        </div>
    )
}

export default ActivityFilters
