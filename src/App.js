import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Chat from './pages/Chat'
import Auth from './pages/Auth'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import Notify from './components/Notify/Notify';
import ChatService from './services/ChatService/ChatService';

const chatService = new ChatService();

function App() {
	return (
		<Router>
			<ToastContainer />
			<Routes>
				<Route path="/chat" element={<Chat chatService={chatService} />} />
				<Route path="/" element={<Auth chatService={chatService} />} />
				<Route path="/auth" element={<Auth chatService={chatService} />} />
			</Routes>
		</Router>
	)
}

export default App
