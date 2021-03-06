import React, {Component} from 'react';
import SatSetting from "./SatSetting";
import SatelliteList from "./SatelliteList";
import {NEARBY_SATELLITE, SAT_API_KEY, STARLINK_CATEGORY} from "../constants";
import axios from "axios";
import WorldMap from './WorldMap';

class Main extends Component {
    showMap = (selected) => {
        console.log('show selected -> ', selected);
        this.setState(preState => ({
            ...preState,
            satList: [...selected]
        }))

    }

    render() {
        const { satInfo } = this.state;
        return (
            <div className='main'>
                <div className="left-side">
                    <SatSetting onShow={this.showNearbySatellite}/>
                    <SatelliteList satInfo={satInfo}
                                   isLoad={this.state.isLoadingList}
                                   onShowMap={this.showMap}
                    />
                </div>
                <div className="right-side">
                    <WorldMap satData={this.state.satList}
                              observerData={this.state.settings}/>
                </div>
            </div>
        );
    }

    showNearbySatellite = (setting) => {
        this.setState({
            settings: setting
        })
        this.fetchSatellite(setting);
    }
    fetchSatellite = (setting) => {
        const {observerLat, observerLong, observerElevation, satAlt} = setting;
        const url = `${NEARBY_SATELLITE}/${observerLat}/${observerLong}/${observerElevation}/${satAlt}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;
        this.setState({
            isLoadingList: true
        });

        axios.get(url)
            .then(response => {
                console.log(response.data)
                this.setState({
                    satInfo: response.data,
                    isLoadingList: false
                })
            })
            .catch(error => {
                console.log('err in fetch satellite -> ', error);
            })

    }
    constructor(){
        super();
        this.state = {
            satInfo: null,
            settings: null,
            satList: null,
            isLoadingList: false
        };
    }


}

export default Main;