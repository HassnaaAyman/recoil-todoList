import React, { useState } from 'react';
import './App.css';
import {atom , useRecoilValue, useSetRecoilState , selector, useRecoilState} from 'recoil'
import Posts from './components/posts';

const todos = atom({
  key : 'todos',
  default : []
})

const filterTodosValues = atom({
  key : 'filterTodosValues',
  default : ''
})

const filterList = selector({
  id : 'filterList',
  get:({get})=>{
    const listState = get(todos)
    const filterListValuesState = get(filterTodosValues)
    if (filterListValuesState.length) {
      return listState.filter((item) =>
        item.value.includes(filterListValuesState) && item
      );
    }
    return todos;
  }
})

function App() {
  const todoList  = useRecoilValue(filterList)  
  const updatedList = useSetRecoilState(todos)
  const [input , setInput] = useState('')
  const [filterListState , setFilterList] = useRecoilState(filterTodosValues)
 
  const addTodo =()=>{
    updatedList((oldList)=>[
      ...oldList,
      {
        id :getId(),
        value: input
      }
    ])
    setInput('')
  }


  const filter = event => {
    const { value } = event.target;
    setFilterList(value);
}

const clearFilter = () => filterList("");


  return (
    <>
         <div>
            <p>Enter item :</p>
            <input type="text" value={input} onChange={e =>setInput(e.target.value)}/>
            <button className="addInputButton" onClick={addTodo}>Add</button>
         </div>

         <div>
             <p>Filter : </p>
             <input
                type="text"
                value={filterListState}
                onChange={(e) => filter(e)}
             />

             <button onClick={() => clearFilter()}>
                Clear
             </button>
         </div>
    {todoList.map((item)=>
      <p key={item.id}>{item.value}</p>
    )}

    <div>
       <Posts/>
    </div>
  </>
  );
}

   // create unique key
   let id = 0;
   function getId() {
     return id++;
   }

export default App;
