import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

 
const Record = (props) => (
 <tr>
   <td>{props.record.name}</td>
   <td>{props.record.year}</td>
   <td>{props.record.category}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 const [searched, justSearched] = useState(false)
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
    if (!searched) {
     const response = await fetch(`http://localhost:5000/record/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
  }
 
   getRecords();
   return;

 }, [records.length]);
 
 // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });
 
    const newRecords = records.filter((el) => el._id !== id);
    justSearched(false)
    setRecords(newRecords);
  }
 
 // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
      <Record
      record={record}
      deleteRecord={() => deleteRecord(record._id)}
      key={record._id}
      />
      );
    });
  }

 //this section acquires the search results and changes the records to that
 const search = async (e) => {
  console.log("here 1")
  const term = e.target.value; //the search term in the bar
  if (!term || term == "") {
    justSearched(false)
  } else {
    const jason = {
      searchterm: term,
    }
    const response = await fetch(`http://localhost:5000/search`,
    {
      method: "POST",
      body: JSON.stringify(jason),
      headers: {'Content-Type': 'application/json'}
    })
    console.log("here 2")
    const students = await response.json()
    console.log("students is", students)
    justSearched(true)
    setRecords(students)
  }
  };
 
 // This following section will display the table with the records of individuals.
 return (
 <div>
  <h3>Record List</h3>
  <div>
    <Form>
      <FormControl
      type="search"
      placeholder="Search"
      className="me-5"
      aria-label="Search"
      onChange={search} // onChange will trigger "search post"
      />
    </Form>
    </div>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Year</th>
           <th>Category</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}