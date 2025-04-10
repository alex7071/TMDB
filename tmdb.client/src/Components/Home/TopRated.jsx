import React, { Component } from 'react';
import './TopRated.css';
import {MovieCollection} from "@/Components/Home/MovieCollection.jsx";

export class TopRated extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = { loading: true, page: 1, results: [], collapsed: true };
    }

    async populateTopRated(page = 1) {
        const response = await fetch('tmdb/GetTopRated/' + page);
        const data = await response.json();
        this.setState({ results: data.results, loading: false, maxPage: data.totalPages, page: page });
    }

    async populateNowPlaying(page = 1) {
        const response = await fetch('tmdb/GetNowPlaying/' + page);
        const data = await response.json();
        this.setState({ results: data.results, loading: false, maxPage: data.totalPages, page: page });
    }

    componentDidMount() {
        
    }

    renderMovies(movies) {
        return (
            <MovieCollection movies={movies} />
        );
    }
    
    loadData(page = 1) {
        if (!this.props.nowPlaying && (this.state.loading || this.state.page !== page)) {
            this.populateTopRated(page).catch(e => console.log(e));
        } else if (this.props.nowPlaying && (this.state.loading || this.state.page !== page)) {
            this.populateNowPlaying(page).catch(e => console.log(e));
        }
    }

    renderSvg(isCollapsed) {
        if (!isCollapsed && this.state.loading) {
            this.loadData();
        }
        
        let style = {float: 'left', height: 45, transform: !isCollapsed ? 'rotate(90deg)' : ''};
        return (
            <svg style={style} width="32px" height="32px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.795 11.272L7.795 16.272C6.79593 16.8964 5.5 16.1782 5.5 15L5.5 5.00002C5.5 3.82186 6.79593 3.1036 7.795 3.72802L15.795 8.72802C16.735 9.31552 16.735 10.6845 15.795 11.272Z" fill="#000000" />
            </svg>
        );
    }

    nextPage() {
        if (this.state.maxPage === this.state.page) {
            return;
        }
        let nextPage = this.state.page + 1;
        this.loadData(nextPage);
    }
    
    previousPage() {
        if (this.state.page > 1) {
            let previousPage = this.state.page - 1;
            this.loadData(previousPage);
        }
    }

    renderButtons() {
        return (
            <div>
                <button className={this.state.page == this.state.maxPage - 1 ? 'button button-disabled' : 'button'} style={{float: 'right'}} onClick={_ => this.nextPage()}>Next page</button><button className={this.state.page == 1 ? 'button button-disabled' : 'button'} onClick={_ => this.previousPage()}>Previous page</button>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderMovies(this.state.results);
        return (
            <div style={{width: '1400px'}}>
                <div className="section-title" onClick={_ => this.setState({collapsed: !this.state.collapsed})}>
                    { this.renderSvg(this.state.collapsed) }
                    {this.props.nowPlaying ? 'Recent (Now playing)' : 'Top rated movies'}</div>
                <div className={this.state.collapsed ? 'collapsed' : 'shown'}>
                    {this.renderButtons()}
                    {contents}
                    {this.renderButtons()}
                </div>
            </div>
        );
    }
}