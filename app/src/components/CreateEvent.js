import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CreateEvent(props) {

    const [ title, setTitle ] = useState("");
    const [ desc, setDesc ] = useState("");
    const [ loc, setLoc] = useState("");
    const [ creator, setCreator ] = useState("");
    const [ date, setDate ] = useState("");

    const settingTitle = (event) => setTitle(event.target.value);
    const settingDesc = (event) => setDesc(event.target.value);
    const settingLoc = (event) => setLoc(event.target.value);
    const settingDate = (event) => setDate(event.target.value);

    const submitNewEvent = (event) => {
        event.preventDefault();

        if (!title || !desc || !loc || !date) {
            alert("Please make sure to enter all the fields!");
            return;
        }

        console.log('title ' + title + ' desc ' + desc + ' loc ' + loc + ' date ' + date);

        setCreator("testing");

        /*fetch("/api/events/new", {
            method: "POST",
            headers: {
                Authorization: `Bearer`,
            },
            body: {title, desc, loc, creator, date}
        }).then((fetchResponse) => {
            console.log(fetchResponse);
        });*/

        axios
        .post('/api/events/new', {title, desc, loc, creator, date})
        .then((res) => {
            console.log("success!")
        })
        .catch((error) => {
            console.log(error);
        });

    }

    return (
        <div class="event-create-container">
            <div class="event-header">
                <div class="event-header-middle">
                    Create New Event
                </div>
                <div class="event-close-outside" onClick={props.handleClose}>
                    <div class="event-close-x-left">
                      <div class="event-close-x-right"></div>
                    </div>
                  </div>
            </div>
            <form class="event-form" onSubmit={submitNewEvent}>
                <div class="event-row">
                    <div class="event-col-25">
                        <label class="event-form-label">Event Title</label>
                    </div>
                    <div class="event-col-75">
                        <input class="event-input-text" type="text" name="{title}" onChange={settingTitle} />
                    </div>
                </div>

                <div class="event-row">
                    <div class="event-col-25">
                        <label class="event-form-label">Event Date</label>
                    </div>
                    <div class="event-col-75">
                        <input class="event-input-date" type="date" name="{date}" onChange={settingDate} />
                    </div>
                </div>

                <div class="event-row">
                    <div class="event-col-25">
                        <label class="event-form-label">Description</label>
                    </div>
                    <div class="event-col-75">
                        <textarea class="event-textarea" name="{desc}" onChange={settingDesc}></textarea>
                    </div>
                </div>

                <div class="event-row">
                    <div class="event-col-25">
                        <label class="event-form-label">Location</label>
                    </div>
                    <div class="event-col-75">
                        <input class="event-input-text" type="text" name="{loc}" onChange={settingLoc} />
                    </div>
                </div>

                <div class="event-row">
                    <div class="event-col-50-left">
                        <input class="event-submit-buttons" type="submit" value="Create Event" />
                    </div>
                    <div class="event-col-50-right">
                        <input class="event-submit-buttons" type="submit" value="Cancel" onClick={props.handleClose}/>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateEvent;