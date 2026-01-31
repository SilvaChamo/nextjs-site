"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap, ZoomControl, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation, MapPin, MousePointer2, Car, Maximize, Target } from 'lucide-react';

// Fix for Leaflet default icon issues in Next.js
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const CompanyIcon = L.divIcon({
    html: `<div class="w-10 h-10 bg-[#f97316] rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M9 8h1"/><path d="M9 12h1"/><path d="M9 16h1"/><path d="M14 8h1"/><path d="M14 12h1"/><path d="M14 16h1"/><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/></svg>
           </div>`,
    className: '',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});

const UserIcon = L.divIcon({
    html: `<div class="relative w-8 h-8">
            <div class="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-25"></div>
            <div class="relative w-8 h-8 bg-emerald-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white">
                <div class="w-2 h-2 bg-white rounded-full"></div>
            </div>
           </div>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

interface MapNavigationInnerProps {
    companyCoords: [number, number] | null;
    companyName: string;
    companyAddress: {
        address: string;
        district?: string;
        province?: string;
    };
}

// Map Click Listener Component
function MapClickHandler({ onLocationSelect, active }: { onLocationSelect: (lat: number, lon: number) => void, active: boolean }) {
    useMapEvents({
        click(e) {
            if (active) {
                onLocationSelect(e.latlng.lat, e.latlng.lng);
            }
        },
    });
    return null;
}

// Helper to fit bounds ONLY WHEN CALLED OR ON INITIAL ROUTE
function MapController({ coords, trigger }: { coords: [number, number][], trigger: number }) {
    const map = useMap();
    const hasAutoCentered = useRef(false);
    const lastTrigger = useRef(trigger);

    useEffect(() => {
        if (coords.length > 1) {
            // Center on first route found OR when trigger button is clicked
            if (!hasAutoCentered.current || trigger !== lastTrigger.current) {
                const bounds = L.latLngBounds(coords);
                map.fitBounds(bounds, { padding: [40, 40], maxZoom: 16 });
                hasAutoCentered.current = true;
                lastTrigger.current = trigger;
            }
        }
    }, [coords, map, trigger]);
    return null;
}

export default function MapNavigationInner({ companyCoords: initialCoords, companyName, companyAddress }: MapNavigationInnerProps) {
    const [finalCompanyCoords, setFinalCompanyCoords] = useState<[number, number] | null>(initialCoords);
    const [userCoords, setUserCoords] = useState<[number, number] | null>(null);
    const [routes, setRoutes] = useState<{
        driving?: { path: [number, number][], distance: string, duration: string }
    }>({});
    const [selectingLocation, setSelectingLocation] = useState(false);
    const [fitTrigger, setFitTrigger] = useState(0);
    const [gpsStatus, setGpsStatus] = useState<"idle" | "searching" | "found" | "error">("idle");

    // 1. Geocoding logic if coords are missing
    useEffect(() => {
        async function geocodeCompany() {
            if (initialCoords) {
                setFinalCompanyCoords(initialCoords);
                return;
            }

            try {
                const queries = [
                    `${companyAddress.address}, ${companyAddress.district || ''}, ${companyAddress.province || ''}, Mozambique`,
                    `${companyAddress.district || ''}, ${companyAddress.province || ''}, Mozambique`
                ];

                for (const query of queries) {
                    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
                    const res = await fetch(url, { headers: { 'User-Agent': 'BaseAgroData-App' } });
                    const data = await res.json();

                    if (data && data.length > 0) {
                        setFinalCompanyCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
                        return;
                    }
                }
            } catch (err) {
                console.error("Geocoding error:", err);
            }
        }
        geocodeCompany();
    }, [initialCoords, companyAddress]);

    // 2. High Accuracy Geolocation
    const requestGPS = useCallback(() => {
        if ("geolocation" in navigator) {
            setGpsStatus("searching");
            const options = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            };

            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setUserCoords([pos.coords.latitude, pos.coords.longitude]);
                    setGpsStatus("found");
                },
                (err) => {
                    console.warn("GPS failed", err);
                    setGpsStatus("error");
                    // Try one more time without high accuracy as a last resort
                    navigator.geolocation.getCurrentPosition(
                        (pos) => {
                            setUserCoords([pos.coords.latitude, pos.coords.longitude]);
                            setGpsStatus("found");
                        },
                        () => setGpsStatus("error")
                    );
                },
                options
            );
        }
    }, []);

    useEffect(() => {
        requestGPS();
    }, [requestGPS]);

    // 3. Routing Logic (Driving Only)
    useEffect(() => {
        async function fetchRoute() {
            if (!userCoords || !finalCompanyCoords) return;

            try {
                // Use OSRM for real road distance
                const url = `https://router.project-osrm.org/route/v1/driving/${userCoords[1]},${userCoords[0]};${finalCompanyCoords[1]},${finalCompanyCoords[0]}?overview=full&geometries=geojson`;
                const res = await fetch(url);
                const data = await res.json();

                if (data.routes && data.routes.length > 0) {
                    const path = data.routes[0].geometry.coordinates.map((c: any) => [c[1], c[0]]);

                    // Rounding distance to be more "human"
                    let distanceValue = (data.routes[0].distance / 1000).toFixed(1);
                    const durationValue = Math.ceil(data.routes[0].duration / 60).toString();

                    setRoutes({
                        driving: { path, distance: distanceValue, duration: durationValue }
                    });
                }
            } catch (err) {
                console.error("Routing error:", err);
            }
        }

        fetchRoute();
    }, [userCoords, finalCompanyCoords]);

    if (!finalCompanyCoords) return (
        <div className="w-full h-full bg-slate-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f97316]"></div>
        </div>
    );

    return (
        <div className={`relative w-full h-full ${selectingLocation ? 'cursor-crosshair' : ''}`}>
            <MapContainer
                center={finalCompanyCoords}
                zoom={14}
                className="w-full h-full"
                zoomControl={false}
                attributionControl={false}
                scrollWheelZoom={true} // Explicitly allow zoom
            >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

                <MapClickHandler
                    active={selectingLocation}
                    onLocationSelect={(lat, lon) => {
                        setUserCoords([lat, lon]);
                        setSelectingLocation(false);
                        setGpsStatus("found");
                    }}
                />

                <Marker position={finalCompanyCoords} icon={CompanyIcon} />

                {userCoords && (
                    <>
                        <Marker position={userCoords} icon={UserIcon} />
                        {routes.driving && (
                            <Polyline
                                positions={routes.driving.path}
                                pathOptions={{ color: '#f97316', weight: 8, opacity: 0.8, lineJoin: 'round', lineCap: 'round' }}
                            />
                        )}
                        <MapController coords={[userCoords, finalCompanyCoords]} trigger={fitTrigger} />
                    </>
                )}

                <ZoomControl position="bottomright" />
            </MapContainer>

            {/* DASHBOARD */}
            <div className="absolute top-4 left-4 right-4 z-[1000] pointer-events-none">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-200/50 pointer-events-auto max-w-sm mx-auto md:ml-0 md:mr-0">
                    <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 ${selectingLocation ? 'bg-orange-600 text-white animate-bounce' : 'bg-emerald-50 text-emerald-600'} rounded-xl flex items-center justify-center shrink-0 shadow-inner`}>
                            {selectingLocation ? <MousePointer2 className="w-6 h-6" /> : <Navigation className="w-6 h-6" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            {selectingLocation ? (
                                <>
                                    <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-0.5">Definir Partida</p>
                                    <h4 className="text-sm font-black text-slate-800 uppercase leading-snug">Toque no mapa para marcar onde você está</h4>
                                </>
                            ) : (
                                <>
                                    <p className="text-[10px] font-black text-[#f97316] uppercase tracking-widest mb-1 flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${gpsStatus === 'found' ? 'bg-emerald-500 animate-pulse' : 'bg-orange-400'}`}></div>
                                        Trajectória Sugerida
                                    </p>
                                    <div className="flex items-center gap-4 mt-1">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5 text-slate-400">
                                                <Car className="w-3.5 h-3.5" />
                                                <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500">Distância Real</span>
                                            </div>
                                            <p className="text-sm font-black text-slate-800 tracking-tight">
                                                {routes.driving ? `${routes.driving.distance} km` : '--'}
                                            </p>
                                        </div>
                                        <div className="space-y-1 border-l border-slate-100 pl-4">
                                            <div className="flex items-center gap-1.5 text-slate-400">
                                                <Maximize className="w-3.5 h-3.5" />
                                                <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500">Tempo Estimado</span>
                                            </div>
                                            <p className="text-sm font-black text-slate-800 tracking-tight">
                                                {routes.driving ? `${routes.driving.duration} min` : '--'}
                                            </p>
                                        </div>
                                    </div>
                                    {gpsStatus === 'searching' && (
                                        <p className="text-[9px] text-slate-400 font-bold uppercase mt-2 animate-pulse">Obtendo sua posição exata...</p>
                                    )}
                                    {gpsStatus === 'error' && !userCoords && (
                                        <p className="text-[9px] text-red-400 font-bold uppercase mt-2">Erro no GPS. Clique no mapa para marcar sua posição.</p>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* BUTTONS */}
            <div className="absolute bottom-4 left-4 right-4 z-[1000] flex justify-between pointer-events-none">
                <button
                    onClick={() => setSelectingLocation(!selectingLocation)}
                    className={`flex flex-col items-start gap-0 px-4 py-2 rounded-xl shadow-2xl border pointer-events-auto transition-all active:scale-95 ${selectingLocation
                        ? 'bg-orange-600 text-white border-orange-400 ring-4 ring-orange-500/10'
                        : 'bg-slate-900 text-white border-white/10 opacity-90 hover:opacity-100'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <MapPin className={`w-3.5 h-3.5 ${selectingLocation ? 'text-white' : 'text-emerald-400'}`} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{selectingLocation ? 'Cancelar' : companyName}</span>
                    </div>
                    {!selectingLocation && (
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tight mt-0.5 ml-5">
                            {companyAddress.district || companyAddress.address}, {companyAddress.province}
                        </span>
                    )}
                </button>

                <div className="flex gap-2 pointer-events-auto">
                    <button
                        onClick={() => setFitTrigger(v => v + 1)}
                        className="bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-xl border border-slate-200 text-slate-600 hover:text-emerald-600 transition-all active:scale-90"
                        title="Centralizar Trajectória"
                    >
                        <Maximize className="w-5 h-5" />
                    </button>
                    <button
                        onClick={requestGPS}
                        className={`bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-xl border border-slate-200 transition-all active:scale-90 ${gpsStatus === 'searching' ? 'text-orange-500' : 'text-slate-600 hover:text-emerald-600'}`}
                        title="Actualizar meu GPS"
                    >
                        <Target className={`w-5 h-5 ${gpsStatus === 'searching' ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>
        </div>
    );
}
