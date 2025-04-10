import React, { Component } from 'react';
import {NavLink} from "reactstrap";
import {Link} from "react-router-dom";

export class MovieCollection extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center"}}>
                {this.props.movies.map((movie, i) =>
                    <NavLink key={i} tag={Link} className="text-dark" to={'/movie/' + movie.id}>
                        <div className="element">
                            {movie.fullPosterPath220x330 ? <img style={{borderRadius: 10}} src={movie.fullPosterPath220x330} /> : null}
                            <div className="title">{movie.title}</div>
                            <div>Rating: {movie.voteAverage}</div>
                            <div>Vote count: {movie.voteCount}</div>
                        </div>
                    </NavLink>
                )}
            </div>
        );
    }
}