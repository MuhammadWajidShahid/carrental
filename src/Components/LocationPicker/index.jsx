import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useRef, useState } from "react"
import { ArrowLeft, Map } from "react-feather"
import { useEffect } from "react/cjs/react.development";
import { useStore } from "../../Store";
import { MapLocator } from "../MapLocator";

export default function LocationPicker () {
    const [openMap, setOpenMap] = useState(false)
    const { setLocationPicker, setLocation, location } = useStore();
    const searchContainer = useRef(null)
    useEffect(() => {
        if (!searchContainer.current) return;
        const geocoder = new MapboxGeocoder({
            accessToken: process.env.REACT_APP_API_KEY,
            types: 'country,region,place,postcode,locality,neighborhood'
        });
        searchContainer.current.innerHTML = null;
        geocoder.addTo(searchContainer.current);
        if (location)
            geocoder.setInput(location.place_name)
        geocoder.on('result', (e) => {
            setLocation(e.result);
            setLocationPicker(false);
        });

        geocoder.on('clear', () => {
            setLocation("");
        });


    }, [searchContainer, setLocation, setLocationPicker, location])



    return (

        <div className="fixed inset-0 bg-white p-4">

            <div className="w-full">
                <span className="cursor-pointer" onClick={() => setLocationPicker(false)}>

                    <ArrowLeft size={30} />
                </span>
            </div>
            <div className="w-full max-w-2xl mx-auto mt-5">

                <div
                    className="rounded border p-4 flex items-center cursor-pointer w-full shadow-md"
                >
                    <div className="rounded-full w-2 h-2 bg-green-600 mr-3"></div>
                    <div ref={searchContainer} className="location_picker w-full">

                    </div>

                </div>
                <div onClick={() => setOpenMap(true)} className="cursor-pointer mt-10 flex items-center">
                    <span className="mr-3">

                        <Map size={30} />
                    </span>
                    <p className="text-lg">
                        Select Location on Map
                    </p>
                </div>
            </div>
            {
                openMap &&
                <div className="relative z-10">
                    <MapLocator close={() => setOpenMap(false)} />
                </div>
            }
        </div>
    )
}