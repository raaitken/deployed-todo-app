import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem';
import Auth from './components/Auth';
import { useEffect, useState } from 'react';
import './index.css';

const App = () => {
  const userEmail = 'ania@test.com';
  const [tasks, setTasks] = useState(null);

  const authToken = true;

  const getData = async () => {

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
      const json = await response.json();
      setTasks(json);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => getData, []);
  
  console.log(tasks);

  // Sort by date
  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <div className='app'>
      {!authToken && <Auth />}
      {authToken &&
      <>
      <ListHeader listName={'🏖️ Holiday tick list'} getData={getData} />
      {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
      </>
      }
    </div>
  );
}

export default App;
