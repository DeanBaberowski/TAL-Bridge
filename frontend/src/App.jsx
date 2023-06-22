import React, { useState } from 'react'
import Login from './Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import Customer from './Customer'
import Profile from './Profile'
import Home from './Home'
import AddCustomer from './AddCustomer'
import EditCustomer from './EditCustomer'
import Start from './Start'
import CustomerDetail from './CustomerDetail'
import CustomerLogin from './CustomerLogin'
import FileList from './FileList'


function App() {
  const [files, setFiles] = useState([{
    name: '',
}]);

const removeFile = (filename) => {
  setFiles(files.filter(file => file.name !== filename))
}

console.log(files)

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard />}>
        <Route path='' element={<Home />}></Route>
        <Route path='/customer' element={<Customer />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/create' element={<AddCustomer />}></Route>
        <Route path='/customerEdit/:id' element={<EditCustomer />}></Route>
      </Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/start' element={<Start />}></Route>
      <Route path='/customerLogin' element={<CustomerLogin />}></Route>
      <Route path='/customerDetail/:id' element={<CustomerDetail files={files} setFiles={setFiles} removeFile={removeFile} />}></Route>
      <Route path='/fileList' element={<FileList files={files} removeFile={removeFile} />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
