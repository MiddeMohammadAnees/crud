import React, { useState, useEffect } from 'react';
import { EmployeeData } from './Employeedata';

function App() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0); // Changed to lowercase 'age'
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handleEdit = (id) => {
    const dt = data.filter(item => item.id === id);
    if (dt !== undefined) { 
      setIsUpdate(true)
      setId(0);
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName); // Corrected function name
      setAge(dt[0].age); // Corrected function name
    }
  };

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure you want to delete this item?")) {
        const dt = data.filter((item) => item.id !== id);
        setData(dt);
      }
    }
  };

const handleSave = () => {
  let error='';
  if(firstName === '')
  error +='First name is required';
  if(lastName === '')
  error +='Last name is required';
  if(age <=0)
  error +='Age is required';
if(error===''){
  const dt = [...data];
  const newObjects = {
    id: EmployeeData.length + 1,
    firstName: firstName,
    lastName: lastName,
    age: age
  };
  dt.push(newObjects);
  setData(dt);
}
else{
  alert(error)
}
};

  const handleUpdate = () => {
    const index = data.map((item) =>{
      return item.id
    }).indexOf(id)
    const dt =[...data];
    dt[index].firstName = firstName;
    dt[index].lastName = lastName;
    dt[index].age= age;

    setData(dt);
   handleClear();
  };

  const handleClear = () => {
    setFirstName('');
    setLastName('');
    setAge(0);
    setId('');
    setIsUpdate(false);
  };

  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px", marginTop: "10px" }}>
        <div>
          <label>First Name:</label>
          <input type="text" placeholder='Enter first name' onChange={(e) => setFirstName(e.target.value)} value={firstName} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" placeholder='Enter last name' onChange={(e) => setLastName(e.target.value)} value={lastName} />
        </div>
        <div>
          <label>Age:</label>
          <input type="text" placeholder='Enter Age' onChange={(e) => setAge(e.target.value)} value={age} />
        </div>
        <div>
          {
          !isUpdate ? <button className='btn btn-primary' onClick={(e) => handleSave(e)}>Save</button>
          : <button className='btn btn-primary' onClick={() => handleUpdate()}>Update</button>
          }
        </div>
        <button className='btn btn-danger' onClick={() => handleClear()}>Clear</button>
      </div>

      <table className='table table-hover'>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <td>
                <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button>
                <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
