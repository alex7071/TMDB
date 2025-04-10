import React, { Component } from 'react';
import {TopRated} from "@/Components/Home/TopRated.jsx";
import Search from "@/Components/Search/Search.jsx";

export class Home extends Component {
    static displayName = Home.name;

    render () {
        return (
            <div>
                <h1>The movie database</h1>
                <p>Welcome to the movie database, you can start with:</p>
                <ul>
                    <li>View latest movies</li>
                    <li>View top movies</li>
                    <li>Search movies</li>
                    <li>Sign up to be able to comment</li>
                </ul>
                Enjoy.

                <Search />
                <TopRated />
                <TopRated nowPlaying={true} />
            </div>
        );
    }
}
