import React, { useEffect, useState } from 'react';
import '../../App.css'
import glass from "../../assets/magnifying.svg";

const SpanishSearchBar = (props) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleFindFriends = () => {
        var url = new URL("https://webdev.cse.buffalo.edu/hci/api/api/aquafit/users?");
        url.searchParams.append('attributes', JSON.stringify({
            "path": "username",
            "equals": searchTerm
          }))
        fetch(url, {
            method: "GET",
            headers:{
                "Authorization":
                `Bearer ${localStorage.getItem("token")}`
            }
        }).then((response) => response.json()).then((res) => {
            if (res[1] != 0) {
                window.location.href = "/hci/teams/aquafit/profile/" + res[0][0].id;
            }
            else {
                alert("Usuario no encontrado");
            }
        })
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        if (props.onSearchChange) {
            props.onSearchChange(e.target.value);
        }
    };

    const keyPress = (event) => {
        if (event.key === 'Enter') {
            handleFindFriends();
        }
    }

    return (
        <div className="search-bar">
        <img src = {glass} className="mglass" id = "mglass" alt = "maginifying glass"/>
            <input
                type="text"
                placeholder= "Buscar usuario"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={keyPress}
            />
        </div>
    );
};

export default SpanishSearchBar;