import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Newpost = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');

    const handleAddNewPost = async (event) => {
        event.preventDefault();
        const post = {
            title: title,
            description: description,
            price: price,
            location: location
        }

        try {
            const response = await fetch('https://strangers-things.herokuapp.com/api/2305-FTB-ET-WEB-PT/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    post: post
                })
            })
            const result = await response.json();
            console.log(result);
            if(result.success){
                alert('post added');
                event.target.reset();
            }
        } catch (err) {
            console.log('failed to add new post ', err);
        }


    }

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            navigate('/login');
        }
    }, [])

    return (
        <div>
            <form onSubmit={handleAddNewPost} action="">
                Title : <input type="text" name="" onChange={(e) => setTitle(e.target.value)} id="" required /><br />
                Description: <input type="text" name="" onChange={(e) => setDescription(e.target.value)} id="" required /> <br />
                Price: <input type="text" name="" onChange={(e) => setPrice(e.target.value)} id="" required /> <br />
                Location: <input type="text" name="" onChange={(e) => setLocation(e.target.value)} id="" /> <br />
                <button type='submit' className='btn-add-post' style={{ margin: '10px' }}>Add Post</button>
            </form>
        </div>
    )
}

export default Newpost
