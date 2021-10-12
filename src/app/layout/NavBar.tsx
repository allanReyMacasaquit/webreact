import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { Button, Card, Container, Menu, MenuItem } from 'semantic-ui-react'

const NavBar = () => {

    return (
        <Menu inverted fixed='top'>
            <Container >
                <MenuItem as={NavLink} to='/' exact header>
                    <img className='bgColor' style={{borderRadius: '10px'}} src='/assets/logo.png' alt="logo"/>
                </MenuItem>
                <Card className='bgColor' style={{borderRadius: '50px', textAlign: 'center', fontSize: '1.5rem',color: 'teal'}} as={NavLink} to='/activities' name='i-connect'>i-connect</Card>
                <MenuItem>
                    <Card className='btn'> 
                        <Button as={NavLink} to='/errors' className='btn-delete' color='red' content='Errors' ></Button>
                    </Card>
                </MenuItem>
                <MenuItem>
                    <Card className='btn'> 
                        <Button as={NavLink} to='/createActivity' className='btn' color='teal' content='Create Activity' ></Button>
                    </Card>
                </MenuItem>
            </Container>
             
        </Menu>
    )
}

export default observer(NavBar) 
