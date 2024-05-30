// This addon is disabled by default.
// You can also disable addons by not making them end with '.js'
// If you want to enable, simply make the line below just not run.
// return console.log('[armzRaceAdditionz.js] Addon disabled by default');

const forcePush = util.forcePush
const { combineStats, makeBird, makeMulti } = require('../facilitators.js');
const { base, statnames, gunCalcNames, dfltskl, smshskl } = require('../constants.js');
const g = require('../gunvals.js');

// UNDERGUNNER BRANCH
Class.aydanl_underGunner = {
    PARENT: "genericTank",
    LABEL: "Undergunner",
    DANGER: 6,
    STAT_NAMES: statnames.mixed,
    BODY: {
        SPEED: base.SPEED * 0.9,
        FOV: 1.1,
    },
	SHAPE: 4,
    GUNS: [
        {
            POSITION: [5.25, 12, 1.2, 8, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                TYPE: "sunchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.necro,
				MAX_CHILDREN: 12,
            }
        },
        {
            POSITION: [19, 2, 1, 0, -2.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, g.flankGuard]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 2, 1, 0, 2.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, g.flankGuard]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12.5, 13, 0.7, 0, 0, 0, 0],
        },
    ],
}
Class.aydanl_necroGunner = {
    PARENT: "genericTank",
    LABEL: "Necrogunner",
    DANGER: 6,
    STAT_NAMES: statnames.mixed,
    BODY: {
        SPEED: base.SPEED * 0.9,
        FOV: 1.1,
    },
	SHAPE: 4,
    GUNS: [
        {
            POSITION: [5.25, 12, 1.2, 8, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                TYPE: "sunchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.necro,
				MAX_CHILDREN: 7,
            }
        },
        {
            POSITION: [5.25, 12, 1.2, 8, 0, -90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                TYPE: "sunchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.necro,
				MAX_CHILDREN: 7,
            }
        },
        {
            POSITION: [19, 2, 1, 0, -2.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, g.flankGuard]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 2, 1, 0, 2.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, g.flankGuard]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 11, 1, 0, 0, 0, 0],
        },
    ],
}

// PRODIGY BRANCH
Class.aydanl_prodigy = makeMulti({
    PARENT: "genericTank",
    DANGER: 7,
	SHAPE: 6,
    STAT_NAMES: statnames.misc,
    GUNS: [
        {
            POSITION: [15, 7, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [4, 7, 1.7, 14, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.flankGuard]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap
            }
        },
		{
            POSITION: [3.25, 10, 1.1, 10, 0, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, {size: 1.2}]),
                TYPE: "sunchip",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.necro,
				MAX_CHILDREN: 4,
            }
        },
    ]
}, 3, "prodigy")

// STORMER BRANCH
Class.aydanl_stormer = {
    PARENT: "genericTank",
    LABEL: "Stormer",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [26, 2, 1, 0, -2.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, { speed: 0.7, maxSpeed: 0.7 }, g.flankGuard, { recoil: 1.8 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [26, 2, 1, 0, 2.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, { speed: 0.7, maxSpeed: 0.7 }, g.flankGuard, { recoil: 1.8 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 10, 1, 8, 0, 0, 0],
        },
        {
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, { range: 0.7, health: 0.8, speed: 0.8 }]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.aydanl_redistormer = {
    PARENT: "genericTank",
    LABEL: "Redistormer",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [29, 2, 1, 0, -2.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, { speed: 0.7, maxSpeed: 0.7 }, g.flankGuard, { recoil: 1.8 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [29, 2, 1, 0, 2.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, { speed: 0.7, maxSpeed: 0.7 }, g.flankGuard, { recoil: 1.8 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [25, 8, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [23, 10, 1.1, 0, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.lowPower, g.machineGun, { range: 0.7, health: 0.8, speed: 0.8, recoil: 1.15 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, { range: 0.7, health: 0.8, speed: 0.8 }]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.aydanl_foXtormer = {
    PARENT: "genericTank",
    LABEL: "FoXtormer",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [28, 2, 1, 0, -2.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, { speed: 0.7, maxSpeed: 0.7 }, g.flankGuard, { recoil: 1.8 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [28, 2, 1, 0, 2.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, { speed: 0.7, maxSpeed: 0.7 }, g.flankGuard, { recoil: 1.8 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [24, 10, 1, 0, 0, 0, 0],
        },
        {
            POSITION: [14, 10, 1.3, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.focal, { range: 0.7, health: 0.8, speed: 0.8 }]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.aydanl_phoeniXtormer = makeBird( Class.aydanl_stormer, "PhoeniXtormer" );
Class.aydanl_jagdPanzer = {
    PARENT: "genericTank",
    LABEL: "Jagdpanzer",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [10, 7.5, 0.6, 3, 3, 20, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, {range: 0.6, reload: 1, health: 0.6}]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [10, 7.5, 0.6, 3, -3, -20, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, {range: 0.6, reload: 1, health: 0.6}]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [26, 2, 1, 0, -2.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, { speed: 0.7, maxSpeed: 0.7 }, g.flankGuard, { recoil: 1.8 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [26, 2, 1, 0, 2.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, { speed: 0.7, maxSpeed: 0.7 }, g.flankGuard, { recoil: 1.8 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 10, 1, 8, 0, 0, 0],
        },
        {
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, { range: 0.7, health: 0.8, speed: 0.8 }]),
                TYPE: "bullet"
            }
        }
    ]
}

// CRUISER-SPRAYER BRANCH
Class.aydanl_spruiser = {
    PARENT: "genericTank",
    LABEL: "Spruiser",
    DANGER: 6,
    GUNS: [
        {
            POSITION: [10, 7.5, 0.6, 3, 3, 20, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, {range: 0.6, reload: 1, health: 0.6}]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [10, 7.5, 0.6, 3, -3, -20, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, {range: 0.6, reload: 1, health: 0.6}]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [23, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.lowPower, g.pelleter, { recoil: 1.15 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.aydanl_redistruiser = {
    PARENT: "genericTank",
    LABEL: "Redistruiser",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [10, 7.5, 0.6, 3, 3, 20, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, {range: 0.6, reload: 1, health: 0.6}]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [10, 7.5, 0.6, 3, -3, -20, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, {range: 0.6, reload: 1, health: 0.6}]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [26, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.lowPower, g.machineGun, { recoil: 1.15 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [23, 10, 1, 0, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.lowPower, g.machineGun, { recoil: 1.15 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.aydanl_cruisomizer = {
    PARENT: "genericTank",
    LABEL: "Cruizomizer",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [10, 7.5, 0.6, 3, 3, 20, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, {range: 0.6, reload: 1, health: 0.6}]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [10, 7.5, 0.6, 3, -3, -20, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, {range: 0.6, reload: 1, health: 0.6}]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [5, 7.5, 1.3, 18.5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.lowPower, g.machineGun, { recoil: 1.15 }, g.atomizer]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.aydanl_cruisal = {
    PARENT: "genericTank",
    LABEL: "Cruisal",
    DANGER: 7,
    GUNS: [
        {
            POSITION: [10, 7.5, 0.6, 3, 3, 20, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, {range: 0.6, reload: 1, health: 0.6}]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [10, 7.5, 0.6, 3, -3, -20, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, {range: 0.6, reload: 1, health: 0.6}]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [25, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.lowPower, g.machineGun, { recoil: 1.15 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 10, 1.3, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.machineGun, g.focal]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.aydanl_phoeser = makeBird( Class.aydanl_spruiser, "Phoeser" );

// GUNNER-CRUISER BRANCH
Class.aydanl_panzer = {
    PARENT: "genericTank",
    LABEL: "Panzer",
    DANGER: 7,
	FACING_TYPE: "locksFacing",
	BODY: {
        FOV: 1.2 * base.FOV,
    },
	STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: [8, 7.5, 0.6, 3, 6, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, {range: 0.6, reload: 0.5, health: 0.6}]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [8, 7.5, 0.6, 3, -6, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, {range: 0.6, reload: 0.5, health: 0.6}]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [16, 3.5, 1, 0, 3.75, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        },
        {
            POSITION: [16, 3.5, 1, 0, -3.75, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.gunner, { speed: 1.2 }]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.aydanl_flakPanzer = {
    PARENT: "genericTank",
    LABEL: "Flakpanzer",
    DANGER: 6,
	FACING_TYPE: "locksFacing",
	BODY: {
        FOV: 1.2 * base.FOV,
    },
	STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: [8, 7.5, 0.6, 3, 6, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, {range: 0.6, reload: 0.5, health: 0.6}]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [8, 7.5, 0.6, 3, -6, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, {range: 0.6, reload: 0.5, health: 0.6}]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [19, 2, 1, 0, -2.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, { speed: 0.7, maxSpeed: 0.7 }, g.flankGuard, { recoil: 1.8 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 2, 1, 0, 2.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, { speed: 0.7, maxSpeed: 0.7 }, g.flankGuard, { recoil: 1.8 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [13, 11, 1, 0, 0, 0, 0],
        },
    ]
}
Class.aydanl_bracer = { // IN CASE THE USER DOESN'T HAVE THE MAIN ARMS RACE ADDON
    PARENT: "genericTank",
    LABEL: "Bracer",
    DANGER: 6,
	FACING_TYPE: "locksFacing",
	BODY: {
        FOV: 1.2 * base.FOV,
    },
	STAT_NAMES: statnames.mixed,
    GUNS: [
        {
            POSITION: [8, 7.5, 0.6, 5, 1, 25, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, {range: 0.6, reload: 0.5, health: 0.6}]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [8, 7.5, 0.6, 5, -1, -25, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, {range: 0.6, reload: 0.5, health: 0.6}]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [19, 2, 1, 0, -2.5, 0, 0.25],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, g.nailgun]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 2, 1, 0, 2.5, 0, 0.75],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, g.nailgun]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 2, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, g.nailgun]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [5.5, 7, -1.8, 6.5, 0, 0, 0],
        },
    ]
}

// GUNNER-HELIX BRANCH
Class.aydanl_channeler = {
    PARENT: "genericTank",
    LABEL: "Channeler",
    DANGER: 6,
    STAT_NAMES: statnames.desmos,
    GUNS: [
        {
            POSITION: [15, 4, 0.75, 0, -2, -30, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.desmos]),
                TYPE: ["bullet", {MOTION_TYPE: ["desmos", {invert: false}]}]
            },
        },
        {
            POSITION: [15, 4, 0.75, 0, 2, 30, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.desmos]),
                TYPE: ["bullet", {MOTION_TYPE: ["desmos", {invert: true}]}]
            },
        },
        {
            POSITION: [2.625, 4, 2.75, 2.75, -7.75, 120, 0],
        },
        {
            POSITION: [2.625, 4, 2.75, 2.75, 7.75, -120, 0],
        },
        {
            POSITION: [19, 2, 1, 0, -2.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, { speed: 0.7, maxSpeed: 0.7 }, g.flankGuard, { recoil: 1.8 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 2, 1, 0, 2.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, { speed: 0.7, maxSpeed: 0.7 }, g.flankGuard, { recoil: 1.8 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [13, 11, -1.4, 0, 0, 0, 0],
        },
    ],
};
Class.aydanl_channeler2 = {
    PARENT: "genericTank",
    LABEL: "Channeler",
    DANGER: 6,
    STAT_NAMES: statnames.desmos,
    GUNS: [
        {
            POSITION: [14, 4, 0.75, 0, -3, -20, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.desmos]),
                TYPE: ["bullet", {MOTION_TYPE: ["desmos", {invert: false}]}]
            },
        },
        {
            POSITION: [14, 4, 0.75, 0, 3, 20, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.desmos]),
                TYPE: ["bullet", {MOTION_TYPE: ["desmos", {invert: true}]}]
            },
        },
        {
            POSITION: [2.625, 4, 2.75, 3.25, -5.75, 110, 0],
        },
        {
            POSITION: [2.625, 4, 2.75, 3.25, 5.75, -110, 0],
        },
        {
            POSITION: [19, 2.5, 1, 0, -3, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, { speed: 0.7, maxSpeed: 0.7 }, g.flankGuard, { recoil: 1.8 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 2.5, 1, 0, 3, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.power, g.twin, { speed: 0.7, maxSpeed: 0.7 }, g.flankGuard, { recoil: 1.8 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [13, 9, -1.5, 0, 0, 0, 0],
        },
    ],
};

// UPGRADES TREE
Class.gunner.UPGRADES_TIER_3.push( "aydanl_underGunner", "aydanl_stormer", "aydanl_panzer", "aydanl_channeler", "aydanl_channeler2" );
Class.underseer.UPGRADES_TIER_3.push( "aydanl_underGunner", "aydanl_prodigy" );
	Class.aydanl_underGunner.UPGRADES_TIER_3 = [ "aydanl_necroGunner" ];
		forcePush( Class.necromancer, "UPGRADES_TIER_3", "aydanl_necroGunner" );
Class.sprayer.UPGRADES_TIER_3.push( "aydanl_stormer", "aydanl_spruiser" );
	Class.aydanl_stormer.UPGRADES_TIER_3 = [ "aydanl_redistormer", "aydanl_phoeniXtormer", "aydanl_foXtormer", "aydanl_jagdPanzer" ];
		forcePush( Class.redistributor, "UPGRADES_TIER_3", "aydanl_redistormer", "aydanl_redistruiser" );
		forcePush( Class.phoenix, "UPGRADES_TIER_3", "aydanl_phoeniXtormer", "aydanl_phoeser" );
		forcePush( Class.focal, "UPGRADES_TIER_3", "aydanl_foXtormer", "aydanl_cruisal" );
		forcePush( Class.atomizer, "UPGRADES_TIER_3", "aydanl_cruisomizer" );
	Class.aydanl_spruiser.UPGRADES_TIER_3 = [ "aydanl_jagdPanzer", "aydanl_redistruiser", "aydanl_cruisomizer", "aydanl_cruisal", "aydanl_phoeser" ];
Class.cruiser.UPGRADES_TIER_3.push( "aydanl_panzer", "aydanl_spruiser" );
	Class.aydanl_panzer.UPGRADES_TIER_3 = [ "aydanl_flakPanzer", "aydanl_jagdPanzer" ];
	if (Class.znpAR_bracer) {Class.aydanl_panzer.UPGRADES_TIER_3.push("znpAR_bracer"); forcePush( Class.nailgun, "UPGRADES_TIER_3", "znpAR_bracer" );} else {Class.aydanl_panzer.UPGRADES_TIER_3.push("aydanl_bracer"); forcePush( Class.nailgun, "UPGRADES_TIER_3", "aydanl_bracer" );};
Class.helix.UPGRADES_TIER_3.push( "aydanl_channeler", "aydanl_channeler2" );