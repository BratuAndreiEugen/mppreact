import React, { useEffect, useState } from 'react';
import {add, getAll, remove, update} from "../utils/RestHandler";
import "./MyTable.css"
import "./MyForm.css"

const ConcertTable = () => {
    const [concerts, setConcerts] = useState([]);
    const [selectedConcert, setSelectedConcert] = useState(null);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [avbSeats, setAvbSeats] = useState('');
    const [soldSeats, setSoldSeats] = useState('');

    useEffect(() => {
        fetchConcerts();

        const interval = setInterval(() => {
            fetchConcerts();
        }, 6000); // 60000 milliseconds = 1 minute

        // Clean up the interval when the component is unmounted
        return () => clearInterval(interval);
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        e.preventDefault();
        console.log("SELECTED : ", selectedConcert)
        if (selectedConcert) {
            let updatedConcert = {
                nume: name,
                dataStr: date.toString().replace("T", " "),
                location: location,
                avbSeats: avbSeats,
                soldSeats: soldSeats
            };
            try {
                await update(selectedConcert.id, updatedConcert);
                fetchConcerts();
                clearForm();
                setSelectedConcert(null);
            } catch (error) {
                console.log('Error updating concert:', error);
            }
        }
        else{
            let updatedConcert = {
                nume: name,
                dataStr: date.toString().replace("T", " "),
                location: location,
                avbSeats: avbSeats,
                soldSeats: soldSeats
            };
            try {
                await add(updatedConcert);
                fetchConcerts();
                clearForm();
                setSelectedConcert(null);
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

    const fetchConcerts = async () => {
        try {
            const data = await getAll();
            setConcerts(data);
        } catch (error) {
            console.log('Error fetching concerts:', error);
        }
    };

    const handleDelete = async () => {
        if (selectedConcert) {
            try {
                console.log(selectedConcert)
                await remove(selectedConcert.id);
                setConcerts(concerts.filter(concert => concert.id !== selectedConcert.id));
                setSelectedConcert(null);
            } catch (error) {
                console.log('Error deleting concert:', error);
            }
        }
        clearForm()
    };

    const handleSelect = async (concert) => {
        setSelectedConcert(concert);
        setName(concert.nume);
        setLocation(concert.location);
        setDate(concert.data.toString().replace("T", " ").slice(0, -3));
        setAvbSeats(concert.avbSeats);
        setSoldSeats(concert.soldSeats);
    }

    return (
        <div>
        <div>
            <h1>Concert Table</h1>
            <table className={'MyTable'}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Available Seats</th>
                    <th>Sold Seats</th>
                </tr>
                </thead>
                <tbody>
                {concerts.map(concert => (
                    <tr key={concert.id} onClick={() => handleSelect(concert)}>
                        <td>{concert.id}</td>
                        <td>{concert.nume}</td>
                        <td>{concert.location}</td>
                        <td>{concert.data}</td>
                        <td>{concert.avbSeats}</td>
                        <td>{concert.soldSeats}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={handleDelete} disabled={!selectedConcert} className={'MyButton'}>
                Delete
            </button>
        </div>
        <div>
            <h2>Concert Form</h2>
            <form className={'MyForm'}>
                <div>
                    <label>Name: </label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <label>Location: </label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}/>
                </div>
                <div>
                    <label>Date: </label>
                    <input type="text" value={date}  onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div>
                    <label>Available Seats: </label>
                    <input type="text" value={avbSeats}  onChange={(e) => setAvbSeats(e.target.value)}/>
                </div>
                <div>
                    <label>Sold Seats: </label>
                    <input type="text" value={soldSeats}  onChange={(e) => setSoldSeats(e.target.value)}/>
                </div>
                <button type="submit" onClick={handleUpdate}>Save</button>
                <button type="button" onClick={clearForm}>Clear</button>
            </form>
        </div>
        </div>
    );
};

export default ConcertTable;