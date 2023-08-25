import { useEffect, useState } from 'react'

const COHORT_NAME = '2305-FTB-ET-WEB-PT'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`


export default function AllPosts() {

  const [posts, setPosts] = useState([]);
  const [searchParam, setSearchParam] = useState('');

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        let response;
        if (sessionStorage.getItem('token')) {
          response = await fetch(`${BASE_URL}/posts`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
          })
        } else {
          response = await fetch(`${BASE_URL}/posts`)
        }
        const result = await response.json();
        console.log(result.data.posts);
        setPosts(result.data.posts);
        return result
      } catch (error) {
        console.error(error);
      }
    }
    fetchAllPosts();
  }, [])

  function searchPosts() {
    return searchParam
      ? posts.filter((post) =>
        post.title.toLowerCase().includes(searchParam.toLowerCase())
      )
      : posts;
  }

  const filteredPosts = searchPosts();

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      const result = await response.json();
      console.log(result);
      if (result.success) {
        const afterDeletePosts = posts.filter(post => post._id != postId);
        setPosts(afterDeletePosts);
      }
      return result

    } catch (err) {
      console.log('failed to delete post ', err);
    }
  }

  return (
    <>
      <div className='all-posts-container'>
        <h1>Strangers Things</h1>
        <div>
          <label className='search-bar'>
            Search
            <input
              type="text"
              placeholder=""
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="posts-container">
        {filteredPosts.map(post => (
          <div key={post._id} className="post-card">
            <div>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <b>{post.price}</b>
              <p>{post.location}</p>
              <p>{post.willDeliver}</p>
              {
                post.isAuthor && <button style={{ backgroundColor: 'red', color: 'white', padding: '0px 5px' }} onClick={() => { handleDeletePost(post._id) }}>delete</button>
              }
            </div>
            {/* {!auth || post.author.id === isLoggedIn.id ? null : (
            <messageForm onMessageSubmit={handleMessageSubmit} isAuthenticated={isAuthenticated} />
            )} */}
          </div>
        ))}

      </div>
    </>
  )

}


// const response = await fetch(`${BASE_URL}/posts`, {
//     method: "POST",
//     headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`
//   },
// });
