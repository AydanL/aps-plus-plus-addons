// An addon is guaranteed to run only after all groups are loaded.
// This is helpful, if your group relies on all other definitions already being loaded.
// Addons that are dependant on other addons should be named something like
// "[PARENT ADDON NAME]-[EXTENSION NAME].js", to make sure that it would run after that addon ran.

const { base, statnames, gunCalcNames, dfltskl, smshskl } = require('../constants.js');
const { combineStats, makeAuto, makeHybrid, makeOver, makeDeco, makeGuard, makeBird, makeMulti } = require('../facilitators.js');
const g = require('../gunvals.js');

module.exports = ({ Class }) => {

	// This addon is enabled by default.
	// You can also disable addons by not making them end with '.js'
	// If you want to disable, simply make the line below run.
	// return console.log('[pentaFinalAddon.js] Addon disabled by default');

	let MAX_CHILDREN = 0,
		GUNS = [],
		TURRETS = [],

	alreadySeen = [],
	next = ['basic'],

	// We don't loop infinitely, because that's a bad idea if someone makes a circular upgrade path.
	// Also, RECURSION BAD. RECURSION BAD. RECURSION BAD. RECURSION BAD. RECURSION BAD. RECURSION BAD.
	limit = 1000;
	while (next.length && limit--) {
		let current = next;
		next = [];
		for (let i = 0; i < current.length; i++) {

			// Handle string definition references
			let now = current[i];
	        if ("string" == typeof now) {
	            if (!(now in Class)) throw Error(`Definition ${now} is attempted to be gotten but does not exist!`);
	            now = Class[now];
	        }

			// Handles tanks with multiple ways to upgrade to them, like Overgunner.
			if (alreadySeen.includes(now.LABEL)) continue;
			alreadySeen.push(now.LABEL);

			// Add guns, turrets and additional max child count to our current list of stuff for our abomination to have.
			if (now.MAX_CHILDREN) MAX_CHILDREN += now.MAX_CHILDREN;
			if (now.GUNS) GUNS.push(...now.GUNS);
			if (now.TURRETS) TURRETS.push(...now.TURRETS);

			// Add upgrades of current tank to next iteration
			for (let key of Object.keys(now)) if (key.startsWith('UPGRADES_TIER_')) next.push(...now[key]);
		}
	}
	
Class.hiverang = {
    PARENT: "boomerang",
    LABEL: "Hiverang",
    BODY: {
        RANGE: 180,
        FOV: 0.5,
    },
    FACING_TYPE: "turnWithSpeed",
    INDEPENDENT: true,
    AI: {
        NO_LEAD: true,
    },
    GUNS: [
        {
            POSITION: [7, 9.5, 0.6, 7, 0, 108, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                TYPE: ["bee", { PERSISTS_AFTER_DEATH: true }],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 9.5, 0.6, 7, 0, 180, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                TYPE: ["bee", { PERSISTS_AFTER_DEATH: true }],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 9.5, 0.6, 7, 0, 252, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                TYPE: ["bee", { PERSISTS_AFTER_DEATH: true }],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 9.5, 0.6, 7, 0, 324, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                TYPE: ["bee", { PERSISTS_AFTER_DEATH: true }],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 9.5, 0.6, 7, 0, 36, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                TYPE: ["bee", { PERSISTS_AFTER_DEATH: true }],
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
}
	
Class.spamTurret = {
    PARENT: "autoTankGun",
    BODY: {
        FOV: 10,
    },
    GUNS: [
        {
            POSITION: [15, 6, 1, 0, 6, 12, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [15, 6, 1, 0, -6, -12, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 6, 1, 0, 4, 8, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.stream, g.pound]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 6, 1, 0, 4, 8, 0.3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.stream, g.pound]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [13, 6, 1, 0, 4, 8, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.stream, g.pound]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [19, 6, 1, 0, -4, -8, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.stream, g.pound]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [16, 6, 1, 0, -4, -8, 0.3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.stream, g.pound]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [13, 6, 1, 0, -4, -8, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.stream, g.pound]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [26, 10, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.stream, g.pound]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [23, 10, 1, 0, 0, 0, 0.2],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.stream, g.pound]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 10, 1, 0, 0, 0, 0.4],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.stream, g.pound]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [17, 10, 1, 0, 0, 0, 0.6],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.stream, g.pound]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [14, 10, 1, 0, 0, 0, 0.8],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.stream, g.pound]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.swoomerTurret = {
    PARENT: "autoTankGun",
	INDEPENDENT: false,
    BODY: {
        FOV: 10,
    },
    GUNS: [
        {
            POSITION: [19, 13, -1.5, 0, 0, 0, 0],
        },
        {
            /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [5, 10, 1, 14, 0, 0, 0],
        },
        {
            POSITION: [6, 10, -1.5, 7, 0, 0, 0],
        },
        {
            POSITION: [2, 10, 1.3, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang, g.destroy, g.destroy]),
                TYPE: "hiverang",
                STAT_CALCULATOR: gunCalcNames.block
            },
        },
    ],
}
	
Class.droneVassal = {
    PARENT: "genericTank",
    LABEL: "Nest Vassal",
    TYPE: "minion",
    DAMAGE_CLASS: 0,
	SHAPE: 5.5,
	SIZE: 50,
	COLOR: "purple",
    MAX_CHILDREN: 20,
    HITS_OWN_TYPE: "hardWithBuffer",
    FACING_TYPE: ["spin", {speed: 0.02}],
    BODY: {
        FOV: 0.5,
        SPEED: 0.8,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        "nearestDifferentMaster",
        "mapAltToFire",
        "minion",
        "canRepel",
        "hangOutNearMaster",
    ],
    GUNS: Array(5).fill().map((_, i) => ({
        POSITION: [3.5, 8.65, 1.2, 8, 0, i * 72, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.destroy]),
            TYPE: "demonchip",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            WAIT_TO_CYCLE: true,
        },
    }))
}
Class.gunVassal = {
    PARENT: "genericTank",
    LABEL: "Nest Vassal",
    TYPE: "minion",
    DAMAGE_CLASS: 0,
	SHAPE: 5.5,
	SIZE: 50,
	COLOR: "purple",
    HITS_OWN_TYPE: "hardWithBuffer",
    FACING_TYPE: ["spin", {speed: 0.02}],
    BODY: {
        FOV: 0.5,
        SPEED: 0.8,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        "nearestDifferentMaster",
        "mapAltToFire",
        "minion",
        "canRepel",
        "hangOutNearMaster",
    ],
    GUNS: Array(5).fill().map((_, i) => ({
        POSITION: [5, 8.65, 1, 8, 0, i * 72, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
            TYPE: "bullet",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            WAIT_TO_CYCLE: true,
        },
    }))
}
Class.turretVassal = {
    PARENT: "genericTank",
    LABEL: "Nest Vassal",
    TYPE: "minion",
    DAMAGE_CLASS: 0,
	SHAPE: 5.5,
	SIZE: 50,
	COLOR: "purple",
    HITS_OWN_TYPE: "hardWithBuffer",
    FACING_TYPE: ["spin", {speed: 0.02}],
    BODY: {
        FOV: 0.5,
        SPEED: 0.8,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        "nearestDifferentMaster",
        "mapAltToFire",
        "minion",
        "canRepel",
        "hangOutNearMaster",
    ],
    TURRETS: Array(5).fill().map((_, i) => ({
        POSITION: [8, 8, 0, 72*i, 120, 0],
        TYPE: "auto4gun",
    }))
}
Class.blockVassal = {
    PARENT: "genericTank",
    LABEL: "Nest Vassal",
    TYPE: "minion",
    DAMAGE_CLASS: 0,
	SHAPE: 5.5,
	SIZE: 50,
	COLOR: "purple",
    HITS_OWN_TYPE: "hardWithBuffer",
    FACING_TYPE: ["spin", {speed: 0.02}],
    BODY: {
        FOV: 0.5,
        SPEED: 0.8,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        "nearestDifferentMaster",
        "mapAltToFire",
        "minion",
        "canRepel",
        "hangOutNearMaster",
    ],
    GUNS: [
		{
			POSITION: [12, 8.65, 1, 0, 0, 0, 0],
		},
		{
			POSITION: [2, 8.65, 1.2, 12, 0, 0, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.destroy]),
				TYPE: "unsetPillbox",
				AUTOFIRE: true,
				SYNCS_SKILLS: true,
				WAIT_TO_CYCLE: true,
			},
		},
		{
			POSITION: [12, 8.65, 1, 0, 0, 72, 0],
		},
		{
			POSITION: [2, 8.65, 1.2, 12, 0, 72, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.destroy]),
				TYPE: "unsetPillbox",
				AUTOFIRE: true,
				SYNCS_SKILLS: true,
				WAIT_TO_CYCLE: true,
			},
		},
		{
			POSITION: [12, 8.65, 1, 0, 0, -72, 0],
		},
		{
			POSITION: [2, 8.65, 1.2, 12, 0, -72, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.destroy]),
				TYPE: "unsetPillbox",
				AUTOFIRE: true,
				SYNCS_SKILLS: true,
				WAIT_TO_CYCLE: true,
			},
		},
		{
			POSITION: [12, 8.65, 1, 0, 0, 144, 0],
		},
		{
			POSITION: [2, 8.65, 1.2, 12, 0, 144, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.destroy]),
				TYPE: "unsetPillbox",
				AUTOFIRE: true,
				SYNCS_SKILLS: true,
				WAIT_TO_CYCLE: true,
			},
		},
		{
			POSITION: [12, 8.65, 1, 0, 0, -144, 0],
		},
		{
			POSITION: [2, 8.65, 1.2, 12, 0, -144, 0],
			PROPERTIES: {
				SHOOT_SETTINGS: combineStats([g.trap, g.pound, g.destroy]),
				TYPE: "unsetPillbox",
				AUTOFIRE: true,
				SYNCS_SKILLS: true,
				WAIT_TO_CYCLE: true,
			},
		},
	],
}
Class.swarmVassal = {
    PARENT: "genericTank",
    LABEL: "Nest Vassal",
    TYPE: "minion",
    DAMAGE_CLASS: 0,
	SHAPE: 5.5,
	SIZE: 50,
	COLOR: "purple",
    HITS_OWN_TYPE: "hardWithBuffer",
    FACING_TYPE: ["spin", {speed: 0.02}],
    BODY: {
        FOV: 0.5,
        SPEED: 0.8,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        "nearestDifferentMaster",
        "mapAltToFire",
        "minion",
        "canRepel",
        "hangOutNearMaster",
    ],
    GUNS: [
        {
            POSITION: [6, 6, 0.6, 7, 3, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [6, 6, 0.6, 7, -3, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [6, 6, 0.6, 7, 3, 72, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [6, 6, 0.6, 7, -3, 72, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [6, 6, 0.6, 7, 3, -72, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [6, 6, 0.6, 7, -3, -72, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [6, 6, 0.6, 7, 3, 144, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [6, 6, 0.6, 7, -3, 144, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [6, 6, 0.6, 7, 3, -144, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [6, 6, 0.6, 7, -3, -144, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
	],
}
	
Class.pentaLordTop = {
    PARENT: ["genericTank"],
    AI: { STRAFE: false, NO_LEAD: false },
    CONTROLLERS: [ ["spin", { independent: false, speed: -0.01 }] ],
	COLOR: "purple",
	SHAPE: 5,
    TURRETS: [
        {
            POSITION: [8, 10, 0, 0, 190, 0],
            TYPE: [ "swoomerTurret", { COLOR: "purple" } ],
        },
        {
            POSITION: [8, 10, 0, 72, 190, 0],
            TYPE: [ "swoomerTurret", { COLOR: "purple" } ],
        },
        {
            POSITION: [8, 10, 0, -72, 190, 0],
            TYPE: [ "swoomerTurret", { COLOR: "purple" } ],
        },
        {
            POSITION: [8, 10, 0, 144, 190, 0],
            TYPE: [ "swoomerTurret", { COLOR: "purple" } ],
        },
        {
            POSITION: [8, 10, 0, -144, 190, 0],
            TYPE: [ "swoomerTurret", { COLOR: "purple" } ],
        },
    ],
    GUNS: [
        {
            POSITION: [3.5, 6.65, 1.2, 9, 0, 36, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.nest_keeper]),
                TYPE: "drone",
                AUTOFIRE: true,
                LABEL: "Mega Crasher",
                STAT_CALCULATOR: gunCalcNames.drone,
				MAX_CHILDREN: 3,
            },
        },
        {
            POSITION: [3.5, 6.65, 1.2, 9, 0, -36, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.nest_keeper]),
                TYPE: "drone",
                AUTOFIRE: true,
                LABEL: "Mega Crasher",
                STAT_CALCULATOR: gunCalcNames.drone,
				MAX_CHILDREN: 3,
            },
        },
        {
            POSITION: [3.5, 6.65, 1.2, 9, 0, 109, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.nest_keeper]),
                TYPE: "drone",
                AUTOFIRE: true,
                LABEL: "Mega Crasher",
                STAT_CALCULATOR: gunCalcNames.drone,
				MAX_CHILDREN: 3,
            },
        },
        {
            POSITION: [3.5, 6.65, 1.2, 9, 0, -109, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.nest_keeper]),
                TYPE: "drone",
                AUTOFIRE: true,
                LABEL: "Mega Crasher",
                STAT_CALCULATOR: gunCalcNames.drone,
				MAX_CHILDREN: 3,
            },
        },
        {
            POSITION: [3.5, 6.65, 1.2, 9, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.nest_keeper]),
                TYPE: "drone",
                AUTOFIRE: true,
                LABEL: "Mega Crasher",
                STAT_CALCULATOR: gunCalcNames.drone,
				MAX_CHILDREN: 3,
            },
        },
    ],

}

Class.pentaLord = {
    PARENT: ["miniboss"],
    LABEL: "Lord of the Nest",
    DANGER: 10,
	COLOR: "purple",
	SHAPE: 5,
	VALUE: 4e6,
	SIZE: 100,
	UPGRADE_COLOR: "purple",
    FACING_TYPE: ["spin", {speed: 0.01}],
    BODY: {
        FOV: 1.5,
        SPEED: 0.1 * base.SPEED,
        HEALTH: 4000,
        DAMAGE: 5 * base.DAMAGE,
    },
	GUNS: [
		{
            POSITION: [12, 6, 1, 0, 0, 36, 0],
		},
		{
            POSITION: [2, 6, 1.3, 12, 0, 36, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.destroy, g.halfreload]),
                TYPE: "unsetTrap",
				AUTOFIRE: true,
            }
		},
		{
            POSITION: [4, 11, 0.8, 7, 0, 36, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.nest_keeper]),
                TYPE: "droneVassal",
                AUTOFIRE: true,
                LABEL: "Nest Vassal",
                STAT_CALCULATOR: gunCalcNames.drone,
				MAX_CHILDREN: 1,
			}
		},
		{
            POSITION: [12, 6, 1, 0, 0, -36, 0],
		},
		{
            POSITION: [2, 6, 1.3, 12, 0, -36, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.destroy, g.halfreload]),
                TYPE: "unsetTrap",
				AUTOFIRE: true,
            }
		},
		{
            POSITION: [4, 11, 0.8, 7, 0, -36, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.nest_keeper]),
                TYPE: "gunVassal",
                AUTOFIRE: true,
                LABEL: "Nest Vassal",
                STAT_CALCULATOR: gunCalcNames.drone,
				MAX_CHILDREN: 1,
			}
		},
		{
            POSITION: [12, 6, 1, 0, 0, 109, 0],
		},
		{
            POSITION: [2, 6, 1.3, 12, 0, 109, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.destroy, g.halfreload]),
                TYPE: "unsetTrap",
				AUTOFIRE: true,
            }
		},
		{
            POSITION: [4, 11, 0.8, 7, 0, 109, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.nest_keeper]),
                TYPE: "turretVassal",
                AUTOFIRE: true,
                LABEL: "Nest Vassal",
                STAT_CALCULATOR: gunCalcNames.drone,
				MAX_CHILDREN: 1,
			}
		},
		{
            POSITION: [12, 6, 1, 0, 0, -109, 0],
		},
		{
            POSITION: [2, 6, 1.3, 12, 0, -109, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.destroy, g.halfreload]),
                TYPE: "unsetTrap",
				AUTOFIRE: true,
            }
		},
		{
            POSITION: [4, 11, 0.8, 7, 0, -109, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.nest_keeper]),
                TYPE: "blockVassal",
                AUTOFIRE: true,
                LABEL: "Nest Vassal",
                STAT_CALCULATOR: gunCalcNames.drone,
				MAX_CHILDREN: 1,
			}
		},
		{
            POSITION: [12, 6, 1, 0, 0, 180, 0],
		},
		{
            POSITION: [2, 6, 1.3, 12, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.destroy, g.halfreload]),
                TYPE: "unsetTrap",
				AUTOFIRE: true,
            }
		},
		{
            POSITION: [4, 11, 0.8, 7, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.nest_keeper]),
                TYPE: "swarmVassal",
                AUTOFIRE: true,
                LABEL: "Nest Vassal",
                STAT_CALCULATOR: gunCalcNames.drone,
				MAX_CHILDREN: 1,
			}
		},
	],
    TURRETS: [
        {
            POSITION: [7, 9, 0, 0, 110, 0],
            TYPE: [ "spamTurret", { COLOR: "purple" } ],
        },
        {
            POSITION: [7, 9, 0, 72, 110, 0],
            TYPE: [ "spamTurret", { COLOR: "purple" } ],
        },
        {
            POSITION: [7, 9, 0, -72, 110, 0],
            TYPE: [ "spamTurret", { COLOR: "purple" } ],
        },
        {
            POSITION: [7, 9, 0, 144, 110, 0],
            TYPE: [ "spamTurret", { COLOR: "purple" } ],
        },
        {
            POSITION: [7, 9, 0, -144, 110, 0],
            TYPE: [ "spamTurret", { COLOR: "purple" } ],
        },
        {
            POSITION: [14, 0, 0, 0, 360, 1],
            TYPE: "pentaLordTop",
        },
    ],
}
	
	Class.bosses.UPGRADES_TIER_0.push("pentaLord");

	console.log('[pentaFinalBoss.js] Final pentagon loaded');
};
