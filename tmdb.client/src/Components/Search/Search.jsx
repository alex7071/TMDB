import React, {Component} from "react";
import './Search.css'
import {MovieCollection} from "@/Components/Home/MovieCollection.jsx";

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {results: [], inputValue: '', selectedGenres: [], genres: [], loading: true, page: 1, maxPage: null};
    }

    async populateGenres() {
        const response = await fetch('/tmdb/GetGenres');
        const data = await response.json();
        
        this.setState({ genres: data.genres, loading: false });
    }
    
    componentDidMount() {
        this.populateGenres().catch(error => console.log(error));
    }
    
    updateValue(evt) {
        if (evt.target.value !== '') {
            this.setState({selectedGenres: []});
            if (this.state.results.length > 0) {
                this.setState({results: []});
            }
        }
        this.setState({inputValue: evt.target.value, page: 1, maxPage: null});
    }
    
    async searchByTitle(query, page) {
        const response = await fetch('/tmdb/GetSearch/' + query + '/' + page);
        const data = await response.json();
        this.setState({ results: data.results, loading: false, page: data.page, maxPage: data.maxPage });
    }

    async searchByGenres(page) {
        const response = await fetch('/tmdb/GetByGenres/' + this.state.selectedGenres.join(',') + '/' + page);
        const data = await response.json();
        this.setState({ results: data.results, loading: false, page: data.page, maxPage: data.maxPage });
    }
    
    getResults(page = 1) {
        if (this.state.inputValue.trimEnd() !== '') {
            this.searchByTitle(this.state.inputValue, page).catch(error => console.log(error));
        } else if (this.state.selectedGenres.length > 0) {
            this.searchByGenres(page).catch(error => console.log(error));
        }
    }

    nextPage() {
        if (this.state.maxPage === this.state.page) {
            return;
        }
        let nextPage = this.state.page + 1;
        this.getResults(nextPage);
    }

    previousPage() {
        if (this.state.page > 1) {
            let previousPage = this.state.page - 1;
            this.getResults(previousPage);
        }
    }

    renderButtons() {
        return (
            <div>
                <button className={this.state.page == this.state.maxPage - 1 ? 'button button-disabled' : 'button'} style={{float: 'right'}} onClick={_ => this.nextPage()}>Next page</button><button className={this.state.page == 1 ? 'button button-disabled' : 'button'} onClick={_ => this.previousPage()}>Previous page</button>
            </div>
        );
    }

    handlCheckbox(evt, id) {
        let selectedGenres = this.state.selectedGenres;
        if (evt.target.checked) {
            selectedGenres.push(id)
        } else {
            selectedGenres.splice(selectedGenres.indexOf(id), 1);
        }
        
        let inputValue = this.state.inputValue;
        let results = this.state.results;
        if (selectedGenres.length > 0 && inputValue.length > 0) {
            inputValue = '';
            results = [];
        }
        
        this.setState({selectedGenres: selectedGenres, inputValue: inputValue, results: results});
    }
    
    async testController() {
        const response = await fetch('/user/GetUserName', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('site')
            }
        });
        console.log(await response.text());
    }
    
    render() {
        const collection = this.state.results.length > 0 ?
            <div>
                {this.renderButtons()}
                <MovieCollection movies={this.state.results} />
                {this.renderButtons()}
            </div>    
             : 
            <div>None</div>;
        
        return (
            <div style={{display: 'flex', justifyContent: 'space-evenly', flexFlow: 'row wrap', marginTop: '10px', flexWrap: 'wrap'}}>
                <input type="text" value={this.state.inputValue} placeholder="Search by title.." style={{width: '50%', height: 40}} onChange={evt => this.updateValue(evt)} onKeyUp={evt => { 
                    if (evt.keyCode === 13) {
                        this.getResults();
                    }
                }} />
                <div style={{marginTop: '12px', marginRight: '10px', textAlign: 'center'}}>OR by Genre:</div>
                <div style={{ width: '30%', display: 'flex', flexFlow: 'column wrap', height: 360, marginTop: 10}}>
                    {this.state.genres.map((genre, index) => {
                        const id = 'genre'+genre.id;
                        const breakBox = index === 10;
                        return (
                            <div style={breakBox ? {} : {}} key={id}>
                                <input type="checkbox" id={id} checked={this.state.selectedGenres.indexOf(genre.id) > -1} onChange={evt => this.handlCheckbox(evt, genre.id)} />
                                <label style={{margin: 5}} htmlFor={id}>{genre.name}</label>
                            </div>
                        );
                    })}
                </div>
                <div>
                    <button className="button search" onClick={_ => {this.getResults()}}>Search</button>
                </div>

                {this.state.results.length > 0 ? <div style={{marginTop: '10px'}}>Search results:{collection}</div> : null}
                
            </div>
        );
    }
}