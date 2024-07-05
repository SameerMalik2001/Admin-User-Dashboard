import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { createRoutesFromElements, RouterProvider, Route, createBrowserRouter, } from 'react-router-dom'
import Home from './components/Home/Home.js';
import Signup from './components/Signup/Signup.js';
import Signin from './components/Signin/Signin.js';
import Dashboard from './components/UserDashboard/Dashboard.js';
import { store } from './Redux/store.js';
import { Provider } from 'react-redux';


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route path='' element={<Home />} />
            <Route path='signin' element={<Signin />} />
            <Route path='signup' element={<Signup />} />
            <Route path='dashboard' element={<Dashboard />} />
        </Route>
    )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <Provider store={store}>
            <RouterProvider router={router}>

            </RouterProvider>
        </Provider>
);
