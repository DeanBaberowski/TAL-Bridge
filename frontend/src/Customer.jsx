import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Customer() {
  const [data, setData] = useState([])

  useEffect(()=> {
    axios.get('http://localhost:8081/getCustomer')
    .then(res => {
      if(res.data.Status === "Success") {
        setData(res.data.Result);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }, [])

  const handleDelete = (id) => {
    axios.delete('http://localhost:8081/delete/'+id)
    .then(res => {
      if(res.data.Status === "Success") {
        window.location.reload(true);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Customer List</h3>
      </div>
      <Link to="/create" className='btn btn-success'>Add Customer</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {data.map((customer, index) => {
              return <tr key={index}>
                  <td>{customer.name}</td>
                  <td>{
                    <img src={`http://localhost:8081/images/`+customer.image} alt="" className='employee_image'/>
                    }</td>
                  <td>{customer.email}</td>
                  <td>{customer.address}</td>
                  <td>
                    <Link to={`/customerEdit/`+customer.id} className='btn btn-primary btn-sm me-2'>Edit</Link>
                    <button onClick={e => handleDelete(customer.id)} className='btn btn-sm btn-danger'>Delete</button>
                  </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Customer