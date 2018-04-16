import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

function PlayerPreview(props) {
    return(
        <div>
             <div className="column" >
                    <img className="avatar" src={props.avatar} alt={"avatar for"+props.username}/>
                    <h2 className="username"  >@{props.username}</h2>
            </div>
            {props.children}
        </div>
    )
}

PlayerPreview.PropTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
}

module.exports= PlayerPreview;