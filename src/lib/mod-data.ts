import type { ModGuide } from './types';

type ModData = {
  [key: string]: ModGuide;
};

export const MOD_DATA: ModData = {
    'zn6-zn8': {
        summary: "The Toyota 86/Subaru BRZ platform is a fantastic, lightweight chassis that is often described as 'momentum car'. Modifications typically focus on addressing the infamous mid-range torque dip (on the first gen) and enhancing the already great handling.",
        powerLimit: "280-300whp (approx. 210-225wkW)",
        stages: [
            {
                name: 'Stage 1',
                description: 'Focuses on improving engine breathing and sound.',
                common_mods: 'Cat-back exhaust, High-flow air filter, ECU Tune (optional but recommended).'
            },
            {
                name: 'Stage 2',
                description: 'Aims to eliminate the torque dip and significantly wake the car up.',
                common_mods: 'Stage 1 + Unequal Length (UEL) or Equal Length (EL) headers, ECU Tune (required).'
            },
            {
                name: 'Stage 3',
                description: 'Forced induction for a major power increase, turning it into a completely different car.',
                common_mods: 'Stage 2 + Supercharger or Turbocharger kit, Upgraded fuel pump & injectors, Oil cooler.'
            }
        ],
        common_issues: [
            {
                name: 'Forced Induction Reliability',
                description: 'The high-compression FA20/FA24 engine can be sensitive to boost. A very safe, conservative tune is critical for longevity. An oil cooler is considered a mandatory supporting mod.'
            },
            {
                name: 'Fueling',
                description: "The stock fuel pump can struggle with E85 and forced induction. An upgraded fuel pump is often one of the first supporting mods."
            },
        ]
    },
    'barra-turbo': {
        summary: "The Ford Barra Turbo engine is a legend in Australian performance. It's known for its immense strength and ability to handle huge power on a stock bottom end. Modifications are straightforward and effective.",
        powerLimit: "550-600whp (approx. 410-450wkW)",
        stages: [
            {
                name: 'Stage 1',
                description: 'Simple bolt-ons and a tune for a significant and safe power increase.',
                common_mods: 'ECU Tune, Upgraded fuel pump, High-flow cat, Cat-back exhaust.'
            },
            {
                name: 'Stage 2',
                description: 'Maximizing the efficiency of the stock turbocharger.',
                common_mods: 'Stage 1 + Intercooler upgrade, Upgraded injectors, Boost controller.'
            },
            {
                name: 'Stage 3',
                description: 'Pushing past the limits of the stock turbo with a larger unit.',
                common_mods: 'Stage 2 + Upgraded turbocharger (e.g., Garrett GTX series), External wastegate, Valve springs (highly recommended).'
            }
        ],
        common_issues: [
            {
                name: 'Weak Valve Springs',
                description: 'The stock valve springs are a known weak point and can fail under high boost, leading to catastrophic engine failure. Upgrading them is essential for anything above 15psi of boost.'
            },
            {
                name: 'Oil Pump Gears',
                description: 'While the engine is strong, the powdered metal oil pump gears can shatter under high RPM and shock, especially with a manual transmission. Billet gears are a must-have for any serious build.'
            },
            {
                name: 'ZF 6HP Transmission',
                description: 'The automatic transmission is strong but will require a custom tune to handle the increased torque. The input shaft is a common failure point at very high power levels.'
            }
        ]
    },
     'rb26dett': {
        summary: "The RB26DETT is the heart of the Skyline GT-R, a masterpiece of engineering for its time. It loves to rev and is capable of incredible power, but it has specific weaknesses that must be addressed, primarily related to its oiling system.",
        powerLimit: "450-500whp (approx. 335-375wkW)",
        stages: [
            {
                name: 'Stage 1',
                description: 'Unlocking the potential of the stock twin-turbos.',
                common_mods: 'ECU (e.g., Nistune, Haltech), Boost controller, Cat-back exhaust, Fuel pump.'
            },
            {
                name: 'Stage 2',
                description: 'Improving flow and pushing the stock turbos to their safe limit.',
                common_mods: 'Stage 1 + Full exhaust with downpipes, Upgraded intercooler, Higher-flow injectors.'
            },
            {
                name: 'Stage 3',
                description: 'Moving to a single turbo setup for simplicity and bigger power.',
                common_mods: 'Stage 2 + Single turbo conversion kit (e.g., Garrett G-series), External wastegate, Upgraded MAF sensors or MAP sensor conversion.'
            }
        ],
        common_issues: [
            {
                name: 'Oil Pump Drive',
                description: 'The single biggest weakness. The narrow drive collar on the crankshaft can shatter at high RPM, instantly destroying the oil pump and the engine. An extended crank collar is considered an essential reliability modification.'
            },
            {
                name: 'Ceramic Turbine Wheels',
                description: 'Stock R32-R33 turbos have ceramic turbine wheels which can shatter under high boost or heat. R34 turbos came with more durable steel wheels. Any turbo upgrade resolves this.'
            },
            {
                name: 'Weak Ring Lands',
                description: 'The stock pistons are strong, but the ring lands can crack with detonation (pinging). A high-quality tune is absolutely critical to prevent this.'
            }
        ]
    },
    // Add other guides here...
};
