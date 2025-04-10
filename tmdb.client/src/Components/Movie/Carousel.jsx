import React, {Component} from "react";
import Gallery from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class Carousel extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const gallerySettings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 5
        };
        
        if (!this.props.images) {
            return ('Loading...');
        }
        
        return (
            <div>
                {this.props.images?.length > 1 ? <div className="slider-container" ref={this.props.linkRef}>
                    <p className="gallery-title">{this.props.name}</p>
                    <Gallery {...gallerySettings}>
                        {this.props.images.map((image, i) => {
                            return (
                                <div>
                                    <img style={{width: '200px', filter: this.props.useFilter ? 'invert(0.2)' : ''}} src={image.fileUrl} alt="image" />
                                </div>
                            );
                        })}
                    </Gallery>
                </div> : this.props.images.length > 0 ? 
                    <div style={{marginLeft: 15}}>
                        <p className="gallery-title">{this.props.name}</p>
                        <img src={this.props.images[0].fileUrl} alt="image" />
                    </div>
                    : null}
            </div>
        );
    }
}