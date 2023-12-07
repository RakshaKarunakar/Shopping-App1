import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ProductTable from './ProductTable'
import ProductForm from './ProductForm'
import ProductView from './ProductView'
import ProductDelete from './ProductDelete'
import ProductUpdate from './ProductUpdate'
import SigninForm from './SigninForm'
import Register from './Register'
import Homepage from './Homepage'
import Userprofile from './Userprofile'
import UserData from './UserData'
import Image from './Image'

export default function Router() {
    return (
      <div>
        <BrowserRouter>
      <Routes>
      <Route exact path='/' element={<Homepage />} />
          <Route exact path='/Register' element={<Register />} />
          <Route exact path='/ProductForm' element={<ProductForm />} />
          <Route exact path='/SigninForm' element={<SigninForm />} />
          <Route exact path='/ProductTable' element={<ProductTable />} />
          <Route exact path='/ProductView' element={<ProductView />} />
          <Route exact path='/ProductDelete' element={<ProductDelete />} />
          <Route exact path='/ProductUpdate/:id' element={<ProductUpdate />} />
          <Route exact path='/Userprofile' element={<Userprofile />} />
          <Route exact path='/UserData' element={<UserData />} />
          <Route exact path='/Image' element={<Image />} />
        </Routes>
      </BrowserRouter>
  </div>
    )
  }