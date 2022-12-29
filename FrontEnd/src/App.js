import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/client_view/Home';
import Shop from './pages/client_view/Shop';
import Book from './pages/client_view/Book';
import Cart from './pages/client_view/Cart';
import Login from './pages/client_view/Login';
import Signup from './pages/client_view/Signup';
import BookAdmin from './pages/admin_view/BookAdmin';
import Addbook from './pages/admin_view/Addbook';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/shop' element={<Shop/>}/>
          <Route path="/book-detail/:id" element={<Book />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/admin/control/book" element={<BookAdmin />} />
          <Route path="/admin/control/book/:id" element={<Addbook />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
