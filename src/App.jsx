import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name) {
      //display alert
      showAlert(true,'please enter value','danger')
    }
    else if(name && isEditing){
      // handle edit
    }
    else {
      showAlert(true,'item added to the list','success')
      const newItem = {id: new Date().getTime().toString(), title:name};
      setList([...list,newItem]);
      setName('');
    }

  }
  const showAlert = (show = false,msg="",type="")=>{
    setAlert({show,msg,type});
  }
  const clearList = (e)=>{
    e.preventDefault();
    showAlert(true,'empty list','danger');
    setList([]);
  }
  const removeItem = (id)=>{
    showAlert(true,'item deleted','danger');
    setList(list.filter((item)=>(item.id !== id)));
  }
  return <section className='section-center'>
    <form className='grocery-form' onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} removeAlert= {showAlert} list={list}/>}
      <h3>Grocery Bud</h3>
      <div className="form-control">
        <input type="text" className='grocery' placeholder='add task' value={name} onChange={(e) => (setName(e.target.value))} />
        <button type='submit' className='submit-btn'>{isEditing? 'Edit':'Submit'}</button>
      </div>
    </form>
    {list.length > 0 && 
    (<div className='grocery-container'>
      <List items = {list} removeItem = {removeItem}/>
      <button className="clear-btn" onClick={clearList}>clear all items</button>
    </div>)
    }
  </section>
}

export default App
