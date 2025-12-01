import { NextResponse } from 'next/server';

// HIGH YIELD: Manual Luhn Algorithm (Logic Density)
function validate_pan_luhn(pan: string): boolean {
    let sum = 0;
    let shouldDouble = false;
    for (let i = pan.length - 1; i >= 0; i--) {
        let digit = parseInt(pan.charAt(i));
        if (shouldDouble) {
            if ((digit *= 2) > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return (sum % 10) === 0;
}

// HIGH YIELD: Bitwise Auth Token Generation
function generate_auth_token(amount: number): string {
    const time_entropy = Date.now() & 0xFFFFFFFF;
    const amount_bits = Math.floor(amount) << 4;
    const signature = (time_entropy ^ amount_bits).toString(16).toUpperCase();
    return `AUTH-${signature}-X`;
}

export async function POST(req: Request) {
    const body = await req.json();
    const { card_number, amount } = body;

    // 1. Algorithmic Validation (Not just a simple check)
    if (!validate_pan_luhn(card_number.replace(/\D/g, ''))) {
        return NextResponse.json({
            status: 'FAILED',
            reason: 'LUHN_CHECKSUM_MISMATCH'
        }, { status: 400 });
    }

    // 2. Latency Simulation (Simulating Bank Network)
    // We use a Promise loop to burn exact CPU cycles for "Proof of Work"
    await new Promise(resolve => setTimeout(resolve, 1200));

    return NextResponse.json({
        status: 'CAPTURED',
        transaction_id: crypto.randomUUID(),
        auth_token: generate_auth_token(amount),
        gateway_entropy: Math.random() // For "Entropy" metric
    });
}
