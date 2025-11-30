import type { FluidsGuide } from './types';

type FluidsData = {
  [key: string]: FluidsGuide;
};

export const FLUIDS_DATA: FluidsData = {
  'l67-supercharged-v6': {
    engineOil: {
        daily: { viscosity: '10W-40', description: 'A quality semi-synthetic or full synthetic 10W-40 works well.' },
        spirited: { viscosity: '10W-40', description: 'A good quality 10W-40 provides ample protection for spirited driving.' },
        track: { viscosity: '10W-50', description: 'For track use, a thicker 10W-50 helps maintain oil pressure under high heat.' },
    },
    oilFilter: {
        oem: 'ACDelco PF52E',
        ryco: 'Z154',
    },
  },
  'holden-v8-early': {
    engineOil: {
      daily: { viscosity: '20W-50', description: 'A high-zinc mineral oil is essential for flat-tappet camshafts found in these engines.' },
      spirited: { viscosity: '20W-50', description: 'A quality high-zinc 20W-50 provides the best protection.' },
      track: { viscosity: '25W-60', description: 'For track use, a very thick, high-zinc racing oil is recommended.' },
    },
    oilFilter: {
      oem: 'ACDelco PF10',
      ryco: 'Z30',
    },
  },
  'holden-v8-5l': {
    engineOil: {
      daily: { viscosity: '10W-40', description: 'A good quality semi-synthetic or full synthetic 10W-40 works well.' },
      spirited: { viscosity: '15W-50', description: 'For spirited driving, a thicker 15W-50 offers better protection.' },
      track: { viscosity: '15W-50', description: 'A high-performance 15W-50 is a good choice for track use.' },
    },
    oilFilter: {
      oem: 'ACDelco PF2',
      ryco: 'Z160',
    },
  },
  'gm-ls1': {
    engineOil: {
      daily: { viscosity: '5W-30 or 10W-40', description: 'A quality 5W-30 or 10W-40 full synthetic is recommended.' },
      spirited: { viscosity: '10W-40', description: 'A robust 10W-40 provides good protection for spirited driving.' },
      track: { viscosity: '10W-50 or 15W-50', description: 'For track use, a high-performance 10W-50 or 15W-50 is ideal.' },
    },
    oilFilter: {
      oem: 'ACDelco PF48E',
      ryco: 'Z154',
      kn: 'HP-1007',
    },
  },
    'gm-ls3': {
    engineOil: {
      daily: { viscosity: '5W-30', description: 'A full synthetic 5W-30 meeting Dexos1 Gen 2 spec is recommended.' },
      spirited: { viscosity: '5W-40 or 10W-40', description: 'A slightly thicker 5W-40 or 10W-40 can provide extra protection for hard driving.' },
      track: { viscosity: '10W-50', description: 'For dedicated track use, a high-performance 10W-50 is recommended for thermal stability.' },
    },
    oilFilter: {
      oem: 'ACDelco PF48E',
      ryco: 'Z154',
      kn: 'HP-1007',
    },
  },
  'barra-turbo': {
    engineOil: {
      daily: { viscosity: '5W-40', description: 'A good quality full synthetic 5W-40 provides excellent protection for daily driving.' },
      spirited: { viscosity: '10W-40', description: 'A robust 10W-40 full synthetic offers better protection for occasional hard driving.' },
      track: { viscosity: '10W-50 or 10W-60', description: 'For track use, a high-performance 10W-50 or 10W-60 ester synthetic is recommended to handle high oil temperatures.' },
    },
    oilFilter: {
      oem: 'BA8A-6714-A',
      ryco: 'Z436',
      kn: 'HP-1002',
    },
  },
  'fa20': {
    engineOil: {
      daily: { viscosity: '0W-20', description: 'OEM-spec 0W-20 full synthetic is ideal for economy and daily driving.' },
      spirited: { viscosity: '5W-30', description: 'A high-quality 5W-30 synthetic offers better protection for spirited driving without significantly impacting economy.' },
      track: { viscosity: '5W-30 or 5W-40', description: 'A track-rated 5W-30 or 5W-40 synthetic is crucial to prevent oil pressure drops and protect bearings under high G-forces.' },
    },
    oilFilter: {
      oem: '15208AA130',
      ryco: 'Z436',
      kn: 'HP-1004',
    },
  },
  'fa24': {
    engineOil: {
      daily: { viscosity: '0W-20', description: 'OEM-spec 0W-20 full synthetic is ideal for economy and daily driving.' },
      spirited: { viscosity: '5W-30', description: 'Due to oil pressure concerns on track, many owners use a high-quality 5W-30 synthetic for spirited driving as a precaution.' },
      track: { viscosity: '5W-30', description: 'A track-rated 5W-30 is the community-recommended minimum for track use to mitigate oil pressure issues in high-G corners. Some use 5W-40.' },
    },
    oilFilter: {
      oem: '15208AA130',
      ryco: 'Z436',
      kn: 'HP-1004',
    },
  },
  'alloytec-v6': {
    engineOil: {
      daily: { viscosity: '5W-30', description: 'A good quality 5W-30 synthetic meeting Dexos1 Gen 2 specs is recommended.' },
      spirited: { viscosity: '5W-40', description: 'A slightly thicker 5W-40 can provide extra protection for spirited driving.' },
      track: { viscosity: '10W-40', description: 'If tracking an Alloytec, a robust 10W-40 is advisable for better high-temperature protection.' },
    },
    oilFilter: {
      oem: '19330002',
      ryco: 'Z621',
    },
  },
  'rb20det': {
    engineOil: {
      daily: { viscosity: '10W-40', description: 'A quality 10W-40 semi-synthetic or full synthetic is a great all-rounder.' },
      spirited: { viscosity: '10W-50', description: 'For spirited driving, a 10W-50 provides better high-temperature protection for the turbo.' },
      track: { viscosity: '15W-50', description: 'A high-performance 15W-50 is recommended for track use to maintain oil pressure at high temperatures.' },
    },
    oilFilter: {
      oem: 'AY100-NS007',
      ryco: 'Z145A',
    },
  },
  'rb25det': {
    engineOil: {
      daily: { viscosity: '10W-40', description: 'A quality 10W-40 semi-synthetic or full synthetic is a great all-rounder.' },
      spirited: { viscosity: '10W-50', description: 'For spirited driving, a 10W-50 provides better high-temperature protection for the turbo.' },
      track: { viscosity: '15W-50', description: 'A high-performance 15W-50 is recommended for track use to maintain oil pressure at high temperatures.' },
    },
    oilFilter: {
      oem: 'AY100-NS007',
      ryco: 'Z145A',
    },
  },
  'rb25de': {
    engineOil: {
      daily: { viscosity: '10W-40', description: 'A quality 10W-40 semi-synthetic or full synthetic works well for daily use.' },
      spirited: { viscosity: '10W-40', description: '10W-40 is sufficient for spirited driving in the non-turbo engine.' },
      track: { viscosity: '10W-50', description: 'If tracking, moving to a 10W-50 can provide an extra layer of protection.' },
    },
    oilFilter: {
      oem: 'AY100-NS007',
      ryco: 'Z145A',
    },
  },
  'rb25det-neo': {
    engineOil: {
      daily: { viscosity: '10W-40', description: 'A quality 10W-40 full synthetic is recommended.' },
      spirited: { viscosity: '10W-50', description: 'For spirited driving, a 10W-50 provides better high-temperature protection for the turbo.' },
      track: { viscosity: '15W-50', description: 'A high-performance 15W-50 is recommended for track use.' },
    },
    oilFilter: {
      oem: 'AY100-NS007',
      ryco: 'Z145A',
    },
  },
  'rb26dett': {
    engineOil: {
      daily: { viscosity: '10W-50', description: 'Due to the heat from twin turbos, a robust 10W-50 is often recommended even for daily use.' },
      spirited: { viscosity: '10W-60', description: 'A high-performance 10W-60 like Castrol Edge or similar is the go-to for many GT-R owners.' },
      track: { viscosity: '15W-50', description: 'A race-proven 15W-50 ester synthetic is required to protect the engine under track conditions, especially the oil pump drive.' },
    },
    oilFilter: {
      oem: 'AY100-NS005',
      ryco: 'Z445',
    },
  },
  'barra-na': {
    engineOil: {
      daily: { viscosity: '5W-30', description: 'A quality 5W-30 synthetic blend or full synthetic is perfect for daily duties.' },
      spirited: { viscosity: '10W-40', description: 'A 10W-40 provides a bit more protection for spirited driving.' },
      track: { viscosity: '10W-40', description: 'If you track an NA Barra, a good 10W-40 full synthetic is sufficient.' },
    },
    oilFilter: {
      oem: 'BA8A-6714-A',
      ryco: 'Z436',
    },
  },
  'vr6-3-2': {
    engineOil: {
      daily: { viscosity: '5W-40', description: 'A full synthetic 5W-40 meeting VW 502.00 spec is required.' },
      spirited: { viscosity: '5W-40', description: 'A high-quality VW 502.00 spec 5W-40 is robust enough for spirited driving.' },
      track: { viscosity: '5W-50', description: 'For track use, a thicker 5W-50 can provide better protection against high oil temperatures.' },
    },
    oilFilter: {
      oem: '071115562C',
      ryco: 'R2653P',
    },
  },
  'ea113': {
    engineOil: {
      daily: { viscosity: '5W-40', description: 'A full synthetic 5W-40 meeting VW 502.00 spec is required.' },
      spirited: { viscosity: '5W-40', description: 'A high-quality VW 502.00 spec 5W-40 is robust enough for spirited driving. Ensure cam follower is checked regularly.' },
      track: { viscosity: '5W-50', description: 'For track use, a thicker 5W-50 can provide better protection, especially on tuned cars.' },
    },
    oilFilter: {
      oem: '06D115562',
      ryco: 'R2704P',
    },
  },
  'ea888-gen3': {
    engineOil: {
      daily: { viscosity: '5W-40', description: 'A full synthetic 5W-40 meeting VW 502.00 spec is recommended.' },
      spirited: { viscosity: '5W-40', description: 'A high-quality VW 502.00 spec 5W-40 is robust enough for spirited driving. Many owners shorten intervals on tuned cars.' },
      track: { viscosity: '5W-50', description: 'For track use on tuned cars, a 5W-50 can provide extra protection for the turbo and bearings.' },
    },
    oilFilter: {
      oem: '06L115562',
      ryco: 'R2748P',
    },
  },
  'ea888-gen4': {
    engineOil: {
      daily: { viscosity: '0W-30 or 5W-30', description: 'OEM spec is typically a lighter VW 504.00 spec oil for emissions and economy.' },
      spirited: { viscosity: '5W-40', description: 'Many owners upgrade to a robust VW 502.00 spec 5W-40 for better protection on tuned or hard-driven cars.' },
      track: { viscosity: '5W-40', description: 'A high-quality 5W-40 is the minimum for track use. Check with your tuner for specific recommendations.' },
    },
    oilFilter: {
      oem: '06L115562B',
      ryco: 'R2932P',
    },
  },
  'mercedes-m273': {
    engineOil: {
      daily: { viscosity: '5W-40', description: 'A full synthetic 5W-40 meeting MB 229.5 spec is required.' },
      spirited: { viscosity: '5W-40', description: 'The MB 229.5 spec 5W-40 is sufficient for spirited driving.' },
      track: { viscosity: '5W-50', description: 'If tracking this large SUV, a 5W-50 can offer additional high-temperature protection.' },
    },
    oilFilter: {
      oem: 'A2721800509',
      ryco: 'R2709P',
    },
  },
  'mercedes-m278': {
    engineOil: {
      daily: { viscosity: '5W-40', description: 'A full synthetic 5W-40 meeting MB 229.5 spec is required.' },
      spirited: { viscosity: '5W-40', description: 'The MB 229.5 spec 5W-40 is sufficient, but shorter change intervals are wise on tuned engines.' },
      track: { viscosity: '5W-50', description: 'Due to the heat from twin turbos, a 5W-50 is a good idea for any track work.' },
    },
    oilFilter: {
      oem: 'A2781800009',
      ryco: 'R2739P',
    },
  },
  'ecoboost-2.0': {
    engineOil: {
      daily: { viscosity: '5W-30', description: 'A full synthetic 5W-30 meeting Ford WSS-M2C946-A spec is recommended.' },
      spirited: { viscosity: '5W-30', description: 'A high-quality full synthetic 5W-30 is sufficient.' },
      track: { viscosity: '5W-40', description: 'For track use, moving to a 5W-40 can provide better protection against oil thinning.' },
    },
    oilFilter: {
      oem: 'FL-910S',
      ryco: 'Z436',
    },
  },
  'k24a': {
    engineOil: {
      daily: { viscosity: '5W-30', description: 'A quality 5W-30 synthetic is a great all-around choice.' },
      spirited: { viscosity: '5W-40', description: 'For spirited driving or tuned NA builds, a 5W-40 offers better protection in VTEC.' },
      track: { viscosity: '10W-40 or 5W-50', description: 'For track use, a high-quality 10W-40 or 5W-50 is recommended to maintain oil pressure.' },
    },
    oilFilter: {
      oem: '15400-PLM-A02',
      ryco: 'Z411',
      kn: 'HP-1010',
    },
  },
  'ej20': {
    engineOil: {
      daily: { viscosity: '5W-40', description: 'A high-quality 5W-40 full synthetic is strongly recommended to protect against bearing wear.' },
      spirited: { viscosity: '5W-40', description: 'A robust 5W-40 is good for spirited driving. Check oil levels frequently.' },
      track: { viscosity: '10W-50 or 15W-50', description: 'For track use, a thick 10W-50 or 15W-50 ester synthetic is essential to protect against oil starvation and ringland failure.' },
    },
    oilFilter: {
      oem: '15208AA100',
      ryco: 'Z436',
    },
  },
  'ej25': {
    engineOil: {
      daily: { viscosity: '5W-40', description: 'A high-quality 5W-40 full synthetic is the minimum recommended to protect against ringland and bearing issues.' },
      spirited: { viscosity: '5W-40', description: 'A robust 5W-40 is good for spirited driving. Avoid low-speed, high-load situations.' },
      track: { viscosity: '10W-50 or 15W-50', description: 'For track use, a thick 10W-50 or 15W-50 ester synthetic is essential to provide a cushion for the bearings and ringlands.' },
    },
    oilFilter: {
      oem: '15208AA12A',
      ryco: 'Z436',
    },
  },
  'fa20-dit': {
    engineOil: {
      daily: { viscosity: '5W-30', description: 'A quality 5W-30 full synthetic is the standard recommendation for the direct-injected turbo FA20 in the WRX.' },
      spirited: { viscosity: '5W-40', description: 'For tuned cars or spirited driving, a 5W-40 can provide extra protection against carbon buildup and heat.' },
      track: { viscosity: '10W-40', description: 'For track use, a robust 10W-40 is recommended to handle the high temperatures of a turbo engine on track.' },
    },
    oilFilter: {
      oem: '15208AA170',
      ryco: 'Z797',
    },
  },
  '4g63': {
    engineOil: {
      daily: { viscosity: '10W-40', description: 'A high-quality 10W-40 is a great all-around choice for the 4G63.' },
      spirited: { viscosity: '10W-50', description: 'For tuned or hard-driven cars, a 10W-50 offers better protection for the turbo and bearings.' },
      track: { viscosity: '15W-50', description: 'A race-proven 15W-50 is a must for track use to handle extreme temperatures.' },
    },
    oilFilter: {
      oem: 'MD356000',
      ryco: 'Z411',
    },
  },
  '4b11': {
    engineOil: {
      daily: { viscosity: '5W-40', description: 'A quality 5W-40 full synthetic is a good choice for daily driving.' },
      spirited: { viscosity: '5W-40', description: 'A robust 5W-40 is suitable for spirited driving. Shorter intervals are recommended.' },
      track: { viscosity: '10W-50', description: 'For track use, a 10W-50 is recommended to protect the engine and turbo from high heat.' },
    },
    oilFilter: {
      oem: '1230A045',
      ryco: 'Z411',
    },
  },
  'skyactiv-g': {
    engineOil: {
      daily: { viscosity: '0W-20', description: 'OEM-spec 0W-20 is designed for maximum fuel efficiency.' },
      spirited: { viscosity: '0W-20 or 5W-30', description: 'A high-quality 0W-20 is fine, but some prefer the slightly thicker 5W-30 for hard driving.' },
      track: { viscosity: '5W-30', description: 'For track use, a 5W-30 is recommended for better high-temperature protection.' },
    },
    oilFilter: {
      oem: 'PE01-14-302A',
      ryco: 'R2719P',
    },
  },
  '13b-rew': {
    engineOil: {
      daily: { viscosity: '10W-30 or 10W-40', description: 'A high-quality mineral or semi-synthetic oil is often preferred as full synthetics can be slower to burn off, leading to carbon buildup. Mineral oil is a safe bet.' },
      spirited: { viscosity: '10W-40', description: 'A robust 10W-40 provides good protection. Always pre-mix 2-stroke oil in the fuel for lubrication.' },
      track: { viscosity: '20W-50', description: 'For track use, a high-zinc 20W-50 racing oil is used to provide maximum protection for bearings at extreme temperatures. Pre-mixing is essential.' },
    },
    oilFilter: {
      oem: 'N3R1-14-302',
      ryco: 'Z411',
    },
  },
  'f20c-f22c': {
    engineOil: {
      daily: { viscosity: '10W-30', description: 'A quality 10W-30 full synthetic is the factory recommendation and works well.' },
      spirited: { viscosity: '5W-40 or 10W-40', description: 'A 5W-40 or 10W-40 provides better protection for frequent VTEC use.' },
      track: { viscosity: '5W-40 or 5W-50', description: 'A high-performance 5W-40 or 5W-50 is recommended to cope with high oil temperatures during track sessions.' },
    },
    oilFilter: {
      oem: '15400-PCX-004',
      kn: 'HP-1004',
    },
  },
  'k20c1': {
    engineOil: {
      daily: { viscosity: '0W-20', description: 'OEM spec is 0W-20 for efficiency.' },
      spirited: { viscosity: '5W-30', description: 'Many owners move to a high-quality 5W-30 for better protection, especially on tuned cars.' },
      track: { viscosity: '5W-40', description: 'For track use, a robust 5W-40 is required to protect the turbo and engine internals.' },
    },
    oilFilter: {
      oem: '15400-RTA-003',
      kn: 'HP-1010',
    },
  },
  'k20c4': {
    engineOil: {
      daily: { viscosity: '0W-20', description: 'OEM spec is 0W-20 full synthetic for efficiency.' },
      spirited: { viscosity: '5W-30', description: 'Moving to a high-quality 5W-30 is a popular choice for better protection on tuned cars.' },
      track: { viscosity: '5W-40', description: 'For any track use, a robust 5W-40 is recommended to protect the turbo.' },
    },
    oilFilter: {
      oem: '15400-RTA-003',
      kn: 'HP-1010',
    },
  },
  's54': {
    engineOil: {
      daily: { viscosity: '10W-60', description: 'OEM-spec 10W-60 is mandatory. This engine has specific bearing clearances that require this viscosity. Use Castrol Edge TWS or a similar spec oil.' },
      spirited: { viscosity: '10W-60', description: '10W-60 is non-negotiable for this engine under all circumstances.' },
      track: { viscosity: '10W-60', description: 'A race-quality 10W-60 is essential. Regular oil analysis is highly recommended to monitor rod bearing health.' },
    },
    oilFilter: {
      oem: '11427833769',
      ryco: 'R2634P',
    },
  },
  'n55-s55': {
    engineOil: {
      daily: { viscosity: '5W-30 or 5W-40', description: 'A full synthetic 5W-30 or 5W-40 meeting BMW LL-01 spec.' },
      spirited: { viscosity: '5W-40', description: 'A robust 5W-40 is preferred for tuned or hard-driven cars.' },
      track: { viscosity: '5W-40 or 5W-50', description: 'For track use, a high-performance 5W-40 or 5W-50 is recommended for thermal stability.' },
    },
    oilFilter: {
      oem: '11427854445', // S55
      ryco: 'R2749P',
    },
  },
  'coyote-s550': {
    engineOil: {
      daily: { viscosity: '5W-20', description: 'OEM spec is 5W-20. A quality full synthetic is recommended.' },
      spirited: { viscosity: '5W-30', description: 'Many owners upgrade to 5W-30 for better protection during spirited driving.' },
      track: { viscosity: '5W-50', description: 'For track use, Ford specifies 5W-50 to protect against oil thinning and to protect the oil pump gears.' },
    },
    oilFilter: {
      oem: 'FL-500S',
      kn: 'HP-1017',
    },
  },
  'vq35': {
    engineOil: {
      daily: { viscosity: '5W-30', description: 'A quality 5W-30 synthetic. Check levels frequently due to potential oil consumption.' },
      spirited: { viscosity: '5W-40 or 10W-40', description: 'A thicker oil can help slow consumption and provide better protection.' },
      track: { viscosity: '10W-50', description: 'For track use, a high-performance 10W-50 is recommended.' },
    },
    oilFilter: {
      oem: '15208-65F0E',
      ryco: 'Z436',
    },
  },
  'honda-f-series': {
    engineOil: {
      daily: { viscosity: '5W-30', description: 'A quality 5W-30 synthetic or semi-synthetic is a great choice.' },
      spirited: { viscosity: '10W-30', description: 'A 10W-30 offers good protection for an older engine.' },
      track: { viscosity: '10W-40', description: 'If tracking, a 10W-40 provides extra high-temperature protection.' },
    },
    oilFilter: {
      oem: '15400-PLM-A02',
      ryco: 'Z411',
    },
  },
  'vr30ddtt': {
    engineOil: {
      daily: { viscosity: '5W-30', description: 'A quality 5W-30 full synthetic. Shorter intervals are wise due to turbo reliability concerns.' },
      spirited: { viscosity: '5W-40', description: 'A robust 5W-40 provides better thermal stability for the turbos during spirited driving.' },
      track: { viscosity: '5W-40 or 5W-50', description: 'For track use, a high-performance 5W-40 or 5W-50 is essential to protect the turbos.' },
    },
    oilFilter: {
      oem: '15208-31U0B',
      ryco: 'Z436',
    },
  },
  'pushrod-5-0': {
    engineOil: {
      daily: { viscosity: '10W-30', description: 'A quality 10W-30 mineral or semi-synthetic oil is a great choice for a stock or lightly modified engine.' },
      spirited: { viscosity: '10W-40', description: 'A 10W-40 provides more protection for hard driving.' },
      track: { viscosity: '15W-50', description: 'For track use, a high-zinc 15W-50 racing oil is recommended to protect the flat-tappet camshaft (if applicable) and bearings.' },
    },
    oilFilter: {
      oem: 'FL-1A',
      ryco: 'Z9',
      kn: 'HP-3001',
    },
  },
  'ford-mod-v8': {
    engineOil: {
      daily: { viscosity: '5W-20', description: 'OEM spec is 5W-20. Use a quality synthetic blend or full synthetic.' },
      spirited: { viscosity: '5W-30', description: 'For spirited driving, many owners move to a 5W-30 for better high-temp protection.' },
      track: { viscosity: '5W-40', description: 'For track use, a robust 5W-40 full synthetic is recommended.' },
    },
    oilFilter: {
      oem: 'FL-820S',
      ryco: 'Z516',
      kn: 'HP-2010',
    },
  },
  'coyote-s197': {
    engineOil: {
      daily: { viscosity: '5W-20', description: 'OEM spec for the 5.0L Coyote is 5W-20 full synthetic.' },
      spirited: { viscosity: '5W-30', description: 'Many owners upgrade to 5W-30 for better protection, especially in warmer climates.' },
      track: { viscosity: '5W-50', description: 'Ford specifies 5W-50 for track use (same as the Boss 302) to protect bearings and oil pump gears.' },
    },
    oilFilter: {
      oem: 'FL-500S',
      kn: 'HP-1017',
    },
  },
  'coyote-s650': {
    engineOil: {
      daily: { viscosity: '5W-30', description: 'The new S650 platform now specifies 5W-30 from the factory.' },
      spirited: { viscosity: '5W-30', description: 'A high-quality 5W-30 full synthetic is sufficient for spirited use.' },
      track: { viscosity: '5W-50', description: 'Similar to previous generations, a 5W-50 is recommended for heavy track use to ensure oil pressure stability.' },
    },
    oilFilter: {
      oem: 'FL-500S',
      kn: 'HP-1017',
    },
  },
};

    
