import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Icon, Segment, SegmentInline } from 'semantic-ui-react'

const NotFound = () => {
    return (
        <div>
            <Segment style={{color: 'yellow', marginTop: '20vh'}} placeholder>
                <Header icon>
                <Icon name='search'/>
                Ooops - we've looked everywhere and could not find this.
                </Header>

                <SegmentInline>
                    <Button as={Link} to='/activities' className='btn' style={{color: 'white', }} >
                        Return to activities page
                    </Button>
                </SegmentInline>
            </Segment>
        </div>
    )
}

export default NotFound
