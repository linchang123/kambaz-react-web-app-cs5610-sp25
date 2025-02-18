import { useState } from "react";
export default function EventObject() {
  const [event, setEvent] = useState(null);
  const handleClick = (e: any) => {
    {/**
     "e" is an event object. Event object contains information such as a timestamp of when the event occurred,
     where the mouse was on the screen, and the DOM element responsible for generating the event.
     
     "handClick" is an event handler function that accepts an event object (the event object it is accepting here
     is "e")
     */}
    e.target = e.target.outerHTML; {/** "handleClick" replaces the target property with HTML to avoid circular reference. */}
    delete e.view; {/** "handleClick" removes the view property */}
    setEvent(e);
    {/** stores the event object in variable event (or set the event object so that it can be displayed) */}
  };
  return (
    <div>
      <h2>Event Object</h2>
      <button onClick={(e) => handleClick(e)}
        className="btn btn-primary"
        id="wd-display-event-obj-click">
        Display Event Object
      </button>
      <pre>{JSON.stringify(event, null, 2)}</pre>
      {/** renders the JSON representation of the event on the screen */}
      <hr/>
    </div>
);}
