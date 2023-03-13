import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserContainer from './containers/UserContainer';
import { library} from '@fortawesome/fontawesome-svg-core';
import { faEnvelope,faPhone,faGlobe,faHeart,faPenToSquare,faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faEnvelope,faPhone,faGlobe,faHeart,faPenToSquare,faTrash);
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UserContainer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
