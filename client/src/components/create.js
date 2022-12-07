//setup from https://www.mongodb.com/languages/mern-stack-tutorial

import React, {useState } from "react";
import {useNavigate} from "react-router";

export default function Create() {
    const [form, setForm] = useState({
        name:"",
        year:"",
        category:"",
    });
    const navigate = useNavigate();

    //update the state properties
    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value}
        });
    }

    //handles submission of person. when post request is sent, adds new record to the database
    async function onSubmit(e) {
        e.preventDefault(); //stops automatic submission

        const newPerson = {...form}
        await fetch("http://localhost:5000/record/add", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        setForm({name: "", year: "", category: ""});
        navigate("/");
    }

    return (
        <div>
            <h3> Create New Record</h3>
            <form onSubmit = {onSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                type="text"
                className="form-control"
                id="name"
                value={form.name}
                onChange={(e) => updateForm({name: e.target.value})}
                />
            </div>
            <div className="form-group">
                <label htmlFor="year">Graduation Year</label>
                <input
                type="text" //later change to date(year) type
                className="form-control"
                id="year"
                value={form.year}
                onChange={(e) => updateForm({year: e.target.value})}
                />
            </div>
            <div className="form-group">
                <label htmlFor="category">Student Category</label>
                <select name = "category" id = "category" value = {form.category}
                onChange={(e) => updateForm({ category: e.target.value })}>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Davis Scholar">Davis Scholar</option>
                </select>
            </div>
            <div className="form-group">
                <input
                type="submit"
                value="Add student"
                className="btn btn-primary"
                />
            </div>
            </form>
        </div>
    );
}