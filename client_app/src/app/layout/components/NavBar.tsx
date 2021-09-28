import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu} from 'semantic-ui-react'

function NavBar() {
 
    return (
        <div>
            <Menu inverted fixed='top'>
                <Container>
                    <Menu.Item as={NavLink} to={'/'} exact header>
                        <img src='/assets/logo.png' alt='logo' style={{marginRight: '10px'}}/>
                        Group Activity
                    </Menu.Item>
                    <Menu.Item as={NavLink} to={'/activities'} name='Activities'/>
                    <Menu.Item>
                        <Button as={NavLink} to={'/createActivity'}  positive content='create activity'/>
                    </Menu.Item>
                </Container>
            </Menu>
        </div>
    )
}

export default NavBar
