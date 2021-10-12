import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react'

const HomePage = () => {
    return (
    <>
      <Segment inverted textAlign='center' vertical className='masthead'>
        <Container text>
          <Header as='h1' inverted>
            <Image className='bgColor' style={{borderRadius: '10px', marginBotton: 12, marginBottom: '1rem'}} size='massive' src='/assets/logo.png' alt='logo'/>
            I-Connect
          </Header>
          <Header as='h2' inverted content='All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness.'/>
          
          <Button className='btn' as={Link} to='/activities' size='huge' inverted>
            Take me to FCC church activities.
          </Button>
        </Container>
      </Segment>
    </>
  )
}


export default HomePage
