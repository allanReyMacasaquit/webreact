import {Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import HomePage from '../../features/home/HomePage';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityForm from '../../features/activities/form/ActivityForm';
import { Route, Switch, useLocation } from 'react-router';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestError from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';

function App() {
  const location = useLocation();
  
  
  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar closeOnClick draggable/>
    <Route exact path='/' component={HomePage}/>
      <Route 
      path={'/(.+)'}
      render={() => (
        <>
        <NavBar/>
        <Container style={{marginTop: '1rem'}}>
        <Switch>
          <Route exact path='/activities' component={ActivityDashboard}/>
          <Route path='/activities/:id' component={ActivityDetails}/>
          <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm}/>
          <Route path='/errors' component={TestError}/>
          <Route path='/server-error' component={ServerError}/>
          <Route component={NotFound}/>
        </Switch>
        
        </Container>
        </>
      )}
      />
      
        
    </>
  );
}

export default observer(App) ;