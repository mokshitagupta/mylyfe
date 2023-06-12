import React, { useEffect, useState } from 'react';
import '../App.css'
import glass from "../assets/magnifying.svg";
import { Link } from 'react-router-dom';

const SearchBar = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [userDB, setUserDB] = useState([]);
    const [cache, setCache] = useState([]);
    const [display, setDisplay] = useState(false);
    const [mode, setMode] = useState(localStorage.getItem("mode"));

    function handleFindFriends() {
        var url = new URL("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/users?");
        console.log("requesting from: " + url)
        url.searchParams.append('attributes', JSON.stringify({
            "path": "username",
            "stringStartsWith": searchTerm
          }))

        //   console.log("sending this request " + url);
        return fetch(url, {
            method: "GET",
            headers:{
                "Authorization":
                `Bearer ${localStorage.getItem("token")}`
            }
        }).then((response) => response.json()).then((res) => {
            if (res[1] !== 0) {
                return setCache(res[0])
                // window.location.href = "/hci/teams/aquafit/profile/" + res[0][0].id;
            }
            else {
                // alert("User not found");
                setCache([])
            }
        })
    }

    useEffect(() => {
        setDisplay(true);
        setUserDB(cache);
    }, [cache])

    useEffect(() => {
        if (searchTerm !== "") {
            handleFindFriends();
        }
        else{
            setDisplay(false);
        }
    }, [searchTerm])

    const handleSearchChange = (e) => {
        // console.log("sending received " + JSON.stringify(userDB));
        setSearchTerm(e.target.value);
    };

    const keyPress = (event) => {
        if (event.key === 'Enter') {
            handleFindFriends();
        }
    }

    const first_five = userDB.slice(0, 5)
    if (localStorage.getItem("language") === "espanol") {
        if (mode === "light") {
            return (
                <div className="search-bar">
                    <img src = {glass} className="mglass" id = "mglass" alt = "maginifying glass"/>
                    <div className="search-input-div">
                        <input
                            id="test"
                            type="text"
                            placeholder= "Buscar usuario"
                            value={searchTerm}
                            onChange={handleSearchChange}
                                // onKeyDown={keyPress}
                        />
                        {display ? (
                            <div className="search-display-light">
                                {first_five.map((user) => (
                                    <Link to={`/profile/${user.id}`} onClick={() => window.location = "/hci/teams/aquafit/profile/" + user.id} relative="path">
                                        <div className='search-element'>
                                            {user.attributes.username}
                                        </div>
                                    </Link>
                                    )
                                    
                                )}
                            </div>
                        ):(<></>)}
                    </div>
                </div>
            );
        }
        else {  
            return (
                <div className="search-bar">
                    <img src = {glass} className="mglass" id = "mglass" alt = "maginifying glass"/>
                    <div className="search-input-div">
                        <input
                            id="test"
                            type="text"
                            placeholder= "Buscar usuario"
                            value={searchTerm}
                            onChange={handleSearchChange}
                                // onKeyDown={keyPress}
                        />
                        {display ? (
                            <div className="search-display-dark">
                                {first_five.map((user) => (
                                    <Link to={`/profile/${user.id}`} onClick={() => window.location = "/hci/teams/aquafit/profile/" + user.id} relative="path">
                                        <div className='search-element'>
                                            {user.attributes.username}
                                        </div>
                                    </Link>
                                    )
                                    
                                )}
                            </div>
                        ):(<></>)}
                    </div>
                </div>
            );
        }
    }
    else {
        if (mode === "light") {
            return (
                <div className="search-bar">
                    <img src = {glass} className="mglass" id = "mglass" alt = "maginifying glass"/>
                    <div className="search-input-div">
                        <input
                            id="test"
                            type="text"
                            placeholder= "Search for User"
                            value={searchTerm}
                            onChange={handleSearchChange}
                                // onKeyDown={keyPress}
                        />
                        {display ? (
                            <div className="search-display-light">
                                {first_five.map((user) => (
                                    <Link to={`/profile/${user.id}`} onClick={() => window.location = "/hci/teams/aquafit/profile/" + user.id} relative="path">
                                        <div className='search-element'>
                                            {user.attributes.username}
                                        </div>
                                    </Link>
                                    )
                                    
                                )}
                            </div>
                        ):(<></>)}
                    </div>
                </div>
            );
        }
        else {  
            return (
                <div className="search-bar">
                    <img src = {glass} className="mglass" id = "mglass" alt = "maginifying glass"/>
                    <div className="search-input-div">
                        <input
                            id="test"
                            type="text"
                            placeholder= "Search for User"
                            value={searchTerm}
                            onChange={handleSearchChange}
                                // onKeyDown={keyPress}
                        />
                        {display ? (
                            <div className="search-display-dark">
                                {first_five.map((user) => (
                                    <Link to={`/profile/${user.id}`} onClick={() => window.location = "/hci/teams/aquafit/profile/" + user.id} relative="path">
                                        <div className='search-element'>
                                            {user.attributes.username}
                                        </div>
                                    </Link>
                                    )
                                    
                                )}
                            </div>
                        ):(<></>)}
                    </div>
                </div>
            );
        }
    }
};

export default SearchBar;