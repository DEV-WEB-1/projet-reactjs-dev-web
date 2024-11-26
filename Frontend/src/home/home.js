import Header from '../header/header';
import Title from '../title/title';
import Filter from '../filter/filter';
import Rooms from '../RoomList/rooms';
import Panel from '../panel/panel';

function Home() {
  return (
    <div>
      <Header/>
      <Title title="Welcome, User"/>
      <Filter/>
      <Rooms/>
      <Panel/>
    </div>
  );
}

export default Home;
