// src/App.jsx
import './App.css';
import Greeting from './Greeting';
import UserCard from './UserCard';
import TaskList from './TaskList';

function App() {
  return (
    <div className="App">
      {/* компонент из примера 1 */}
      <Greeting />

      {/* компонент из примера 2 */}
      <UserCard
        name="Иван Иванов"
        role="Администратор"
        avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfVMhpKmVy_-iwfRLAiNiaDslMa-2oEz7KTw&s"
        isOnline={true}
      />

      {/* компонент из примера 3 */}
      <TaskList />
    </div>
  );
}

export default App;
