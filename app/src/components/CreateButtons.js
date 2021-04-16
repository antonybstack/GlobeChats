import React, { useEffect, useState } from 'react';
import CreateEvent from "./CreateEvent";

function CreateButtons() {

    const [ displayEvent, setDisplayEvent ] = useState(
        {
            displayEvent: false,
        });
    const [ displayChat, setDisplayChat ] = useState(false);

    const newEventClick = (event) => {
        setDisplayEvent({
            displayEvent: !displayEvent.displayEvent,
        });
        console.log(displayEvent);
    }

    const newGroupClick = (event) => {
        setDisplayEvent(true);
    }

    return (
        <div>
            <div>
                { displayEvent.displayEvent ? <CreateEvent handleClose={newEventClick} /> : null}
                { displayChat ? console.log('hey') : null}
            </div>
            <div class="create-buttons">
                <div class="circleBase type1 create-buttons-left" onClick={newEventClick}>
                    <div class="outer-icon">
                        <div class="inner-calendar-icon"></div>
                    </div>
                </div>
                <div class="circleBase type1 create-buttons-right" onClick={newGroupClick}>
                    <div class="outer-icon">
                        <div class="inner-group-icon"></div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default CreateButtons;