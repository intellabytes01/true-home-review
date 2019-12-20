import React, { Component } from 'react';
// import {  } from "react-google-maps";
import {Polygon, GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"
import { compose, withProps, lifecycle } from "recompose"
import { END_POINT } from '../../../constants/ApiEndPoints'
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
const _ = require("lodash");





 export const GoogleMapComponent = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${END_POINT.GOOGLE_API.API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} >Loading map....</div>,
        containerElement: <div style={{ height: `400px`, margin: "10px 10px" }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    lifecycle({
        componentWillMount() {
            const refs = {}

            this.setState({
                bounds: null,
                center: {
                    lat: 41.9, lng: -87.624
                },
                onMapMounted: ref => {
                    refs.map = ref;
                    this.props.onMapMounted(ref, this.state.changeLocation)
                },
                changeLocation:(location)=>{

                    this.setState({center:location})
                },
                onBoundsChanged: () => {
                    this.setState({
                        bounds: refs.map.getBounds(),
                        center: refs.map.getCenter(),
                    })
                },
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;


                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();
                    const { google } = window
                    const bounds = new google.maps.LatLngBounds();
                    const nextMarkers = places.map(place => ({
                        position: place.geometry.location,
                    }));

                    const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

                    // let lat = nextCenter.lat()
                    // let lng = nextCenter.lng()

                    // this.props.setFieldValue(this.props.nameOfFields[0], lng)
                    // this.props.setFieldValue(this.props.nameOfFields[1], lat)

                    this.props.handleSearchBox(nextCenter)
                    this.setState({
                        center: nextCenter,
                        markers: nextMarkers,
                    });
                    // refs.map.fitBounds(bounds);
                },
            })
        },

        componentDidMount() {

            
            if( !this.props.center){
                
                window.navigator.geolocation.getCurrentPosition((position)=>{
                    
                    // console.log("state",position)
                    this.setState(()=>({center:{lat:position.coords.latitude,lng:position.coords.longitude}}))
                    
                })
            }else{
                
                console.log(this.props.center)
                this.setState(()=>({center:this.props.center}))
            }
        }
        
    }),
    withScriptjs,
    withGoogleMap
)(props => {

    let { google } = window;

    return <> <GoogleMap
        defaultZoom={8}
        center={props.center}
        ref={props.onMapMounted}
        options={{
            fullscreenControl: false, mapTypeControlOptions: {
                style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: window.google.maps.ControlPosition.TOP_LEFT
            }
        }}
    >
    </GoogleMap>
        <SearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            controlPosition={google.maps.ControlPosition.TOP_LEFT}
            onPlacesChanged={props.onPlacesChanged}
        >
            <input
                type="text"
                placeholder="Search address"
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    marginTop: `60px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                }}
                onKeyDown={event => {
                    if (event.keyCode === 13) {
                        event.preventDefault()
                    }
                }}
                autoComplete={"off"}
                id="searchBox"
            />
        </SearchBox>
        {props.isMarkerShown && (
            <Marker position={props.center} draggable={true} onDragEnd={props.handleMarkerDrag} />
        )}
        {/* {props.isPolygonShown && (

                <Polygon draggable={true} defaultPaths={[{lat: 42.0715316, lng:-87.9863969},{lat : 41.7913474,lng: -88.7210709}, {lat: 41.3655483,lng: -88.3255264},  ]} />
        )} */}
    </>
});