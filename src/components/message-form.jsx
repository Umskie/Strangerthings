// Any post should have a form to send a message to a post author
// So long as a user is logged in and that logged in user is not the author

// Form only needs a text input as well as a button to create/send the message
// Submit handler will need a way to know how to form the correct URL so the API responds


import { useState } from "react";

export default function messageForm({ onMessageSubmit, isAuthenticated }) {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() === '') return
        onMessageSubmit(message);
        setMessage('');
    }};

    return (
        <form onSubmit={handleSubmit}>
         <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
            disabled={!isAuthenticated}
         />
         <button type="submit" disabled={!isAuthenticated}>Send Message</button>
        </form>
  );

messageForm;


// In allPosts section
// {!isAuthenticated || post.author.id === isLoggedIn.id ? null : (
// <messageForm onMessageSubmit={handleMessageSubmit} isAuthenticated={isAuthenticated} />
// )}