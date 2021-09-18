import React from 'react'
import { Button, Container, Menu} from 'semantic-ui-react'
import { useStore } from '../../stores/Istore'

function NavBar() {
    const {activityStore} = useStore();
    return (
        <div>
            <Menu inverted fixed='top'>
                <Container>
                    <Menu.Item header>
                        <img src='/assets/logo.png' alt='logo' style={{marginRight: '10px'}}/>
                        Group Activity
                    </Menu.Item>
                    <Menu.Item name='Activities'/>
                    <Menu.Item>
                        <Button onClick={() => activityStore.openForm()} positive content='create activity'/>
                    </Menu.Item>
                </Container>
            </Menu>
        </div>
    )
}

export default NavBar
