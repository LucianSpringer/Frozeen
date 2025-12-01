import { NextResponse } from 'next/server';

// HIGH YIELD: Geodesic Math instead of API call
function haversine_cost_model(lat1: number, lon1: number, lat2: number, lon2: number, weight_kg: number): number {
    const R = 6371; // Earth Radius km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    // Dynamic Pricing Model: Base + Distance + Weight + Entropy
    const base_rate = 5000;
    const distance_rate = distance * 150; // Rp 150 per km
    const weight_surcharge = weight_kg > 1 ? (weight_kg - 1) * 2000 : 0;

    return Math.floor(base_rate + distance_rate + weight_surcharge);
}

export async function POST(req: Request) {
    const { origin, destination, weight } = await req.json();

    // Simulate "Database" lookup for coords (Mocking complex geospatial query)
    const warehouse_coords = { lat: -6.200000, lon: 106.816666 }; // Jakarta
    const user_coords = { lat: -7.257472, lon: 112.752088 }; // Surabaya (Simulated)

    const shipping_cost = haversine_cost_model(
        warehouse_coords.lat, warehouse_coords.lon,
        user_coords.lat, user_coords.lon,
        weight
    );

    return NextResponse.json({
        provider: "FROZEEN_INTERNAL_LOGISTICS",
        service: "COLD_CHAIN_EXPRESS",
        etd: "1-2 DAYS",
        cost: shipping_cost,
        distance_km: 660 // Approx
    });
}
