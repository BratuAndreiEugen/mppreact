import React, { useState } from 'react';
import { update } from '../utils/RestHandler';
import ConcertTable from "./TableForm";
import "./MyForm.css"

const ConcertForm = () => {
    const [selectedConcert, setSelectedConcert] = useState(null);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [avbSeats, setAvbSeats] = useState('');
    const [soldSeats, setSoldSeats] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedConcert) {
            const updatedConcert = {
                id: selectedConcert.id,
                name,
                location,
                date,
                avbSeats,
                soldSeats,
            };
            try {
                await update(selectedConcert.id, updatedConcert);
                //handleUpdate(updatedConcert);
                clearForm();
            } catch (error) {
                console.log('Error updating concert:', error);
            }
        }
    };

    const clearForm = () => {
        setName('');
        setLocation('');
        setDate('');
        setAvbSeats('');
        setSoldSeats('');
    };

    const fillForm = (concert) => {

    }


    return (
        <div>
            <h2>Concert Form</h2>
            <form onSubmit={handleSubmit} className={'MyForm'}>
                <div>
                    <label>Name: </label>
                    <input type="text" value={name}/>
                </div>
                <div>
                    <label>Location: </label>
                    <input type="text" value={location} />
                </div>
                <div>
                    <label>Date: </label>
                    <input type="text" value={date}  />
                </div>
                <div>
                    <label>Available Seats: </label>
                    <input type="text" value={avbSeats}  />
                </div>
                <div>
                    <label>Sold Seats: </label>
                    <input type="text" value={soldSeats}  />
                </div>
                <button type="submit">Update</button>
                <button type="button" onClick={clearForm}>Clear</button>
            </form>
        </div>
    );
};

export default ConcertForm;
