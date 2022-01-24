import clsx from "clsx";
import { Map, Marker } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Search } from "react-feather";
import { useStore } from "../../Store";
export const MapLocator = ({ close }) => {
    const map = useRef(null);
    const mapContainer = useRef(null);
    const [loading, setLoading] = useState(false);
    const [curLocation, setCurLocation] = useState(null);
    const { setLocation, setLocationPicker } = useStore();
    useEffect(() => {
        map.current = new Map(
            {
                accessToken: process.env.REACT_APP_API_KEY,
                container: mapContainer.current,
                center: [74.329376, 31.582045],
                zoom: 13, // starting zoom
                style: 'mapbox://styles/mapbox/streets-v11', // style URL or style object
            }
        )
        const marker = new Marker({
            draggable: false
        })
            .setLngLat([74.329376, 31.582045])
            .addTo(map.current);
        map.current.on('move', () => {
            const nlan = map.current.getCenter().lng,
                nlat = map.current.getCenter().lat;
            marker.setLngLat([nlan, nlat]);
        });
        map.current.on('moveend', () => {
            getLocation(marker.getLngLat())
        })

    }, [map, mapContainer]);
    async function getLocation (langLat) {
        try {
            setLoading(true);
            const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${langLat.lng},${langLat.lat}.json?types=place%2Cpostcode%2Caddress&limit=1&access_token=${process.env.REACT_APP_API_KEY}`).then(res => res.json())
            setCurLocation(res?.features?.[0])
            setLoading(false)
        }
        catch (error) {
            setLoading(false)
            console.error(error)
        }
    }
    function handleContinue () {
        setLocationPicker(false);
        setLocation(curLocation)
    }
    return (<div className="fixed inset-0 bg-white">
        <div className="relative h-full w-full">
            <div className="w-full p-4">
                <span className="cursor-pointer" onClick={close}>

                    <ArrowLeft size={30} />
                </span>
            </div>

            <div ref={mapContainer} className="w-full h-full">

            </div>
            <div className="absolute left-0 right-0 top-20">
                <div
                    className="rounded border p-4 flex items-center cursor-pointer mx-auto shadow-md bg-white w-[95%]"

                >
                    <span className="mr-3">

                        <Search />
                    </span>
                    <p>
                        {
                            curLocation &&
                            curLocation.place_name
                        }
                    </p>
                </div>
            </div>
            <div className="  absolute bottom-10 flex justify-center left-0 right-0">

                <button
                    onClick={handleContinue}
                    className={clsx(
                        "rounded  p-3 w-full max-w-sm  uppercase font-md border-2 border-green-500 ",
                        {
                            "bg-white text-green-500 ": loading,
                            "bg-green-500 text-white": !loading
                        }
                    )} disabled={loading}>
                    {
                        loading ? "Loading..." :

                            "continue"
                    }
                </button>
            </div>
        </div>

    </div >);
};
