/**
 * @file Carousel demo
 * @author cgzero(cgzero@cgzero.com)
 * @data 2017-07-17
 */

/* eslint-disable no-console */
import {h, Component} from 'preact';
import Carousel from './Carousel';
import CarouselItem from './CarouselItem';

import './CarouselDemo.styl';

export default class CarouselDemo extends Component {

    handleChangeIndex(index) {
        console.log(`目前在第${index + 1}张卡片`);
    }

    render() {
        return (
            <div>
                <Carousel>
                    <CarouselItem>
                        <div className="carousel-demo-banner banner-1"></div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="carousel-demo-banner banner-2"></div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="carousel-demo-banner banner-3"></div>
                    </CarouselItem>
                </Carousel>
                <br />
                <div className="carousel-demo-card-wrap">
                    <Carousel
                        changeIndex={index => {
                            this.handleChangeIndex(index);
                        }}
                        isCard={true}
                        index={1}
                    >
                        <CarouselItem>
                            <div className="carousel-demo-card card-1">Card 1</div>
                        </CarouselItem>
                        <CarouselItem>
                            <div className="carousel-demo-card card-2">Card 2</div>
                        </CarouselItem>
                        <CarouselItem>
                            <div className="carousel-demo-card card-3">Card 3</div>
                        </CarouselItem>
                    </Carousel>
                </div>
            </div>
        );
    }
}
