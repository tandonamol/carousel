import React from 'react'
import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';

class Carousel extends React.Component {
    constructor() {
        super();
        this.state = {
            info: [],
            carousel_index: 1,
            page_index: 0,
            loading: false, 
            carousel_display: false,
            btn_display: true
        }
        console.log(this.state.info, "I'm in constructor!")
    }

    componentDidMount() {
        console.log("App Mounted!")
        fetch(`https://picsum.photos/v2/list?page=${this.state.page_index}&limit=5`)
            .then((response) => response.json())
            .then((data) => this.setState({
                info: data,
                loading: true
            },
                () => console.log(data))
            )
    }

    apiCall(index) {
        console.log(index, "in api call")
        if (index === 4 || this.state.page_index === 0) {
            this.state.page_index++
            fetch(`https://picsum.photos/v2/list?page=${this.state.page_index}&limit=5`)
                .then((response) => response.json())
                .then((data) => this.setState({
                    info: data
                },
                    () => console.log(data))
                )
        }
    }
    mainBtn(){
        this.setState({
            carousel_display: true,
            loading : false,
            btn_display: false
        })
    }

    render() {
        return (
            <div>
                {this.state.btn_display && <Button className="start" variant="contained" color="secondary" onClick={() => this.mainBtn()}>Show Carousel</Button>}
                
                {this.state.loading && <CircularProgress color="secondary" />}
                {this.state.carousel_display && <div className="carousel">
                    {/* Carousel */}
                    {this.state.info.length &&
                        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel" data-interval="3000">
                            <div className="carousel-inner">
                                {this.state.info.map((pic, index) => {
                                    return (
                                        <div key={index} className={"carousel-item " + (index === 0 ? 'active' : '')}>
                                            <img className="d-block w-100" src={pic.download_url} alt="First slide" />
                                            {this.state.carousel_index = index}
                                        </div>
                                    )
                                })}
                                {console.log("outside map!", this.state.carousel_index)}
                                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                                {console.log(this.state.carousel_index, "outside button")}
                            </div>
                            <button
                                variant = "contained"
                                color = "secondary" 
                                className="nextBtn"
                                onClick={() => this.state.carousel_index === 4 ? this.apiCall(this.state.carousel_index) : ''}>
                                Next Page
                            </button>

                        </div>
                    }
                </div>}

            </div>

        )
    }
}

export default Carousel;
