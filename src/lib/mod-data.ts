
import type { ModGuide } from './types';

type ModData = {
  [key: string]: ModGuide;
};

export const MOD_DATA: ModData = {
    'zn6': {
        summary: "The first-generation Toyota 86/Subaru BRZ (ZN6/ZC6) is a fantastic, lightweight chassis that is often described as a 'momentum car'. Modifications typically focus on addressing the infamous mid-range torque dip and enhancing the already great handling.",
        powerLimit: "280-300whp (approx. 210-225wkW)",
        stages: [
            {
                name: 'Stage 1',
                description: 'Focuses on improving engine breathing and sound.',
                cost: '$1,000 - $2,500 AUD',
                power: '170-180whp (125-135wkW)',
                common_mods: 'Cat-back exhaust, High-flow air filter, ECU Tune (optional but recommended).'
            },
            {
                name: 'Stage 2',
                description: 'Aims to eliminate the torque dip and significantly wake the car up.',
                cost: '$1,500 - $3,500 AUD',
                power: '190-205whp (140-155wkW)',
                common_mods: 'Stage 1 + Unequal Length (UEL) or Equal Length (EL) headers, ECU Tune (required).'
            },
            {
                name: 'Stage 3 (Forced Induction)',
                description: 'Forced induction for a major power increase, turning it into a completely different car.',
                cost: '$8,000 - $15,000+ AUD',
                power: '280-400whp+',
                common_mods: 'Stage 2 + Supercharger or Turbocharger kit, Upgraded fuel pump & injectors, Oil cooler.'
            }
        ],
        common_issues: [
            {
                name: 'Forced Induction Reliability',
                description: 'The high-compression FA20 engine can be sensitive to boost. A very safe, conservative tune is critical for longevity. An oil cooler is considered a mandatory supporting mod.'
            },
            {
                name: 'Fueling',
                description: "The stock fuel pump can struggle with E85 and forced induction. An upgraded fuel pump is often one of the first supporting mods."
            },
        ]
    },
    'zn8': {
        summary: "The second-generation Toyota GR86/Subaru BRZ (ZN8/ZD8) builds on its predecessor with a larger 2.4L FA24 engine, which addresses the infamous torque dip. Modifications focus on enhancing power and refining the already excellent chassis.",
        powerLimit: "350-400whp (approx. 260-300wkW)",
        stages: [
            {
                name: 'Stage 1',
                description: 'Focuses on improving engine breathing, sound, and throttle response.',
                cost: '$1,000 - $3,000 AUD',
                power: '210-220whp (155-165wkW)',
                common_mods: 'Cat-back exhaust, High-flow air filter, ECU Tune (optional but unlocks potential).'
            },
            {
                name: 'Stage 2',
                description: 'Unlocking more top-end power and sound.',
                cost: '$2,000 - $4,500 AUD',
                power: '225-235whp (168-175wkW)',
                common_mods: 'Stage 1 + Upgraded headers and full exhaust system, ECU Tune (required).'
            },
            {
                name: 'Stage 3 (Forced Induction)',
                description: 'Forced induction for a major power increase. The stronger FA24 handles boost better than the FA20.',
                cost: '$10,000 - $18,000+ AUD',
                power: '300-450whp+',
                common_mods: 'Stage 2 + Supercharger or Turbocharger kit, Upgraded fuel system, Oil cooler (highly recommended).'
            }
        ],
        common_issues: [
            {
                name: 'Oil Pressure & Starvation',
                description: 'On track, particularly in long, high-G right-hand turns, the FA24 can experience oil pressure drops. A baffled sump or Accusump is recommended for serious track use. Using a higher viscosity oil (e.g. 5W-30) can also help.'
            },
            {
                name: 'Silicone (RTV) in Oil Pan',
                description: "Excessive RTV sealant from the factory has been known to break off and clog the oil pickup tube. Some owners proactively drop the oil pan to clean it out."
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
                cost: '$1,500 - $3,000 AUD',
                power: '320-350whp (240-260wkW)',
                common_mods: 'ECU Tune, Upgraded fuel pump, High-flow cat, Cat-back exhaust.'
            },
            {
                name: 'Stage 2',
                description: 'Maximizing the efficiency of the stock turbocharger.',
                cost: '$2,500 - $5,000 AUD',
                power: '380-420whp (280-315wkW)',
                common_mods: 'Stage 1 + Intercooler upgrade, Upgraded injectors, Boost controller.'
            },
            {
                name: 'Stage 3',
                description: 'Pushing past the limits of the stock turbo with a larger unit.',
                cost: '$5,000 - $10,000+ AUD',
                power: '450whp+',
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
                cost: '$2,000 - $4,000 AUD',
                power: '330-360whp (245-270wkW)',
                common_mods: 'ECU (e.g., Nistune, Haltech), Boost controller, Cat-back exhaust, Fuel pump.'
            },
            {
                name: 'Stage 2',
                description: 'Improving flow and pushing the stock turbos to their safe limit.',
                cost: '$4,000 - $7,000 AUD',
                power: '380-420whp (280-315wkW)',
                common_mods: 'Stage 1 + Full exhaust with downpipes, Upgraded intercooler, Higher-flow injectors.'
            },
            {
                name: 'Stage 3',
                description: 'Moving to a single turbo setup for simplicity and bigger power.',
                cost: '$8,000 - $20,000+ AUD',
                power: '450whp+',
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
    'alloytec-v6': {
        summary: "The Holden Alloytec V6 is a common engine in VE/VF Commodores. While not known for huge power potential in naturally aspirated form, modifications can improve sound and responsiveness.",
        powerLimit: "250-270whp (approx. 185-200wkW)",
        stages: [
            {
                name: 'Stage 1',
                description: 'Improving sound and throttle response.',
                cost: '$800 - $2,000 AUD',
                power: '220-235whp (165-175wkW)',
                common_mods: 'Cat-back exhaust, High-flow panel filter, ECU Tune.'
            },
            {
                name: 'Stage 2',
                description: 'Extracting more from the intake and exhaust side.',
                cost: '$2,500 - $4,500 AUD',
                power: '240-260whp (180-195wkW)',
                common_mods: 'Stage 1 + High-flow catalytic converters, OTR (Over-The-Radiator) cold air intake.'
            },
            {
                name: 'Stage 3 (Forced Induction)',
                description: 'Forced induction is the only real path to significant power gains.',
                cost: '$10,000 - $18,000+ AUD',
                power: '350whp+',
                common_mods: 'Supercharger or Turbo kit. This is a custom and expensive route.'
            }
        ],
        common_issues: [
            {
                name: 'Timing Chain Stretch',
                description: 'The most notorious issue. The original timing chains can stretch over time, causing a P0008 error code. It is an expensive, labor-intensive fix. Using high-quality oil and regular changes is key.'
            },
            {
                name: 'ECU Failures',
                description: 'The ECU is located in the engine bay and can be susceptible to heat failure over time.'
            }
        ]
    },
    'rb20det': {
        summary: "The RB20DET is the smaller sibling of the RB26. It's a robust iron-block straight-six that enjoys being revved. It shares some of the family traits and weaknesses.",
        powerLimit: "300-350whp (approx. 225-260wkW)",
        stages: [
            {
                name: 'Stage 1',
                description: 'Basic bolt-ons to improve breathing and sound.',
                cost: '$2,000 - $4,000 AUD',
                power: '220-250whp (165-185wkW)',
                common_mods: 'ECU (e.g. Nistune), Boost controller, Cat-back exhaust, Fuel pump, Front-mount intercooler.'
            },
            {
                name: 'Stage 2',
                description: 'Maximizing the stock turbo and supporting fuel system.',
                cost: '$3,500 - $6,000 AUD',
                power: '260-290whp (195-215wkW)',
                common_mods: 'Stage 1 + Full exhaust, Upgraded injectors, High-flow turbo elbow.'
            },
            {
                name: 'Stage 3',
                description: 'Upgrading the turbocharger for a significant power jump.',
                cost: '$5,000 - $9,000+ AUD',
                power: '300whp+',
                common_mods: 'Stage 2 + Upgraded turbocharger (e.g. Hypergear ATR28), Upgraded MAF sensor.'
            }
        ],
        common_issues: [
            {
                name: 'Oiling Issues',
                description: 'Like other RBs, the oiling system can be a weak point under hard use. Oil gallery restrictors and a baffled sump are recommended for track use.'
            },
            {
                name: 'Ignition System',
                description: 'The stock coil packs are prone to failure with age. Upgrading to modern coil packs (e.g., R35 GTR coils) is a common and effective reliability mod.'
            }
        ]
    },
    'rb25det': {
        summary: "The RB25DET, particularly the Series 2 version, is a very popular and capable engine. It offers a great balance of torque and rev-happiness, with a strong aftermarket.",
        powerLimit: "400-450whp (approx. 300-335wkW)",
        stages: [
            {
                name: 'Stage 1',
                description: 'Simple bolt-ons for a quick and effective power gain.',
                cost: '$2,500 - $4,500 AUD',
                power: '280-320whp (210-240wkW)',
                common_mods: 'ECU (e.g. Nistune, Haltech), Boost controller, Fuel pump, Intercooler, Cat-back exhaust.'
            },
            {
                name: 'Stage 2',
                description: 'Pushing the stock turbo to its limit.',
                cost: '$4,000 - $7,000 AUD',
                power: '330-380whp (245-285wkW)',
                common_mods: 'Stage 1 + Full exhaust, Upgraded injectors, High-flow turbo elbow, Upgraded MAF.'
            },
            {
                name: 'Stage 3',
                description: 'Moving beyond the stock turbo for serious power.',
                cost: '$7,000 - $12,000+ AUD',
                power: '400whp+',
                common_mods: 'Stage 2 + Upgraded turbocharger (e.g., Garrett GT3076r), External wastegate.'
            }
        ],
        common_issues: [
            {
                name: 'Cooling System',
                description: 'The stock radiator can struggle with repeated hard use. An upgraded aluminum radiator is a wise investment. The stock viscous fan hub is also a common failure point.'
            },
             {
                name: 'Ignition System',
                description: 'Stock coil packs are a known weak point and will break down under higher boost levels. Splitfire coil packs or similar are a common upgrade.'
            }
        ]
    },
    'rb25det-neo': {
        summary: "The RB25DET NEO found in the R34 GTT is the final evolution of the RB25. It features a solid lifter head, revised intake, and a more efficient turbo, giving it a stronger base than earlier versions.",
        powerLimit: "450-500whp (approx. 335-375wkW)",
        stages: [
            {
                name: 'Stage 1',
                description: 'Basic bolt-ons to unleash the NEOs potential.',
                cost: '$2,500 - $4,500 AUD',
                power: '300-340whp (225-255wkW)',
                common_mods: 'ECU (e.g. Nistune, Haltech), Boost controller, Fuel pump, Intercooler, Cat-back exhaust.'
            },
            {
                name: 'Stage 2',
                description: 'Maximizing the stock turbo and fueling.',
                cost: '$4,500 - $7,500 AUD',
                power: '350-400whp (260-300wkW)',
                common_mods: 'Stage 1 + Full exhaust, Upgraded injectors, High-flow turbo elbow, Upgraded MAF.'
            },
            {
                name: 'Stage 3',
                description: 'Upgrading the turbo for significant power gains.',
                cost: '$7,000 - $13,000+ AUD',
                power: '420whp+',
                common_mods: 'Stage 2 + Upgraded turbocharger (e.g., Garrett GTX3071r), External wastegate.'
            }
        ],
        common_issues: [
            {
                name: 'Stock Turbo',
                description: 'While better than the old RB25 turbo, the stock NEO turbo has a nylon compressor wheel which can fail at high boost levels (above 14psi).'
            },
            {
                name: 'VVT (Variable Valve Timing)',
                description: 'The VVT system can sometimes develop rattles or fail, though it is less common. Maintaining clean oil is key to its longevity.'
            }
        ]
    },
    'barra-na': {
        summary: "The naturally aspirated Barra engine is known for its torque and reliability. While it doesnt have the headline-grabbing power of its turbo sibling, it can be made more responsive and enjoyable.",
        powerLimit: "250-280whp (approx. 185-210wkW)",
        stages: [
            {
                name: 'Stage 1',
                description: 'Improving breathing and sound for a better driving experience.',
                cost: '$1,000 - $2,500 AUD',
                power: '210-230whp (155-170wkW)',
                common_mods: 'ECU Tune, Cat-back exhaust, High-flow panel filter.'
            },
            {
                name: 'Stage 2',
                description: 'Improving intake and exhaust flow further.',
                cost: '$2,500 - $4,500 AUD',
                power: '240-260whp (180-195wkW)',
                common_mods: 'Stage 1 + High-flow catalytic converter, Ported intake or aftermarket intake manifold.'
            },
            {
                name: 'Stage 3 (Forced Induction)',
                description: 'The expensive path to more power: adding boost.',
                cost: '$12,000 - $20,000+ AUD',
                power: '350whp+',
                common_mods: 'Custom turbocharger or supercharger kit. This is a significant undertaking.'
            }
        ],
        common_issues: [
            {
                name: 'Ignition Coils',
                description: 'Coil packs are a common failure item, leading to misfires. They are relatively easy to replace.'
            },
            {
                name: 'Differential Bushes',
                description: 'The rear differential bushes are notoriously soft and prone to wear, causing a clunk from the rear end on acceleration. Upgrading to polyurethane bushes is a common fix.'
            }
        ]
    },
     'ea113': {
        summary: "The EA113 2.0T FSI engine in the Mk6 Golf R is a strong, belt-driven engine known for its tuning potential. It has some specific maintenance needs to ensure reliability.",
        powerLimit: "400-450whp (approx. 300-335wkW)",
        stages: [
            {
                name: 'Stage 1',
                description: 'An ECU tune provides the single biggest power gain.',
                cost: '$800 - $1,500 AUD',
                power: '280-310whp (210-230wkW)',
                common_mods: 'ECU Tune (Stage 1).'
            },
            {
                name: 'Stage 2',
                description: 'Improving airflow to support more power.',
                cost: '$2,500 - $5,000 AUD',
                power: '330-360whp (245-270wkW)',
                common_mods: 'ECU Tune (Stage 2), Cold air intake, High-pressure fuel pump (HPFP) upgrade, Turbo-back exhaust.'
            },
            {
                name: 'Stage 3',
                description: 'Upgrading the turbocharger for a massive performance increase.',
                cost: '$7,000 - $12,000+ AUD',
                power: '400whp+',
                common_mods: 'Stage 2 + Big turbo kit (e.g., K04 hybrid or larger), Upgraded intercooler, Upgraded clutch.'
            }
        ],
        common_issues: [
            {
                name: 'Cam Follower',
                description: 'The follower for the high-pressure fuel pump is a wear item and can fail, destroying the camshaft. It must be inspected and replaced regularly, especially on tuned cars.'
            },
            {
                name: 'PCV System',
                description: 'The stock PCV (Positive Crankcase Ventilation) valve is prone to tearing, causing boost leaks. An upgraded aftermarket PCV plate is a common reliability mod.'
            },
            {
                name: 'Timing Belt',
                description: 'As a belt-driven engine, the timing belt, tensioner, and water pump must be replaced at the recommended interval to prevent catastrophic failure.'
            }
        ]
    },
    'ea888-gen3': {
        summary: "The EA888 Gen3 engine in the Mk7 Golf R is a robust, chain-driven engine with huge tuning potential. It's more reliable than its predecessor and can make significant power with simple bolt-ons.",
        powerLimit: "500-550whp (approx. 375-410wkW)",
        stages: [
            {
                name: 'Stage 1',
                description: 'An ECU and TCU (for DSG models) tune transforms the car.',
                cost: '$1,500 - $2,500 AUD',
                power: '350-380whp (260-285wkW)',
                common_mods: 'ECU Tune, TCU Tune (DSG).'
            },
            {
                name: 'Stage 2',
                description: 'Maximizing the efficiency of the stock IS38 turbo.',
                cost: '$3,000 - $6,000 AUD',
                power: '400-440whp (300-330wkW)',
                common_mods: 'Stage 1 + Downpipe, Intercooler, Cold air intake.'
            },
            {
                name: 'Stage 3',
                description: 'Hybrid or full-frame turbo upgrades for very serious power.',
                cost: '$8,000 - $15,000+ AUD',
                power: '450whp+',
                common_mods: 'Stage 2 + Hybrid turbo (e.g. TTE525) or big turbo kit, Upgraded fuel pumps, Upgraded clutch for manual cars.'
            }
        ],
        common_issues: [
            {
                name: 'IS38 Turbo Failure',
                description: 'Early model IS38 turbochargers were prone to premature failure. Later revisions are more robust, but it is still a risk when pushing high boost on the stock unit.'
            },
            {
                name: 'Water Pump / Thermostat Housing',
                description: 'The plastic water pump and thermostat housing can become brittle and crack over time, leading to coolant leaks. It is a common preventative maintenance item.'
            }
        ]
    },
    'vr6-3-2': {
        summary: "The 3.2L VR6 engine is known for its unique engine note and smooth power delivery. It's not a huge power-maker without forced induction, but its character is its main appeal.",
        powerLimit: "260-280whp (approx. 195-210wkW)",
        stages: [
            {
                name: 'Stage 1',
                description: 'Focuses on sound and slight performance gains.',
                cost: '$1,500 - $3,000 AUD',
                power: '250-260whp (185-195wkW)',
                common_mods: 'ECU Tune, Cat-back exhaust, Cold air intake.'
            },
            {
                name: 'Stage 2',
                description: 'More extensive bolt-ons for better breathing.',
                cost: '$3,000 - $5,000 AUD',
                power: '260-275whp (195-205wkW)',
                common_mods: 'Stage 1 + High-flow headers/downpipes, Intake manifold spacer.'
            },
            {
                name: 'Stage 3 (Forced Induction)',
                description: 'Forced induction is the only path to big power.',
                cost: '$10,000 - $20,000+ AUD',
                power: '350whp+',
                common_mods: 'Turbocharger kit. This requires significant supporting mods and is a major investment.'
            }
        ],
        common_issues: [
            {
                name: 'Timing Chains',
                description: 'Like many VAG engines, the timing chains and guides can wear out over time, typically after 100,000 miles. It is a very labor-intensive job to replace them.'
            },
            {
                name: 'Ignition Coils',
                description: 'Coil pack failure is common, leading to misfires. They are relatively easy to replace in pairs or as a full set.'
            }
        ]
    },
    'k24a': {
        summary: "The Honda K24A engine is a legend for its reliability, rev-happy nature, and huge aftermarket support. It's a fantastic naturally-aspirated engine that also responds well to boost.",
        powerLimit: "250-280whp (NA) / 450-500whp (Turbo)",
        stages: [
            {
                name: 'Stage 1 (NA)',
                description: 'Basic bolt-ons and a tune.',
                cost: '$1,500 - $3,000 AUD',
                power: '210-230whp (155-170wkW)',
                common_mods: 'ECU (Hondata/K-Tuner), Cold air intake, Cat-back exhaust, Rear sway bar upgrade.'
            },
            {
                name: 'Stage 2 (NA)',
                description: 'Improving airflow for more top-end power.',
                cost: '$3,000 - $6,000 AUD',
                power: '240-260whp (180-195wkW)',
                common_mods: 'Stage 1 + Race header, Intake manifold (e.g. RBC/RRC), Upgraded cams.'
            },
            {
                name: 'Stage 3 (Forced Induction)',
                description: 'The path to significant power.',
                cost: '$8,000 - $15,000+ AUD',
                power: '350whp+',
                common_mods: 'Turbo kit or Supercharger kit, Upgraded fuel system, Upgraded clutch.'
            }
        ],
        common_issues: [
            {
                name: 'VTC Actuator',
                description: 'Can produce a rattle on cold startups. It\'s not immediately harmful but is an annoyance that can eventually fail.'
            },
            {
                name: 'Oil Consumption',
                description: 'Some K-series engines can consume oil, especially when revved high. Regular oil level checks are important.'
            }
        ]
    },
     'ej20': {
        summary: "The EJ20 is the iconic Subaru boxer engine. Known for its distinctive 'rumble' with UEL headers, it's capable but has known weaknesses, particularly concerning oiling and piston ringlands.",
        powerLimit: "300-350whp (approx. 225-260wkW)",
        stages: [
            {
                name: 'Stage 1',
                description: 'Basic tune and exhaust for sound and a modest power bump.',
                cost: '$1,000 - $2,500 AUD',
                power: '240-260whp (180-195wkW)',
                common_mods: 'ECU Tune, Cat-back exhaust.'
            },
            {
                name: 'Stage 2',
                description: 'Full exhaust and intake to maximize the stock turbo.',
                cost: '$2,500 - $5,000 AUD',
                power: '270-300whp (200-225wkW)',
                common_mods: 'Stage 1 + Turbo-back exhaust, Cold air intake, Upgraded fuel pump.'
            },
            {
                name: 'Stage 3',
                description: 'Upgrading the turbo for a significant power increase.',
                cost: '$5,000 - $10,000+ AUD',
                power: '320whp+',
                common_mods: 'Stage 2 + Upgraded turbo (e.g., VF-series or Blouch), Upgraded injectors, Intercooler.'
            }
        ],
        common_issues: [
            {
                name: 'Ringland Failure',
                description: 'The stock pistons, especially on later EJ25s, are prone to ringland failure from detonation (knock). A high-quality, safe tune is absolutely critical.'
            },
            {
                name: 'Oiling System',
                description: 'The stock oil pickup can crack, leading to oil starvation and engine failure. An upgraded pickup is a mandatory reliability mod for any modified EJ.'
            },
             {
                name: 'Head Gaskets',
                description: 'Head gasket failure is a well-known issue, particularly on naturally aspirated models but can occur on turbos as well. Look for external oil or coolant leaks.'
            }
        ]
    },
    'ej25': {
        summary: "The 2.5L EJ25 offers more torque than its 2.0L counterpart but is also considered more fragile, particularly regarding piston ringlands. Building a reliable, high-power EJ25 requires careful attention to detail.",
        powerLimit: "350-400whp (approx. 260-300wkW)",
        stages: [
            {
                name: 'Stage 1',
                description: 'ECU tune and exhaust for a quick power gain and enhanced sound.',
                cost: '$1,200 - $2,800 AUD',
                power: '300-320whp (225-240wkW)',
                common_mods: 'ECU Tune, Cat-back exhaust.'
            },
            {
                name: 'Stage 2',
                description: 'Improving breathing to get the most from the stock turbo.',
                cost: '$3,000 - $6,000 AUD',
                power: '330-360whp (245-270wkW)',
                common_mods: 'Stage 1 + Turbo-back exhaust, Cold air intake, Upgraded fuel pump.'
            },
            {
                name: 'Stage 3',
                description: 'Moving to a larger turbo and addressing fueling.',
                cost: '$7,000 - $15,000+ AUD',
                power: '380whp+',
                common_mods: 'Stage 2 + Upgraded turbo (e.g., Blouch Dominator series), Upgraded injectors, Intercooler, Equal Length (EL) headers for better performance.'
            }
        ],
        common_issues: [
            {
                name: 'Ringland Failure',
                description: 'Even more of a risk on the EJ25 than the EJ20 due to thinner cylinder walls. A safe tune and avoiding low-RPM, high-load situations (lugging the engine) is critical. Forged pistons are the ultimate solution.'
            },
            {
                name: 'Oil Pickup & Baffle',
                description: 'The stock oil pickup is a known failure point. An upgraded pickup and baffled sump are essential for any car that sees track use.'
            },
            {
                name: 'Rod Bearings',
                description: 'Rod bearing failure can occur, often due to oiling issues or detonation. Regular oil analysis can help monitor engine health.'
            }
        ]
    },
     '4g63': {
        summary: "The Mitsubishi 4G63T is a legendary, nearly indestructible iron-block engine. It can handle immense power on the stock block and has a massive aftermarket. Its main complexity comes from the AYC/ACD AWD system.",
        powerLimit: "500-550whp (approx. 375-410wkW)",
        stages: [
            {
                name: 'Stage 1',
                description: 'Basic bolt-ons and a tune.',
                cost: '$2,000 - $4,000 AUD',
                power: '320-350whp (240-260wkW)',
                common_mods: 'ECU Tune, Turbo-back exhaust, Boost controller, Walbro 255 fuel pump.'
            },
            {
                name: 'Stage 2',
                description: 'Pushing the stock turbo further with upgraded cams.',
                cost: '$4,000 - $7,000 AUD',
                power: '360-400whp (270-300wkW)',
                common_mods: 'Stage 1 + Upgraded camshafts (e.g., GSC S2), Intercooler piping, Upgraded injectors.'
            },
            {
                name: 'Stage 3',
                description: 'Upgrading the turbo for a huge jump in power.',
                cost: '$8,000 - $15,000+ AUD',
                power: '420whp+',
                common_mods: 'Stage 2 + Upgraded turbo kit (e.g., FP Green/Red/Black), Upgraded clutch.'
            }
        ],
        common_issues: [
            {
                name: 'AYC/ACD Pump',
                description: 'The pump for the active yaw control and active center differential is a very common failure point. It is expensive to replace and requires regular fluid changes to maintain.'
            },
            {
                name: 'Transfer Case',
                description: 'The transfer case can be a weak link, especially on hard launches. Upgraded bolts and regular fluid changes are important.'
            },
            {
                name: 'Boost Leaks',
                description: 'Like any turbo car, they are prone to boost leaks from aging couplers and hoses. A boost leak test is a crucial diagnostic step.'
            }
        ]
    },
    '4b11': {
        summary: "The 4B11T in the Evo X is a modern, aluminum block engine with a timing chain. While it doesn't have the same reputation for ultimate strength as the 4G63, it's still a very capable and tunable platform.",
        powerLimit: "450-500whp (approx. 335-375wkW)",
        stages: [
            {
                name: 'Stage 1',
                description: 'ECU tune and basic bolt-ons.',
                cost: '$1,500 - $3,000 AUD',
                power: '330-360whp (245-270wkW)',
                common_mods: 'ECU Tune, Turbo-back exhaust, Boost controller, High-flow fuel pump.'
            },
            {
                name: 'Stage 2',
                description: 'Improving airflow and fueling to maximize the stock turbo.',
                cost: '$3,500 - $6,000 AUD',
                power: '370-410whp (275-305wkW)',
                common_mods: 'Stage 1 + Upgraded intercooler & piping, Upgraded injectors, Cold air intake.'
            },
            {
                name: 'Stage 3',
                description: 'Moving to an upgraded turbo.',
                cost: '$7,000 - $14,000+ AUD',
                power: '430whp+',
                common_mods: 'Stage 2 + Upgraded turbo kit (e.g., FP Green/Red), Upgraded clutch (for manual) or clutch packs (for SST).'
            }
        ],
        common_issues: [
            {
                name: 'SST Transmission',
                description: 'The dual-clutch SST transmission is fast but can be fragile. It requires religious fluid changes with expensive OEM fluid and can be very costly to repair or upgrade.'
            },
            {
                name: 'Connecting Rods',
                description: 'The stock connecting rods are a known weak point and are at risk above 400wtq. Forged rods are necessary for high-power builds.'
            },
            {
                name: 'AYC/ACD Pump',
                description: 'The Evo X still suffers from the same AYC/ACD pump failure issues as its predecessors. Relocating the pump out of the weather (from the wheel well) is a common fix.'
            }
        ]
    },
    '13b-rew': {
        summary: "The 13B-REW rotary engine is a unique and high-performance engine, but it comes with a very specific set of maintenance needs. It is intolerant of detonation and overheating. A healthy, well-maintained rotary is a joy, but a neglected one is a time bomb.",
        powerLimit: "350-400whp (approx. 260-300wkW)",
        stages: [
            {
                name: 'Stage 1 (Reliability)',
                description: 'Before adding power, ensure the car is healthy.',
                cost: '$2,000 - $5,000 AUD',
                power: '260-280whp (195-210wkW)',
                common_mods: 'Upgraded radiator, Downpipe (to reduce heat), ECU (PowerFC is common), Fuel pump.'
            },
            {
                name: 'Stage 2',
                description: 'Maximizing the stock sequential twin-turbo system.',
                cost: '$4,000 - $8,000 AUD',
                power: '300-350whp (225-260wkW)',
                common_mods: 'Reliability Mods + Full exhaust, Intercooler, Cold air intake.'
            },
            {
                name: 'Stage 3',
                description: 'Simplifying with a non-sequential turbo setup or single turbo.',
                cost: '$10,000 - $20,000+ AUD',
                power: '380whp+',
                common_mods: 'Stage 1 + Non-sequential turbo conversion OR Single turbo kit, Upgraded injectors, V-mount intercooler/radiator setup.'
            }
        ],
        common_issues: [
            {
                name: 'Apex Seals',
                description: 'The infamous point of failure. Apex seals can break from detonation (bad gas or bad tune), high mileage, or overheating. A compression test is the only way to know the health of a rotary engine.'
            },
            {
                name: 'Oiling System',
                description: 'Rotaries consume oil by design (via the Oil Metering Pump). Oil levels must be checked frequently. Many owners pre-mix a small amount of 2-stroke oil in the gas tank for extra lubrication.'
            },
            {
                name: 'Vacuum Hoses',
                description: 'The stock sequential turbo system is controlled by a complex web of dozens of vacuum hoses. With age, these become brittle and crack, causing a host of boost control problems. Simplifying the system or replacing all hoses is a common, tedious job.'
            }
        ]
    },
    'f20c-f22c': {
        summary: "The F20C/F22C engines are masterpieces of Honda engineering, revving to 9000 RPM (F20C). They are incredibly reliable if maintained. Modifications focus on enhancing the VTEC experience and improving the chassis.",
        powerLimit: "240-260whp (NA) / 400-450whp (Boosted)",
        stages: [
            {
                name: 'Stage 1',
                description: 'Basic intake/exhaust mods and a tune to lower VTEC engagement.',
                cost: '$1,500 - $3,500 AUD',
                power: '220-240whp (165-180wkW)',
                common_mods: 'ECU (Hondata/K-Tuner), Cold air intake, Cat-back exhaust, Test pipe/HFC.'
            },
            {
                name: 'Stage 2 (Forced Induction)',
                description: 'Forced induction is the most common path to significant power.',
                cost: '$9,000 - $16,000+ AUD',
                power: '350whp+',
                common_mods: 'Stage 1 + Supercharger kit (common) or Turbo kit.'
            }
        ],
        common_issues: [
            {
                name: 'AP1 Oil Consumption',
                description: 'Early AP1 models can consume a significant amount of oil, especially when driven in VTEC. Regular oil level checks are critical.'
            },
            {
                name: 'Timing Chain Tensioner (TCT)',
                description: 'The TCT can lose pressure over time, creating a distinct rattling or "card in spokes" sound. Aftermarket upgraded units are a permanent fix.'
            },
            {
                name: 'Cracked Valve Retainers',
                description: 'On AP1 models, the intake valve retainers can crack if the engine is mechanically over-revved (e.g., a "money shift"). Upgrading to AP2 retainers is a common preventative measure for cars that see track time.'
            }
        ]
    },
    'k20c1': {
        summary: "The K20C1 in the Civic Type R is Honda's first turbocharged Type R engine. It is incredibly potent from the factory and responds extremely well to tuning, making it one of the most powerful FWD platforms available.",
        powerLimit: "450-500whp (approx. 335-375wkW)",
        stages: [
            {
                name: 'Stage 1',
                description: 'An ECU tune is all that is needed for a massive gain in power and torque.',
                cost: '$1,000 - $1,800 AUD',
                power: '350-370whp (260-275wkW)',
                common_mods: 'ECU (Hondata/K-Tuner).'
            },
            {
                name: 'Stage 2',
                description: 'Improving breathing and cooling to support the tune.',
                cost: '$3,000 - $6,000 AUD',
                power: '380-410whp (285-305wkW)',
                common_mods: 'Stage 1 + Intercooler, Downpipe, Front pipe, Cold air intake.'
            },
            {
                name: 'Stage 3',
                description: 'Upgrading the turbocharger.',
                cost: '$7,000 - $12,000+ AUD',
                power: '430whp+',
                common_mods: 'Stage 2 + Upgraded turbocharger, Upgraded fuel system.'
            }
        ],
        common_issues: [
            {
                name: 'Overheating on Track',
                description: 'In heavy track use, the stock cooling system can be overwhelmed. An upgraded radiator or oil cooler can be beneficial for dedicated track cars.'
            },
            {
                name: 'Gear Grind',
                description: 'Some users report a grind when shifting aggressively into 2nd gear. A transmission fluid change can sometimes help.'
            }
        ]
    },
    'k20c4-accord': {
        summary: "The K20C4 in the 10th Gen Accord 2.0T is a detuned version of the Civic Type R engine. It's a fantastic, torque-rich engine that responds very well to tuning, turning the Accord into a serious sleeper.",
        powerLimit: "400-450whp (approx. 300-335wkW)",
        stages: [
            {
                name: 'Stage 1',
                description: 'An ECU tune is the single best modification for this platform, unlocking a huge amount of performance.',
                cost: '$1,000 - $1,800 AUD',
                power: '280-310whp (210-230wkW)',
                common_mods: 'ECU (Hondata/K-Tuner).'
            },
            {
                name: 'Stage 2',
                description: 'Improving breathing and cooling to support higher boost.',
                cost: '$2,500 - $5,000 AUD',
                power: '320-350whp (240-260wkW)',
                common_mods: 'Stage 1 + Intercooler, High-flow downpipe, Cold air intake.'
            },
            {
                name: 'Stage 3',
                description: 'Upgrading the turbo for Type R-level power and beyond.',
                cost: '$6,000 - $10,000+ AUD',
                power: '380whp+',
                common_mods: 'Stage 2 + Civic Type R (FK8) turbocharger upgrade, Upgraded fuel pump.'
            }
        ],
        common_issues: [
            {
                name: 'Heat Soak',
                description: 'Like most modern turbo cars, the stock intercooler can struggle with heat, especially on tuned cars. An intercooler upgrade is highly recommended for consistent performance.'
            },
            {
                name: '10-Speed Automatic',
                description: 'The 10-speed auto is generally robust, but a TCU tune is recommended to go along with an ECU tune to improve shifting and torque management.'
            }
        ]
    },
    's54': {
        summary: "The S54 is a high-strung, race-derived inline-six with individual throttle bodies and a 8000 RPM redline. It is one of BMW's most iconic engines, but requires diligent, preventative maintenance to be reliable.",
        powerLimit: "350-380whp (NA)",
        stages: [
            {
                name: 'Stage 1 (Reliability)',
                description: 'Addressing the key failure points before adding power is non-negotiable.',
                cost: '$4,000 - $8,000 AUD',
                power: '330-340whp (245-255wkW)',
                common_mods: 'Rod bearing replacement, VANOS rebuild/bulletproofing, Rear subframe reinforcement.'
            },
            {
                name: 'Stage 2',
                description: 'Improving sound and breathing.',
                cost: '$8,000 - $15,000+ AUD',
                power: '350-380whp (260-285wkW)',
                common_mods: 'Stage 1 + CSL-style airbox, Headers, Full exhaust, ECU Tune.'
            }
        ],
        common_issues: [
            {
                name: 'Rod Bearings',
                description: 'The single most critical failure point. The original rod bearings have tight clearances and will fail, leading to catastrophic engine damage. They must be replaced as preventative maintenance with revised parts, typically every 60-80k miles.'
            },
            {
                name: 'VANOS System',
                description: 'The variable valve timing system (VANOS) is complex and prone to failure. The tabs on the exhaust hub can break, and internal seals can wear out. A full "bulletproofing" with upgraded components is essential.'
            },
            {
                name: 'Rear Subframe',
                description: 'The chassis floor where the rear subframe mounts is prone to cracking. The area must be inspected and reinforced, typically by welding in reinforcement plates.'
            }
        ]
    },
    'n55-s55': {
        summary: "The N55 (M2) and S55 (M2 Comp/CS) are modern, powerful turbocharged inline-six engines. They are generally reliable and can be tuned to produce immense power with relatively few modifications.",
        powerLimit: "550-600whp (N55) / 650-700whp (S55)",
        stages: [
            {
                name: 'Stage 1',
                description: 'An ECU tune provides a significant power and torque increase.',
                cost: '$1,000 - $2,000 AUD',
                power: '400-430whp (N55) / 480-520whp (S55)',
                common_mods: 'ECU Tune (e.g. Bootmod3, MHD).'
            },
            {
                name: 'Stage 2',
                description: 'Improving exhaust flow to reduce backpressure.',
                cost: '$2,500 - $5,000 AUD',
                power: '440-460whp (N55) / 530-560whp (S55)',
                common_mods: 'Stage 1 + High-flow downpipes.'
            },
            {
                name: 'Stage 3',
                description: 'Upgrading fueling and turbo(s) for maximum power.',
                cost: '$8,000 - $20,000+ AUD',
                power: '500whp+ (N55) / 600whp+ (S55)',
                common_mods: 'Stage 2 + Upgraded high-pressure fuel pump, Upgraded turbo(s).'
            }
        ],
        common_issues: [
            {
                name: 'Charge Pipe Failure',
                description: 'The stock plastic charge pipe is notoriously weak and will eventually crack under boost, especially on tuned cars. An aluminum replacement is one of the first and most essential reliability mods.'
            },
            {
                name: 'Crank Hub (S55)',
                description: 'A highly debated issue. The design of the crank hub allows it to potentially spin under heavy load, throwing off engine timing and causing catastrophic failure. A pinned or keyed crank hub is the ultimate solution, but it is a very expensive and labor-intensive job.'
            }
        ]
    },
    'coyote-s550': {
        summary: "The 5.0L Coyote V8 is a modern, high-revving American V8. It's reliable and responds well to modifications, particularly forced induction.",
        powerLimit: "700-750whp",
        stages: [
            {
                name: 'Stage 1',
                description: 'Improving sound and breathing.',
                cost: '$1,500 - $3,500 AUD',
                power: '450-470whp (335-350wkW)',
                common_mods: 'Cold air intake, Cat-back exhaust, ECU Tune.'
            },
            {
                name: 'Stage 2',
                description: 'Further improving airflow.',
                cost: '$3,500 - $6,000 AUD',
                power: '480-510whp (360-380wkW)',
                common_mods: 'Stage 1 + Intake manifold (e.g. from GT350), Long tube headers.'
            },
            {
                name: 'Stage 3 (Forced Induction)',
                description: 'Forced induction for massive power gains.',
                cost: '$12,000 - $25,000+ AUD',
                power: '650whp+',
                common_mods: 'Supercharger kit (e.g., Whipple, Roush) or Turbocharger kit.'
            }
        ],
        common_issues: [
            {
                name: 'Oil Pump Gears (Gen 1/2)',
                description: 'Similar to the Barra, the powdered metal oil pump gears can fail under high RPM, especially with the increased harmonics from a supercharger. Billet gears are a mandatory upgrade for any boosted application.'
            },
            {
                name: 'BBQ Tick',
                description: 'Some engines develop a ticking sound at idle, which sounds like a BBQ igniter. It is generally considered harmless but can be annoying.'
            }
        ]
    },
    'vq35': {
        summary: "The VQ35DE and later HR (High-Rev) engines are known for their great sound and torquey feel. However, they are also known for high oil consumption.",
        powerLimit: "300-320whp (NA) / 400-450whp (Boosted)",
        stages: [
            {
                name: 'Stage 1',
                description: 'Basic bolt-ons for sound and some power.',
                cost: '$1,500 - $3,500 AUD',
                power: '280-300whp (210-225wkW)',
                common_mods: 'Cold air intake/plenum spacer, Cat-back exhaust, High-flow cats or test pipes, ECU Tune.'
            },
            {
                name: 'Stage 2 (Forced Induction)',
                description: 'Forced induction is the only way to get significant power.',
                cost: '$10,000 - $18,000+ AUD',
                power: '380whp+',
                common_mods: 'Stage 1 + Supercharger or Turbocharger kit.'
            }
        ],
        common_issues: [
            {
                name: 'Oil Consumption',
                description: 'Particularly on early DE engines, high oil consumption is a very common issue due to piston ring design. Regular and frequent oil level checks are absolutely essential.'
            },
            {
                name: 'Camshaft Position Sensors',
                description: 'Failure of the camshaft or crankshaft position sensors is very common, leading to starting issues or stalling. They are relatively easy to replace.'
            }
        ]
    },
    'vr30ddtt': {
        summary: "The VR30DDTT is a modern twin-turbo V6 found in the Infiniti Q50 and Q60. It makes great power from the factory and has huge tuning potential, but has some significant reliability concerns that must be addressed.",
        powerLimit: "500-550whp",
        stages: [
            {
                name: 'Stage 1',
                description: 'An ECU tune is all that is required for a massive power and torque gain.',
                cost: '$1,200 - $2,500 AUD',
                power: '400-430whp (300-320wkW)',
                common_mods: 'ECU Tune (e.g. EcuTek).'
            },
            {
                name: 'Stage 2',
                description: 'Improving breathing to help the stock turbos.',
                cost: '$3,000 - $6,000 AUD',
                power: '440-480whp (330-360wkW)',
                common_mods: 'Stage 1 + Upgraded heat exchanger, High-flow downpipes, Cat-back exhaust.'
            },
            {
                name: 'Stage 3',
                description: 'Pushing beyond the stock turbos.',
                cost: '$8,000 - $15,000+ AUD',
                power: '500whp+',
                common_mods: 'Stage 2 + Upgraded turbochargers, Upgraded fuel pump.'
            }
        ],
        common_issues: [
            {
                name: 'Turbocharger Failure',
                description: 'The stock turbochargers are a well-known, significant failure point, especially on earlier models. The seals can fail, leading to smoke and oil consumption. Later revisions are better, but it remains a risk on tuned cars.'
            },
            {
                name: 'Serpentine Belt',
                description: 'The stock belt is known to slip and even shred, which can be ingested by the main crank seal, causing catastrophic engine failure. An anti-slip belt kit is a mandatory reliability mod.'
            },
            {
                name: 'Heat Exchanger',
                description: 'The stock heat exchanger for the water-to-air intercoolers is undersized. An upgraded unit is critical for tuned cars to prevent heat soak and power loss.'
            }
        ]
    },
    'foxbody-5.0': {
        summary: "The 5.0L V8 in the Fox Body Mustang is a legend of American performance. It's a simple pushrod V8 with a massive aftermarket, making it easy and relatively cheap to modify.",
        powerLimit: "300-350whp (NA) / 400-450whp (Boosted)",
        stages: [
            {
                name: 'Stage 1',
                description: 'Classic bolt-ons to wake up the 5.0L.',
                cost: '$1,000 - $2,500 AUD',
                power: '220-240whp (165-180wkW)',
                common_mods: 'Cold air intake, Cat-back exhaust, Underdrive pulleys, Timing adjustment.'
            },
            {
                name: 'Stage 2',
                description: 'The "Heads, Cam, Intake" combo is the traditional path to naturally aspirated power.',
                cost: '$4,000 - $8,000 AUD',
                power: '280-320whp (210-240wkW)',
                common_mods: 'Stage 1 + Aftermarket cylinder heads (e.g. AFR, Trick Flow), Camshaft, Intake manifold (e.g. Holley Systemax, Edelbrock Performer).'
            },
            {
                name: 'Stage 3 (Forced Induction)',
                description: 'Adding boost for a huge jump in power.',
                cost: '$8,000 - $15,000+ AUD',
                power: '400whp+',
                common_mods: 'Supercharger kit (e.g. Vortech, Paxton) or Turbocharger kit.'
            }
        ],
        common_issues: [
            {
                name: 'Stock Block Strength',
                description: 'The stock 5.0 block is known to be weak and can split in half above 450-500 horsepower. Forged internals and an aftermarket block are needed for serious power.'
            },
            {
                name: 'T5 Transmission',
                description: 'The stock 5-speed T5 manual transmission is notoriously weak and is not rated for much more than 300 lb-ft of torque. It is a very common failure point on modified cars.'
            },
            {
                name: 'Chassis Flex',
                description: 'The Fox Body chassis is very flexible. Subframe connectors are considered an absolutely essential modification to tie the front and rear of the car together and improve handling.'
            }
        ]
    },
    'ecoboost-2.0': {
        summary: "The 2.0L EcoBoost is a versatile turbocharged four-cylinder found in many Ford products. It responds well to basic modifications.",
        powerLimit: "300-330whp",
        stages: [
            {
                name: 'Stage 1',
                description: 'An ECU tune and better breathing.',
                cost: '$1,200 - $2,500 AUD',
                power: '260-280whp (195-210wkW)',
                common_mods: 'ECU Tune, Upgraded intercooler, High-flow air filter.'
            },
            {
                name: 'Stage 2',
                description: 'Improving exhaust flow.',
                cost: '$2,500 - $4,500 AUD',
                power: '290-310whp (215-230wkW)',
                common_mods: 'Stage 1 + Cat-back exhaust, High-flow downpipe.'
            },
            {
                name: 'Stage 3',
                description: 'Upgrading the turbocharger for a significant power bump.',
                cost: '$5,000 - $9,000+ AUD',
                power: '320whp+',
                common_mods: 'Stage 2 + Upgraded turbocharger, Upgraded fuel system.'
            }
        ],
        common_issues: [
            {
                name: 'Low-Speed Pre-Ignition (LSPI)',
                description: 'Especially on early models, LSPI can be an issue. Using high-quality gasoline and the correct specification oil is critical to prevent engine damage.'
            },
            {
                name: 'Heat Soak',
                description: 'The stock intercooler is often undersized. An upgraded intercooler is one of the most important modifications for maintaining consistent power.'
            }
        ]
    },
     'rb25de-na': {
        summary: "The naturally-aspirated RB25DE is a smooth and reliable inline-six. While it lacks the punch of its turbocharged siblings, modifications can improve its sound and responsiveness, making it a more engaging engine.",
        powerLimit: "200-220whp",
        stages: [
            {
                name: 'Stage 1',
                description: 'Focus on improving sound and engine breathing.',
                cost: '$800 - $1,800 AUD',
                power: '180-190whp (135-140wkW)',
                common_mods: 'Cat-back exhaust, High-flow panel filter.'
            },
            {
                name: 'Stage 2',
                description: 'Improving intake and exhaust flow further for better throttle response.',
                cost: '$1,800 - $3,500 AUD',
                power: '190-210whp (140-155wkW)',
                common_mods: 'Stage 1 + High-flow catalytic converter or de-cat pipe, Aftermarket headers (extractors).'
            },
            {
                name: 'Stage 3 (Advanced)',
                description: 'More involved modifications for dedicated builds. This path offers minimal gains for high cost.',
                cost: '$5,000 - $10,000+ AUD',
                power: '220whp+',
                common_mods: 'Stage 2 + Individual throttle bodies (ITBs), Upgraded camshafts, ECU Tune.'
            }
        ],
        common_issues: [
            {
                name: 'Ignition Coils',
                description: 'Like all RBs, the coil packs are a common failure point with age, leading to misfires. They are relatively simple to replace.'
            },
            {
                name: 'Cooling System',
                description: 'The stock radiator and viscous fan hub can become weak over time. An upgraded radiator or replacing the fan clutch is good preventative maintenance.'
            }
        ]
    },
    'mercedes-m278': {
        summary: "The M278 is a 4.7L twin-turbo V8 from Mercedes-Benz, known for producing effortless torque and power. It's a robust engine that responds exceptionally well to ECU tuning, unlocking significant performance gains.",
        powerLimit: "550-600whp (approx. 410-450wkW)",
        stages: [
            {
                name: 'Stage 1',
                description: 'An ECU tune is the single most effective modification, providing massive gains in horsepower and torque.',
                cost: '$2,000 - $4,000 AUD',
                power: '500-540whp (375-400wkW)',
                common_mods: 'ECU Tune (e.g., Renntech, Weistec, Eurocharged).'
            },
            {
                name: 'Stage 2',
                description: 'Improving exhaust flow to help the turbos breathe and produce more power.',
                cost: '$4,000 - $7,000 AUD',
                power: '550-580whp (410-430wkW)',
                common_mods: 'Stage 1 + High-flow downpipes (catless or sport cats).'
            },
            {
                name: 'Stage 3',
                description: 'Upgrading the turbochargers and fueling for maximum effort builds.',
                cost: '$15,000 - $25,000+ AUD',
                power: '600whp+',
                common_mods: 'Stage 2 + Upgraded turbochargers, Upgraded cooling (intercooler pump, larger heat exchanger), Methanol injection.'
            }
        ],
        common_issues: [
            {
                name: 'Heat Soak',
                description: 'The charge air cooling system can be overwhelmed on tuned cars, especially in hot climates. An upgraded heat exchanger and/or divorced cooling circuit is recommended to maintain consistent power.'
            },
            {
                name: 'Ignition Coils & Spark Plugs',
                description: 'Like many direct-injection turbo engines, the M278 is hard on spark plugs and coils, especially when tuned. It is recommended to use one step colder spark plugs and shorten the replacement interval.'
            }
        ]
    }
};

    
