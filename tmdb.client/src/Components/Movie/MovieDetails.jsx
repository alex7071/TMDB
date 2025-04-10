import React, {Component} from "react";
import { useParams } from "react-router-dom";
import Gallery from "react-slick";
import './MovieDetails.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "@/Components/Movie/Carousel.jsx";
import {useAuth} from "@/AuthProvider.jsx";
import Comments from "@/Components/Movie/Comments.jsx";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class MovieDetailsClass extends Component {

    constructor(props) {
        super(props);
        this.postersRef = React.createRef();
        this.commentRef = React.createRef();
        this.state = { loading: true, details: {}, id: this.props.params.id, comment: '', comments: [] };
    }
    
    componentDidMount() {
        this.populateDetails().catch(error => console.log(error));
        this.getComments().catch(error => console.log(error));
    }

    async populateDetails(page = 1) {
        const response = await fetch('/tmdb/GetMovieDetails/' + this.state.id);
        const data = await response.json();
        this.setState({ details: data, loading: false });
    }

    scrollToElement(ref) {
        if (ref.current != null) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    async addComment() {
        const comment = this.commentRef.current.value;
        const userDetailsReponse = await fetch('/user/PostComment', {
            headers: {
                'Authorization': 'Bearer ' + this.props.auth.token,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                comment: comment,
                movieId: this.props.params.id
            })
        }).then((response) => {
            if (response.status === 401) {
                this.props.auth.logOut();
            } else {
                response.json().then((result) => {
                    if (result.success) {
                        this.commentRef.current.value = '';
                        this.getComments().catch(error => console.log(error));
                    } else {
                        console.log(response.message);
                    }
                })
            }
        });
    }
    
    async getComments() {
        const response = await fetch('/tmdb/GetComments/' + this.state.id);
        const data = await response.json();
        this.setState({ comments: data.comments, loading: false });
    }
    
    renderDetails() {
        const gallerySettings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 5
        };
        
        return (
            <div>
                <div className="movie-title">{this.state.details.originalTitle}</div>
                <div className="movie-tagline">{this.state.details.tagline}</div>
                <div><b>Overview</b>: {this.state.details.overview}</div>
                {this.state.details.genres?.length > 0 ? <div className="genre-container"><b>Genres</b>: {this.state.details.genres.map((g, i) => {
                    return (
                        <span key={g.id}>
                            <span className="genre">{g.name}</span>
                            <span>{i < this.state.details.genres.length - 1 ? ', ' : ''}</span>
                        </span>
                        
                    );
                })}
                </div> : null}
                <div><b>Language</b>: {this.state.details.originalLanguage}</div>
                {this.state.details.images?.backdrops.length > 0 || this.state.details.images?.posters.length > 0 || this.state.details.images?.logos.length > 0 ? <div><b>Jump to</b>:</div> : null}
                
                {this.state.details.images?.backdrops.length > 0 ? <button className="jump-button" onClick={_ => this.scrollToElement(this.postersRef)}>Backdrops</button> : null}
                {this.state.details.images?.posters.length > 0 ? <button className="jump-button" onClick={_ => this.scrollToElement(this.postersRef)}>Posters</button> : null}
                {this.state.details.images?.logos.length > 0 ? <button className="jump-button" onClick={_ => this.scrollToElement(this.postersRef)}>Logos</button> : null}
                {this.state.details.backdropUrl?.length > 0 ? <img src={this.state.details.backdropUrl} alt="backdrop" style={{margin: 'auto', width: '1296px'}} /> : null}

                {this.props.auth.user 
                    ? <div style={{display: 'flex', margin: 10, alignItems: 'flex-start'}}>
                        <textarea name="comment" style={{width: '90%', height: 100, marginRight: 10}} ref={this.commentRef} />
                        <button onClick={e => this.addComment()}>Add comment</button>
                      </div>
                    : <div>Log in to comment</div>}
                
                <Comments comments={this.state.comments} timestamp={new Date()} />
                
                <Carousel images={this.state.details.images?.backdrops} linkRef={this.postersRef} name={'Backdrops'} />
                <Carousel images={this.state.details.images?.logos} linkRef={this.postersRef} name={'Logos'} useFilter={true} />
                <Carousel images={this.state.details.images?.posters} linkRef={this.postersRef} name={'Posters'} />
                {this.state.details.credits?.length > 0 ? <div className="slider-container" ref={this.postersRef}>
                    <p className="gallery-title">Credits</p>
                    <Gallery {...gallerySettings}>
                        {this.state.details.credits.cast.map((credit, i) => {
                            return (
                                <div>
                                    <p><b>Name</b>: {credit.name}</p>
                                    <p><b>Character</b>: {credit.name}</p>
                                    <img src={credit.profileUrl} alt="profile_image" />
                                </div>
                            );
                        })}
                    </Gallery>
                </div> : null}
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderDetails(this.state.details);
        
        return (
            <div>
                {contents}
            </div>
        );
    }
}

export const MovieDetails = useAuth(withParams(MovieDetailsClass));