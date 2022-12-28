import React from 'react'

const Search = () => {
  return (
    <div className='search'>
        <div className="searchInfo">
            <input type="text" placeholder='find a user'/>
        </div>
        <div className="usersChat">
            <img src="" alt="" />
            <div className="chatInfo">
                <span>John</span>
                <p>hello</p>
            </div>
        </div>
    </div>
  )
}

export default Search