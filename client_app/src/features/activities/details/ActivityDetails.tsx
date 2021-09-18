import { Button, ButtonGroup, Card, Image, } from 'semantic-ui-react'
import Loading from '../../../app/layout/components/Loading';
import { useStore } from '../../../app/stores/Istore'



function ActivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity: activity, openForm, cancelselectedActivity} = activityStore;

    if (!activity) return <Loading/>;
    return (
        <>
     
           <Card className='sticky' fluid raised >
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
                
                <Card.Content>
                    <Card.Header>{activity.title}</Card.Header>
                    <Card.Meta>
                        <span>{activity.date}</span>
                    </Card.Meta>
                    <Card.Description>
                        {activity.description}
                    </Card.Description>
                </Card.Content>

                <Card.Content extra>
                    <ButtonGroup widths='2'>
                        <Button onClick={() => openForm(activity.id)} color='blue' content='Edit'/>
                         <Button onClick={cancelselectedActivity}  color='orange' content='Cancel' />
                    </ButtonGroup>
                </Card.Content>

            </Card> 
            
        </>
    )
}

export default ActivityDetails

