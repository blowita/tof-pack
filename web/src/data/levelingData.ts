import { WeaponId } from "./weapons";
import { ResourceId } from "./resources";

export const weaponExpTable = [
  0,
  40,
  80,
  120,
  160,
  200,
  240,
  280,
  320,
  360,
  400,
  460,
  520,
  580,
  640,
  700,
  760,
  820,
  880,
  940,
  1000,
  1090,
  1180,
  1270,
  1360,
  1450,
  1540,
  1630,
  1720,
  1810,
  1900,
  2020,
  2140,
  2260,
  2380,
  2500,
  2620,
  2740,
  2860,
  2980,
  3100,
  3270,
  3440,
  3610,
  3780,
  3950,
  4120,
  4290,
  4460,
  4630,
  4800,
  5020,
  5240,
  5460,
  5680,
  5900,
  6120,
  6340,
  6560,
  6780,
  7000,
  7290,
  7580,
  7870,
  8160,
  8450,
  8740,
  9030,
  9320,
  9610,
  9900,
  10290,
  10680,
  11070,
  11460,
  11850,
  12240,
  12630,
  13020,
  13410,
  13800,
  14300,
  14800,
  15300,
  15800,
  16300,
  16800,
  17300,
  17800,
  18300,
  18800,
  19380,
  19960,
  20540,
  21120,
  21700,
  22280,
  22860,
  23440,
  24020,
  24600,
  25240,
  25880,
  26520,
  27160,
  27800,
  28440,
  29080,
  29720,
  30360,
  31000,
  31710,
  32420,
  33130,
  33840,
  34550,
  35260,
  35970,
  36680,
  37390,
  38100,
  38860,
  39620,
  40380,
  41140,
  41900,
  42660,
  43420,
  44180,
  44940,
  45700,
  46500,
  47300,
  48100,
  48900,
  49700,
  50500,
  51300,
  52100,
  52900,
  53700,
  54550,
  55400,
  56250,
  57100,
  57950,
  58800,
  59650,
  60500,
  61350,
  62200,
];

export const upgradeBreakpoints = [
  10,
  20,
  30,
  40,
  50,
  60,
  70,
  80,
  90,
  100,
  110,
  120,
  130,
  140,
  150,
];

interface UpgradeCostTallyArgs {
  rarity: number;
  level: number;
  capped: boolean;
}

export const upgradeCostTally = ({
  rarity,
  level,
  capped,
}: UpgradeCostTallyArgs): number => {
  let n = Math.trunc(level / 10);

  if (capped) {
    n -= 1;
  }

  let base = 0;
  switch (rarity) {
    case 5:
      base = 400;
      break;
    case 4:
      base = 250;
      break;
    case 3:
      base = 200;
      break;
  }

  return base * 0.5 * (n + 1) * n;
};

const MineralMaterialTierIMappingSSR = [
  0,
  2,
  4,
  7,
  10,
  14,
  20,
  28,
  39,
  39,
  39,
  39,
  39,
  39,
  39,
  39,
];

const MaterialTierIIMappingSSR = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  5,
  11,
  19,
  30,
  45,
  65,
  65,
  65,
];

const MaterialTierIIIMappingSSR = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  5,
  5,
];

const MineralMaterialTierIMappingSR = [
  0,
  1,
  3,
  5,
  7,
  10,
  14,
  20,
  28,
  28,
  28,
  28,
  28,
  28,
  28,
  28,
];

const MaterialTierIIMappingSR = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  7,
  12,
  19,
  29,
  42,
  42,
  42,
];

const MaterialTierIIIMappingSR = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  3,
  3,
];

const MineralMaterialTierIMappingR = [
  0,
  1,
  2,
  3,
  4,
  6,
  8,
  11,
  15,
  15,
  15,
  15,
  15,
  15,
  15,
  15,
];

const MaterialTierIIMappingR = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  2,
  4,
  7,
  11,
  17,
  25,
  25,
  25,
];

const MaterialTierIIIMappingR = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  2,
  2,
];

const FlameMaterialsMappingSSR = {
  [ResourceId.Firecore]: MineralMaterialTierIMappingSSR,
  [ResourceId.HeartOfLava]: MaterialTierIIMappingSSR,
  [ResourceId.Sunsource]: MaterialTierIIIMappingSSR,
};

const FrostMaterialsMappingSSR = {
  [ResourceId.Icecore]: MineralMaterialTierIMappingSSR,
  [ResourceId.HeartOfWinter]: MaterialTierIIMappingSSR,
  [ResourceId.Snowsource]: MaterialTierIIIMappingSSR,
};

const PhysicalMaterialsMappingSSR = {
  [ResourceId.Rockcore]: MineralMaterialTierIMappingSSR,
  [ResourceId.HeartOfSummit]: MaterialTierIIMappingSSR,
  [ResourceId.Landsource]: MaterialTierIIIMappingSSR,
};

const VoltMaterialsMappingSSR = {
  [ResourceId.Magcore]: MineralMaterialTierIMappingSSR,
  [ResourceId.HeartOfLightning]: MaterialTierIIMappingSSR,
  [ResourceId.Lightningsource]: MaterialTierIIIMappingSSR,
};

const CheapMaterialTierIMappingSSR = [
  0,
  0,
  0,
  3,
  6,
  10,
  16,
  24,
  35,
  35,
  35,
  35,
  35,
  35,
  35,
  35,
  35,
];

const CheapMaterialTierIMappingSR = [
  0,
  0,
  0,
  2,
  4,
  7,
  11,
  17,
  25,
  25,
  25,
  25,
  25,
  25,
  25,
  25,
  25,
];

const CheapMaterialTierIMappingR = [
  0,
  0,
  0,
  1,
  2,
  4,
  6,
  9,
  13,
  13,
  13,
  13,
  13,
  13,
  13,
  13,
  13,
];

const AcidproofGlazeMappingSSR = {
  [ResourceId.AcidproofGlazeI]: CheapMaterialTierIMappingSSR,
  [ResourceId.AcidproofGlazeII]: MaterialTierIIMappingSSR,
  [ResourceId.AcidproofGlazeIII]: MaterialTierIIIMappingSSR,
};

const NanoCoatingMappingSSR = {
  [ResourceId.NanoCoatingI]: CheapMaterialTierIMappingSSR,
  [ResourceId.NanoCoatingII]: MaterialTierIIMappingSSR,
  [ResourceId.NanoCoatingIII]: MaterialTierIIIMappingSSR,
};

const AcidproofGlazeMappingSR = {
  [ResourceId.AcidproofGlazeI]: CheapMaterialTierIMappingSR,
  [ResourceId.AcidproofGlazeII]: MaterialTierIIMappingSR,
  [ResourceId.AcidproofGlazeIII]: MaterialTierIIIMappingSR,
};

const NanoCoatingMappingSR = {
  [ResourceId.NanoCoatingI]: CheapMaterialTierIMappingSR,
  [ResourceId.NanoCoatingII]: MaterialTierIIMappingSR,
  [ResourceId.NanoCoatingIII]: MaterialTierIIIMappingSR,
};

const AcidproofGlazeMappingR = {
  [ResourceId.AcidproofGlazeI]: CheapMaterialTierIMappingR,
  [ResourceId.AcidproofGlazeII]: MaterialTierIIMappingR,
  [ResourceId.AcidproofGlazeIII]: MaterialTierIIIMappingR,
};

const NanoCoatingMappingR = {
  [ResourceId.NanoCoatingI]: CheapMaterialTierIMappingR,
  [ResourceId.NanoCoatingII]: MaterialTierIIMappingR,
  [ResourceId.NanoCoatingIII]: MaterialTierIIIMappingR,
};

const ExpensiveMaterialTierIMappingSSR = [
  0,
  0,
  0,
  0,
  3,
  7,
  13,
  21,
  32,
  32,
  32,
  32,
  32,
  32,
  32,
  32,
  32,
];

const ExpensiveMaterialTierIMappingSR = [
  0,
  0,
  0,
  0,
  2,
  5,
  9,
  15,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
  23,
];

const ExpensiveMaterialTierIMappingR = [
  0,
  0,
  0,
  0,
  1,
  3,
  5,
  8,
  12,
  12,
  12,
  12,
  12,
  12,
  12,
  12,
  12,
];

const NanofiberFrameMappingSSR = {
  [ResourceId.NanofiberFrameI]: ExpensiveMaterialTierIMappingSSR,
  [ResourceId.NanofiberFrameII]: MaterialTierIIMappingSSR,
  [ResourceId.NanofiberFrameIII]: MaterialTierIIIMappingSSR,
};

const BoosterFrameMappingSSR = {
  [ResourceId.BoosterFrameI]: ExpensiveMaterialTierIMappingSSR,
  [ResourceId.BoosterFrameII]: MaterialTierIIMappingSSR,
  [ResourceId.BoosterFrameIII]: MaterialTierIIIMappingSSR,
};

const NanofiberFrameMappingSR = {
  [ResourceId.NanofiberFrameI]: ExpensiveMaterialTierIMappingSR,
  [ResourceId.NanofiberFrameII]: MaterialTierIIMappingSR,
  [ResourceId.NanofiberFrameIII]: MaterialTierIIIMappingSR,
};

const BoosterFrameMappingSR = {
  [ResourceId.BoosterFrameI]: ExpensiveMaterialTierIMappingSR,
  [ResourceId.BoosterFrameII]: MaterialTierIIMappingSR,
  [ResourceId.BoosterFrameIII]: MaterialTierIIIMappingSR,
};

const NanofiberFrameMappingR = {
  [ResourceId.NanofiberFrameI]: ExpensiveMaterialTierIMappingR,
  [ResourceId.NanofiberFrameII]: MaterialTierIIMappingR,
  [ResourceId.NanofiberFrameIII]: MaterialTierIIIMappingR,
};

const BoosterFrameMappingR = {
  [ResourceId.BoosterFrameI]: ExpensiveMaterialTierIMappingR,
  [ResourceId.BoosterFrameII]: MaterialTierIIMappingR,
  [ResourceId.BoosterFrameIII]: MaterialTierIIIMappingR,
};

type WeaponResourcesMapping = Record<string, Record<string, number[]>>;

export const weaponResourcesMapping = {
  [WeaponId.Heartstream]: {
    ...FrostMaterialsMappingSSR,
    ...NanoCoatingMappingSSR,
    ...BoosterFrameMappingSSR,
  },
  [WeaponId.Spark]: {
    ...FlameMaterialsMappingSSR,
    ...AcidproofGlazeMappingSSR,
    ...NanofiberFrameMappingSSR,
  },
  [WeaponId.FlamingRevolver]: {
    ...FlameMaterialsMappingSSR,
    ...NanoCoatingMappingSSR,
    ...BoosterFrameMappingSSR,
  },
  [WeaponId.GurenBlade]: {
    ...PhysicalMaterialsMappingSSR,
    ...NanoCoatingMappingSSR,
    ...NanofiberFrameMappingSSR,
  },
  [WeaponId.Balmung]: {
    ...FrostMaterialsMappingSSR,
    ...NanoCoatingMappingSSR,
    ...BoosterFrameMappingSSR,
  },
  [WeaponId.Venus]: {
    ...VoltMaterialsMappingSSR,
    ...AcidproofGlazeMappingSSR,
    ...NanofiberFrameMappingSSR,
  },
  [WeaponId.AbsoluteZero]: {
    ...FrostMaterialsMappingSSR,
    ...AcidproofGlazeMappingSSR,
    ...BoosterFrameMappingSSR,
  },
  [WeaponId.Thunderblades]: {
    ...VoltMaterialsMappingSSR,
    ...NanoCoatingMappingSSR,
    ...NanofiberFrameMappingSSR,
  },
  [WeaponId.MoltenShieldV2]: {
    ...FlameMaterialsMappingSSR,
    ...AcidproofGlazeMappingSSR,
    ...NanofiberFrameMappingSSR,
  },
  [WeaponId.ScytheOfTheCrow]: {
    ...FlameMaterialsMappingSSR,
    ...AcidproofGlazeMappingSSR,
    ...NanofiberFrameMappingSSR,
  },
  [WeaponId.RosyEdge]: {
    ...FrostMaterialsMappingSSR,
    ...NanoCoatingMappingSSR,
    ...BoosterFrameMappingSSR,
  },
  [WeaponId.DualEMStars]: {
    ...VoltMaterialsMappingSSR,
    ...NanoCoatingMappingSSR,
    ...BoosterFrameMappingSSR,
  },
  [WeaponId.ChakramOfTheSeas]: {
    ...PhysicalMaterialsMappingSSR,
    ...AcidproofGlazeMappingSSR,
    ...BoosterFrameMappingSSR,
  },
  [WeaponId.IcewindArrow]: {
    ...FrostMaterialsMappingSSR,
    ...NanoCoatingMappingSSR,
    ...NanofiberFrameMappingSSR,
  },
  [WeaponId.NegatingCube]: {
    ...FlameMaterialsMappingSSR,
    ...NanoCoatingMappingSSR,
    ...NanofiberFrameMappingSSR,
  },
  [WeaponId.NightingalesFeather]: {
    [ResourceId.Rockcore]: MineralMaterialTierIMappingSR,
    [ResourceId.HeartOfSummit]: MaterialTierIIMappingSR,
    [ResourceId.Landsource]: MaterialTierIIIMappingSR,
    ...AcidproofGlazeMappingSR,
    ...NanofiberFrameMappingSR,
  },
  [WeaponId.ThunderousHalberd]: {
    [ResourceId.Magcore]: MineralMaterialTierIMappingSR,
    [ResourceId.HeartOfLightning]: MaterialTierIIMappingSR,
    [ResourceId.Lightningsource]: MaterialTierIIIMappingSR,
    ...NanoCoatingMappingSR,
    ...BoosterFrameMappingSR,
  },
  [WeaponId.Pummeler]: {
    [ResourceId.Icecore]: MineralMaterialTierIMappingSR,
    [ResourceId.HeartOfWinter]: MaterialTierIIMappingSR,
    [ResourceId.Snowsource]: MaterialTierIIIMappingSR,
    ...AcidproofGlazeMappingSR,
    ...BoosterFrameMappingSR,
  },
  [WeaponId.TheTerminator]: {
    [ResourceId.Icecore]: MineralMaterialTierIMappingSR,
    [ResourceId.HeartOfWinter]: MaterialTierIIMappingSR,
    [ResourceId.Snowsource]: MaterialTierIIIMappingSR,
    ...NanoCoatingMappingSR,
    ...NanofiberFrameMappingSR,
  },
  [WeaponId.StaffOfScars]: {
    [ResourceId.Magcore]: MineralMaterialTierIMappingSR,
    [ResourceId.HeartOfLightning]: MaterialTierIIMappingSR,
    [ResourceId.Lightningsource]: MaterialTierIIIMappingSR,
    ...NanoCoatingMappingSR,
    ...BoosterFrameMappingSR,
  },
  [WeaponId.FrostedSpear]: {
    [ResourceId.Icecore]: MineralMaterialTierIMappingR,
    [ResourceId.HeartOfWinter]: MaterialTierIIMappingR,
    [ResourceId.Snowsource]: MaterialTierIIIMappingR,
    ...NanoCoatingMappingR,
    ...NanofiberFrameMappingR,
  },
  [WeaponId.CompositeBow]: {
    [ResourceId.Firecore]: MineralMaterialTierIMappingR,
    [ResourceId.HeartOfLava]: MaterialTierIIMappingR,
    [ResourceId.Sunsource]: MaterialTierIIIMappingR,
    ...NanoCoatingMappingR,
    ...BoosterFrameMappingR,
  },
  [WeaponId.CombatBlade]: {
    [ResourceId.Rockcore]: MineralMaterialTierIMappingR,
    [ResourceId.HeartOfSummit]: MaterialTierIIMappingR,
    [ResourceId.Landsource]: MaterialTierIIIMappingR,
    ...AcidproofGlazeMappingR,
    ...BoosterFrameMappingR,
  },
  [WeaponId.EMBlade]: {
    [ResourceId.Magcore]: MineralMaterialTierIMappingR,
    [ResourceId.HeartOfLightning]: MaterialTierIIMappingR,
    [ResourceId.Lightningsource]: MaterialTierIIIMappingR,
    ...AcidproofGlazeMappingR,
    ...NanofiberFrameMappingR,
  },
} as WeaponResourcesMapping;
