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
	// return console.log('[coolSpawnersAddon.js] Addon disabled by default');

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

	// MINIONS DEFINITIONS
	Class.twinMinion = {
		PARENT: ["genericTank"],
		LABEL: "Twin Minion",
		TYPE: "minion",
		DAMAGE_CLASS: 0,
		HITS_OWN_TYPE: "hardWithBuffer",
		FACING_TYPE: "smoothToTarget",
		BODY: {
			FOV: 0.5,
			SPEED: 3,
			ACCELERATION: 0.4,
			HEALTH: 5,
			SHIELD: 0,
			DAMAGE: 1.2,
			RESIST: 1,
			PENETRATION: 1,
			DENSITY: 0.4,
			RECOIL_MULTIPLIER: 0.3,
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
				POSITION: [17, 7, 1, 0, 5, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
			{
				POSITION: [17, 7, 1, 0, -5, 0, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
		],
	};
	Class.flankMinion = {
		PARENT: ["genericTank"],
		LABEL: "Flank guard Minion",
		TYPE: "minion",
		DAMAGE_CLASS: 0,
		HITS_OWN_TYPE: "hardWithBuffer",
		FACING_TYPE: "smoothToTarget",
		BODY: {
			FOV: 0.5,
			SPEED: 3,
			ACCELERATION: 0.4,
			HEALTH: 5,
			SHIELD: 0,
			DAMAGE: 1.2,
			RESIST: 1,
			PENETRATION: 1,
			DENSITY: 0.4,
			RECOIL_MULTIPLIER: 0.3,
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
				POSITION: [17, 9, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
			{
				POSITION: [17, 9, 1, 0, 0, 120, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
			{
				POSITION: [17, 9, 1, 0, 0, -120, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
		],
	};
	Class.machineMinion = {
		PARENT: ["genericTank"],
		LABEL: "Machine Gun Minion",
		TYPE: "minion",
		DAMAGE_CLASS: 0,
		HITS_OWN_TYPE: "hardWithBuffer",
		FACING_TYPE: "smoothToTarget",
		BODY: {
			FOV: 0.5,
			SPEED: 3,
			ACCELERATION: 0.4,
			HEALTH: 5,
			SHIELD: 0,
			DAMAGE: 1.2,
			RESIST: 1,
			PENETRATION: 1,
			DENSITY: 0.4,
			RECOIL_MULTIPLIER: 0.2,
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
				POSITION: [17, 9, 1.5, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
		],
	};
	Class.trapperMinion = {
		PARENT: ["genericTank"],
		LABEL: "Trapper Minion",
		TYPE: "minion",
		DAMAGE_CLASS: 0,
		HITS_OWN_TYPE: "hardWithBuffer",
		FACING_TYPE: "smoothToTarget",
		BODY: {
			FOV: 0.5,
			SPEED: 3,
			ACCELERATION: 0.4,
			HEALTH: 5,
			SHIELD: 0,
			DAMAGE: 1.2,
			RESIST: 1,
			PENETRATION: 1,
			DENSITY: 0.4,
			RECOIL_MULTIPLIER: 0.2,
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
				POSITION: [15, 9, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [4, 9, 1.7, 15, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
		],
	};
	Class.directorMinion = {
		PARENT: ["genericTank"],
		LABEL: "Director Minion",
		TYPE: "minion",
		DAMAGE_CLASS: 0,
		HITS_OWN_TYPE: "hardWithBuffer",
		FACING_TYPE: "smoothToTarget",
		BODY: {
			FOV: 0.5,
			SPEED: 3,
			ACCELERATION: 0.4,
			HEALTH: 5,
			SHIELD: 0,
			DAMAGE: 1.2,
			RESIST: 1,
			PENETRATION: 1,
			DENSITY: 0.4,
			RECOIL_MULTIPLIER: 0.2,
		},
		AI: {
			BLIND: true,
		},
		DRAW_HEALTH: false,
		CLEAR_ON_MASTER_UPGRADE: true,
		GIVE_KILL_MESSAGE: false,
		MAX_CHILDREN: 4,
		CONTROLLERS: [
			"nearestDifferentMaster",
			"mapAltToFire",
			"minion",
			"canRepel",
			"hangOutNearMaster",
		],
		GUNS: [
			{
				POSITION: [13, 9, 1.3, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "drone",
					STAT_CALCULATOR: gunCalcNames.drone,
				},
			},
		],
	};
	Class.sniperMinion = {
		PARENT: ["genericTank"],
		LABEL: "Sniper Minion",
		TYPE: "minion",
		DAMAGE_CLASS: 0,
		HITS_OWN_TYPE: "hardWithBuffer",
		FACING_TYPE: "smoothToTarget",
		BODY: {
			FOV: 0.5,
			SPEED: 3,
			ACCELERATION: 0.4,
			HEALTH: 5,
			SHIELD: 0,
			DAMAGE: 1.2,
			RESIST: 1,
			PENETRATION: 1,
			DENSITY: 0.4,
			RECOIL_MULTIPLIER: 0.2,
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
				POSITION: [20, 9, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
		],
	};
	
	// ARMS RACE MINIONS
	Class.bentMinion = {
		PARENT: ["genericTank"],
		LABEL: "Bent Minion",
		TYPE: "minion",
		DAMAGE_CLASS: 0,
		HITS_OWN_TYPE: "hardWithBuffer",
		FACING_TYPE: "smoothToTarget",
		BODY: {
			FOV: 0.5,
			SPEED: 3,
			ACCELERATION: 0.4,
			HEALTH: 5,
			SHIELD: 0,
			DAMAGE: 1.2,
			RESIST: 1,
			PENETRATION: 1,
			DENSITY: 0.4,
			RECOIL_MULTIPLIER: 0.3,
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
				POSITION: [17, 7, 1, 0, 3, 20, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.bent, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
			{
				POSITION: [17, 7, 1, 0, -3, -20, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.bent, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
			{
				POSITION: [19, 7, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.bent, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
		],
	};
	Class.gunMinion = {
		PARENT: ["genericTank"],
		LABEL: "Gunner Minion",
		TYPE: "minion",
		DAMAGE_CLASS: 0,
		HITS_OWN_TYPE: "hardWithBuffer",
		FACING_TYPE: "smoothToTarget",
		BODY: {
			FOV: 0.5,
			SPEED: 3,
			ACCELERATION: 0.4,
			HEALTH: 5,
			SHIELD: 0,
			DAMAGE: 1.2,
			RESIST: 1,
			PENETRATION: 1,
			DENSITY: 0.4,
			RECOIL_MULTIPLIER: 0.3,
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
				POSITION: [13, 3, 1, 0, 7, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
			{
				POSITION: [13, 3, 1, 0, -7, 0, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
			{
				POSITION: [17, 3, 1, 0, 4, 0, 0.25],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
			{
				POSITION: [17, 3, 1, 0, -4, 0, 0.75],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
		],
	};
	Class.doubleMinion = {
		PARENT: ["genericTank"],
		LABEL: "Double Twin Minion",
		TYPE: "minion",
		DAMAGE_CLASS: 0,
		HITS_OWN_TYPE: "hardWithBuffer",
		FACING_TYPE: "smoothToTarget",
		BODY: {
			FOV: 0.5,
			SPEED: 3,
			ACCELERATION: 0.4,
			HEALTH: 5,
			SHIELD: 0,
			DAMAGE: 1.2,
			RESIST: 1,
			PENETRATION: 1,
			DENSITY: 0.4,
			RECOIL_MULTIPLIER: 0.3,
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
				POSITION: [17, 7, 1, 0, 5, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
			{
				POSITION: [17, 7, 1, 0, -5, 0, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
			{
				POSITION: [17, 7, 1, 0, 5, 180, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
			{
				POSITION: [17, 7, 1, 0, -5, 180, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
		],
	};
	Class.hexaMinion = {
		PARENT: ["genericTank"],
		LABEL: "Hexa Minion",
		TYPE: "minion",
		DAMAGE_CLASS: 0,
		HITS_OWN_TYPE: "hardWithBuffer",
		FACING_TYPE: "smoothToTarget",
		BODY: {
			FOV: 0.5,
			SPEED: 3,
			ACCELERATION: 0.4,
			HEALTH: 5,
			SHIELD: 0,
			DAMAGE: 1.2,
			RESIST: 1,
			PENETRATION: 1,
			DENSITY: 0.4,
			RECOIL_MULTIPLIER: 0.3,
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
				POSITION: [17, 9, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
			{
				POSITION: [17, 9, 1, 0, 0, 120, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
			{
				POSITION: [17, 9, 1, 0, 0, -120, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
			{
				POSITION: [17, 9, 1, 0, 0, 60, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
			{
				POSITION: [17, 9, 1, 0, 0, -60, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
			{
				POSITION: [17, 9, 1, 0, 0, 180, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
		],
	};
	Class.triMinion = {
		PARENT: ["genericTank"],
		LABEL: "Tri-angle Minion",
		TYPE: "minion",
		DAMAGE_CLASS: 0,
		HITS_OWN_TYPE: "hardWithBuffer",
		FACING_TYPE: "smoothToTarget",
		BODY: {
			FOV: 0.5,
			SPEED: 3,
			ACCELERATION: 0.4,
			HEALTH: 5,
			SHIELD: 0,
			DAMAGE: 1.2,
			RESIST: 1,
			PENETRATION: 1,
			DENSITY: 0.4,
			RECOIL_MULTIPLIER: 0.3,
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
				POSITION: [17, 9, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
			{
				POSITION: [13, 9, 1, 0, 0, 150, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
			{
				POSITION: [13, 9, 1, 0, 0, -150, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
		],
	};
	Class.auto3Minion = {
		PARENT: ["genericTank"],
		LABEL: "Auto-3 Minion",
		TYPE: "minion",
		DAMAGE_CLASS: 0,
		HITS_OWN_TYPE: "hardWithBuffer",
		FACING_TYPE: "spin",
		BODY: {
			FOV: 0.5,
			SPEED: 3,
			ACCELERATION: 0.4,
			HEALTH: 5,
			SHIELD: 0,
			DAMAGE: 1.2,
			RESIST: 1,
			PENETRATION: 1,
			DENSITY: 0.4,
			RECOIL_MULTIPLIER: 0,
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
		TURRETS: [
			{
				POSITION: [11, 8, 0, 0, 190, 0],
				TYPE: "autoTankGun",
			},
			{
				POSITION: [11, 8, 0, 120, 190, 0],
				TYPE: "autoTankGun",
			},
			{
				POSITION: [11, 8, 0, 240, 190, 0],
				TYPE: "autoTankGun",
			},
		],
	};
	Class.sprayMinion = {
		PARENT: ["genericTank"],
		LABEL: "Sprayer Minion",
		TYPE: "minion",
		DAMAGE_CLASS: 0,
		HITS_OWN_TYPE: "hardWithBuffer",
		FACING_TYPE: "smoothToTarget",
		BODY: {
			FOV: 0.5,
			SPEED: 3,
			ACCELERATION: 0.4,
			HEALTH: 5,
			SHIELD: 0,
			DAMAGE: 1.2,
			RESIST: 1,
			PENETRATION: 1,
			DENSITY: 0.4,
			RECOIL_MULTIPLIER: 0.2,
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
				POSITION: [20, 9, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
			{
				POSITION: [17, 9, 1.5, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
		],
	};
	Class.triTrapMinion = {
		PARENT: ["genericTank"],
		LABEL: "Tri-trapper Minion",
		TYPE: "minion",
		DAMAGE_CLASS: 0,
		HITS_OWN_TYPE: "hardWithBuffer",
		FACING_TYPE: "smoothToTarget",
		BODY: {
			FOV: 0.5,
			SPEED: 3,
			ACCELERATION: 0.4,
			HEALTH: 5,
			SHIELD: 0,
			DAMAGE: 1.2,
			RESIST: 1,
			PENETRATION: 1,
			DENSITY: 0.4,
			RECOIL_MULTIPLIER: 0.2,
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
				POSITION: [15, 9, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [4, 9, 1.7, 15, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
			{
				POSITION: [15, 9, 1, 0, 0, 120, 0],
			},
			{
				POSITION: [4, 9, 1.7, 15, 0, 120, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
			{
				POSITION: [15, 9, 1, 0, 0, 240, 0],
			},
			{
				POSITION: [4, 9, 1.7, 15, 0, 240, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
		],
	};
	Class.buildMinion = {
		PARENT: ["genericTank"],
		LABEL: "Builder Minion",
		TYPE: "minion",
		DAMAGE_CLASS: 0,
		HITS_OWN_TYPE: "hardWithBuffer",
		FACING_TYPE: "smoothToTarget",
		BODY: {
			FOV: 0.5,
			SPEED: 3,
			ACCELERATION: 0.4,
			HEALTH: 5,
			SHIELD: 0,
			DAMAGE: 1.2,
			RESIST: 1,
			PENETRATION: 1,
			DENSITY: 0.4,
			RECOIL_MULTIPLIER: 0.2,
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
				POSITION: [17, 12, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [3, 12, 1.1, 17, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.block, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "setTrap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
		],
	};
	Class.machTrapMinion = {
		PARENT: ["genericTank"],
		LABEL: "Machine Trapper Minion",
		TYPE: "minion",
		DAMAGE_CLASS: 0,
		HITS_OWN_TYPE: "hardWithBuffer",
		FACING_TYPE: "smoothToTarget",
		BODY: {
			FOV: 0.5,
			SPEED: 3,
			ACCELERATION: 0.4,
			HEALTH: 5,
			SHIELD: 0,
			DAMAGE: 1.2,
			RESIST: 1,
			PENETRATION: 1,
			DENSITY: 0.4,
			RECOIL_MULTIPLIER: 0.2,
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
				POSITION: [15, 9, 1.5, 0, 0, 0, 0],
			},
			{
				POSITION: [3, 13, 1.2, 15, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "trap",
					STAT_CALCULATOR: gunCalcNames.trap,
				},
			},
		],
	};
	Class.overMinion = {
		PARENT: ["genericTank"],
		LABEL: "Overseer Minion",
		TYPE: "minion",
		DAMAGE_CLASS: 0,
		HITS_OWN_TYPE: "hardWithBuffer",
		FACING_TYPE: "smoothToTarget",
		BODY: {
			FOV: 0.5,
			SPEED: 3,
			ACCELERATION: 0.4,
			HEALTH: 5,
			SHIELD: 0,
			DAMAGE: 1.2,
			RESIST: 1,
			PENETRATION: 1,
			DENSITY: 0.4,
			RECOIL_MULTIPLIER: 0.2,
		},
		AI: {
			BLIND: true,
		},
		DRAW_HEALTH: false,
		CLEAR_ON_MASTER_UPGRADE: true,
		GIVE_KILL_MESSAGE: false,
		MAX_CHILDREN: 6,
		CONTROLLERS: [
			"nearestDifferentMaster",
			"mapAltToFire",
			"minion",
			"canRepel",
			"hangOutNearMaster",
		],
		GUNS: [
			{
				POSITION: [13, 9, 1.3, 0, 0, 90, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "drone",
					STAT_CALCULATOR: gunCalcNames.drone,
				},
			},
			{
				POSITION: [13, 9, 1.3, 0, 0, 270, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "drone",
					STAT_CALCULATOR: gunCalcNames.drone,
				},
			},
		],
	};
	Class.spawnMinion = {
		PARENT: ["genericTank"],
		LABEL: "Spawner Minion",
		TYPE: "minion",
		DAMAGE_CLASS: 0,
		HITS_OWN_TYPE: "hardWithBuffer",
		FACING_TYPE: "smoothToTarget",
		BODY: {
			FOV: 0.5,
			SPEED: 3,
			ACCELERATION: 0.4,
			HEALTH: 5,
			SHIELD: 0,
			DAMAGE: 1.2,
			RESIST: 1,
			PENETRATION: 1,
			DENSITY: 0.4,
			RECOIL_MULTIPLIER: 0.2,
		},
		AI: {
			BLIND: true,
		},
		DRAW_HEALTH: false,
		CLEAR_ON_MASTER_UPGRADE: true,
		GIVE_KILL_MESSAGE: false,
		MAX_CHILDREN: 2,
		CONTROLLERS: [
			"nearestDifferentMaster",
			"mapAltToFire",
			"minion",
			"canRepel",
			"hangOutNearMaster",
		],
		GUNS: [
			{
				POSITION: [15, 9, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [2, 14, 1, 15, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.drone, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "minionMinion",
					STAT_CALCULATOR: gunCalcNames.drone,
				},
			},
		],
	};
	Class.minionMinion = {
		PARENT: ["genericTank"],
		LABEL: "Minion Minion",
		TYPE: "minion",
		DAMAGE_CLASS: 0,
		HITS_OWN_TYPE: "hardWithBuffer",
		FACING_TYPE: "smoothToTarget",
		BODY: {
			FOV: 0.5,
			SPEED: 3,
			ACCELERATION: 0.4,
			HEALTH: 5,
			SHIELD: 0,
			DAMAGE: 1.2,
			RESIST: 1,
			PENETRATION: 1,
			DENSITY: 0.4,
			RECOIL_MULTIPLIER: 0,
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
				POSITION: [17, 9, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
		],
	};
	Class.cruiserMinion = {
		PARENT: ["genericTank"],
		LABEL: "Cruiser Minion",
		TYPE: "minion",
		DAMAGE_CLASS: 0,
		HITS_OWN_TYPE: "hardWithBuffer",
		FACING_TYPE: "smoothToTarget",
		BODY: {
			FOV: 0.5,
			SPEED: 3,
			ACCELERATION: 0.4,
			HEALTH: 5,
			SHIELD: 0,
			DAMAGE: 1.2,
			RESIST: 1,
			PENETRATION: 1,
			DENSITY: 0.4,
			RECOIL_MULTIPLIER: 0.2,
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
				POSITION: [17, 10, 0.5, 0, 5, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.swarm, g.minion, g.halfrange]),
					WAIT_TO_CYCLE: true,
					TYPE: "swarm",
				},
			},
			{
				POSITION: [17, 10, 0.5, 0, -5, 0, 0.5],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.swarm, g.minion, g.halfrange]),
					WAIT_TO_CYCLE: true,
					TYPE: "swarm",
				},
			},
		],
	};
	Class.assassMinion = {
		PARENT: ["genericTank"],
		LABEL: "Assassin Minion",
		TYPE: "minion",
		DAMAGE_CLASS: 0,
		HITS_OWN_TYPE: "hardWithBuffer",
		FACING_TYPE: "smoothToTarget",
		BODY: {
			FOV: 0.5,
			SPEED: 3,
			ACCELERATION: 0.4,
			HEALTH: 5,
			SHIELD: 0,
			DAMAGE: 1.2,
			RESIST: 1,
			PENETRATION: 1,
			DENSITY: 0.4,
			RECOIL_MULTIPLIER: 0.2,
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
				POSITION: [23, 9, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.assass, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
			{
				POSITION: [3, 12, 0.75, 10, 0, 0, 0],
			},
		],
	};
	Class.huntMinion = {
		PARENT: ["genericTank"],
		LABEL: "Hunter Minion",
		TYPE: "minion",
		DAMAGE_CLASS: 0,
		HITS_OWN_TYPE: "hardWithBuffer",
		FACING_TYPE: "smoothToTarget",
		BODY: {
			FOV: 0.5,
			SPEED: 3,
			ACCELERATION: 0.4,
			HEALTH: 5,
			SHIELD: 0,
			DAMAGE: 1.2,
			RESIST: 1,
			PENETRATION: 1,
			DENSITY: 0.4,
			RECOIL_MULTIPLIER: 0.2,
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
				POSITION: [20, 6, 1, 0, 0, 0, 0],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.hunter, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
			{
				POSITION: [17, 9, 1, 0, 0, 0, 0.1],
				PROPERTIES: {
					SHOOT_SETTINGS: combineStats([g.basic, g.hunter, g.minion]),
					WAIT_TO_CYCLE: true,
					TYPE: "bullet",
				},
			},
		],
	};

	// TANKS DEFINITIONS
	// SPAWNER UPGRADES (BASE GAME)
	Class.twinMaker = {
		PARENT: ["genericTank"],
		LABEL: "Generator",
		DANGER: 6,
		STAT_NAMES: statnames.drone,
		BODY: {
			SPEED: base.SPEED * 0.8,
			FOV: 1.1,
		},
		GUNS: [
			{
				/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [4.5, 3.7, 1, 10.5, 2.5, 0, 0],
			},
			{
				POSITION: [4.5, 3.7, 1, 10.5, -2.5, 0, 0],
			},
			{
				POSITION: [11.5, 12, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [1, 12, 1, 15, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 4,
					SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
					TYPE: "twinMinion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
				},
			},
		],
	};
	Class.flankMaker = {
		PARENT: ["genericTank"],
		LABEL: "Press",
		DANGER: 6,
		STAT_NAMES: statnames.drone,
		BODY: {
			SPEED: base.SPEED * 0.8,
			FOV: 1.1,
		},
		GUNS: [
			{
				/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [4.5, 10, 1, 10.5, 0, 0, 0],
			},
			{
				POSITION: [11.5, 12, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [4.5, 8, 0.5, 10.5, 0, 0, 0],
			},
			{
				POSITION: [1, 12, 1, 15, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 4,
					SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
					TYPE: "flankMinion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
				},
			},
		],
	};
	Class.machineMaker = {
		PARENT: ["genericTank"],
		LABEL: "Metalworker",
		DANGER: 6,
		STAT_NAMES: statnames.drone,
		BODY: {
			SPEED: base.SPEED * 0.8,
			FOV: 1.1,
		},
		GUNS: [
			{
				/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [4.5, 10, 1, 10.5, 0, 0, 0],
			},
			{
				POSITION: [11.5, 12, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [4.5, 6, 1.5, 10.5, 0, 0, 0],
			},
			{
				POSITION: [1, 12, 1, 15, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 4,
					SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
					TYPE: "machineMinion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
				},
			},
		],
	};
	Class.trapMaker = {
		PARENT: ["genericTank"],
		LABEL: "Installer",
		DANGER: 6,
		STAT_NAMES: statnames.drone,
		BODY: {
			SPEED: base.SPEED * 0.8,
			FOV: 1.1,
		},
		GUNS: [
			{
				/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [4.5, 10, 1, 10.5, 0, 0, 0],
			},
			{
				POSITION: [11.5, 12, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [2, 8, 1.5, 10.5, 0, 0, 0],
			},
			{
				POSITION: [1, 12, 1, 15, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 3,
					SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
					TYPE: "trapperMinion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
				},
			},
		],
	};
	Class.directorMaker = {
		PARENT: ["genericTank"],
		LABEL: "Hirer",
		DANGER: 6,
		STAT_NAMES: statnames.drone,
		BODY: {
			SPEED: base.SPEED * 0.8,
			FOV: 1.1,
		},
		GUNS: [
			{
				/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [4.5, 10, 1, 10.5, 0, 0, 0],
			},
			{
				POSITION: [11.5, 12, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [1, 12, 1, 15, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 3,
					SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
					TYPE: "directorMinion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
				},
			},
			{
				POSITION: [1, 4, 1.3, 15, 0, 0, 0],
			},
		],
	};
	Class.sniperMaker = {
		PARENT: ["genericTank"],
		LABEL: "Elitist",
		DANGER: 6,
		STAT_NAMES: statnames.drone,
		BODY: {
			SPEED: base.SPEED * 0.8,
			FOV: 1.1,
		},
		GUNS: [
			{
				/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [6.5, 10, 1, 10.5, 0, 0, 0],
			},
			{
				POSITION: [13.5, 12, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [1, 12, 1, 17, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 4,
					SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
					TYPE: "sniperMinion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
				},
			},
		],
	};
	// ARMS RACE UPGRADES
	Class.bentMaker = {
		PARENT: ["genericTank"],
		LABEL: "Producer",
		DANGER: 6,
		STAT_NAMES: statnames.drone,
		BODY: {
			SPEED: base.SPEED * 0.8,
			FOV: 1.1,
		},
		GUNS: [
			{
				/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [4.5, 3.7, 1, 10.5, 2.5, 0, 0],
			},
			{
				POSITION: [4.5, 3.7, 1, 10.5, -2.5, 0, 0],
			},
			{
				POSITION: [4.5, 3.7, 1, 10.5, 0, 0, 0],
			},
			{
				POSITION: [11.5, 12, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [1, 12, 1, 15, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 4,
					SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
					TYPE: "bentMinion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
				},
			},
		],
	};
	Class.gunMaker = {
		PARENT: ["genericTank"],
		LABEL: "RTG",
		DANGER: 6,
		STAT_NAMES: statnames.drone,
		BODY: {
			SPEED: base.SPEED * 0.8,
			FOV: 1.1,
		},
		GUNS: [
			{
				/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [4.5, 3.7, 1, 10.5, 2.5, 0, 0],
			},
			{
				POSITION: [4.5, 3.7, 1, 10.5, -2.5, 0, 0],
			},
			{
				POSITION: [4.5, 2.3, 1, 10.5, 1.5, 0, 0],
			},
			{
				POSITION: [4.5, 2.3, 1, 10.5, -1.5, 0, 0],
			},
			{
				POSITION: [11.5, 12, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [1, 12, 1, 15, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 4,
					SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
					TYPE: "gunMinion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
				},
			},
		],
	};
	Class.sprayMaker = {
		PARENT: ["genericTank"],
		LABEL: "Steelworker",
		DANGER: 6,
		STAT_NAMES: statnames.drone,
		BODY: {
			SPEED: base.SPEED * 0.8,
			FOV: 1.1,
		},
		GUNS: [
			{
				/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [4.5, 10, 1, 10.5, 0, 0, 0],
			},
			{
				POSITION: [11.5, 12, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [4.5, 6, 1.5, 10.5, 0, 0, 0],
			},
			{
				POSITION: [4.5, 4, 1, 10.5, 0, 0, 0],
			},
			{
				POSITION: [1, 12, 1, 15, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 4,
					SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
					TYPE: "sprayMinion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
				},
			},
		],
	};	
	Class.doubleMaker = {
		PARENT: ["genericTank"],
		LABEL: "Alimenter",
		DANGER: 6,
		STAT_NAMES: statnames.drone,
		BODY: {
			SPEED: base.SPEED * 0.8,
			FOV: 1.1,
		},
		GUNS: [
			{
				/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [4.5, 3.7, 1, 10.5, 2.5, 0, 0],
			},
			{
				POSITION: [4.5, 3.7, 1, 10.5, -2.5, 0, 0],
			},
			{
				POSITION: [11.5, 5.5, 1, 0, 3.2, 0, 0],
			},
			{
				POSITION: [11.5, 5.5, 1, 0, -3.2, 0, 0],
			},
			{
				POSITION: [1, 12, 1, 15, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 4,
					SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
					TYPE: "doubleMinion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
				},
			},
		],
	};
	Class.hexaMaker = {
		PARENT: ["genericTank"],
		LABEL: "Compressor",
		DANGER: 6,
		STAT_NAMES: statnames.drone,
		BODY: {
			SPEED: base.SPEED * 0.8,
			FOV: 1.1,
		},
		GUNS: [
			{
				/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [4.5, 10, 1, 10.5, 0, 0, 0],
			},
			{
				POSITION: [11.5, 12, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [4.5, 8, 0.5, 10.5, 0, 0, 0],
			},
			{
				POSITION: [4.5, 4, 0.5, 10.5, 0, 0, 0],
			},
			{
				POSITION: [1, 12, 1, 15, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 3,
					SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
					TYPE: "hexaMinion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
				},
			},
		],
	};
	Class.triMaker = {
		PARENT: ["genericTank"],
		LABEL: "Missionary",
		DANGER: 6,
		STAT_NAMES: statnames.drone,
		BODY: {
			SPEED: base.SPEED * 0.8,
			FOV: 1.1,
		},
		GUNS: [
			{
				/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [4.5, 10, 1, 10.5, 0, 0, 0],
			},
			{
				POSITION: [11.5, 12, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [4.5, 8, 0.1, 10.5, 0, 0, 0],
			},
			{
				POSITION: [1, 12, 1, 15, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 4,
					SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
					TYPE: "triMinion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
				},
			},
		],
	};
	Class.auto3Maker = {
		PARENT: ["genericTank"],
		LABEL: "Compactor",
		DANGER: 6,
		STAT_NAMES: statnames.drone,
		BODY: {
			SPEED: base.SPEED * 0.8,
			FOV: 1.1,
		},
		GUNS: [
			{
				/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [4.5, 10, 1, 10.5, 0, 0, 0],
			},
			{
				POSITION: [11.5, 12, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [3.5, 4, 0.1, 12.5, 0, 0, 0],
			},
			{
				POSITION: [1, 12, 1, 15, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 4,
					SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
					TYPE: "auto3Minion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
				},
			},
		],
	};
	Class.triTrapMaker = {
		PARENT: ["genericTank"],
		LABEL: "Updater",
		DANGER: 6,
		STAT_NAMES: statnames.drone,
		BODY: {
			SPEED: base.SPEED * 0.8,
			FOV: 1.1,
		},
		GUNS: [
			{
				/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [4.5, 10, 1, 10.5, 0, 0, 0],
			},
			{
				POSITION: [11.5, 12, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [2, 8, 1.5, 10.5, 0, 0, 0],
			},
						{
				POSITION: [2, 2, 4, 10.5, 0, 0, 0],
			},
			{
				POSITION: [1, 12, 1, 15, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 3,
					SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
					TYPE: "triTrapMinion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
				},
			},
		],
	};
	Class.buildMaker = {
		PARENT: ["genericTank"],
		LABEL: "Configurer",
		DANGER: 6,
		STAT_NAMES: statnames.drone,
		BODY: {
			SPEED: base.SPEED * 0.8,
			FOV: 1.1,
		},
		GUNS: [
			{
				/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [4.5, 10, 1, 10.5, 0, 0, 0],
			},
			{
				POSITION: [11.5, 12, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [2, 8, 1.5, 10.5, 0, 0, 0],
			},
						{
				POSITION: [2, 8, 0.5, 10.5, 0, 0, 0],
			},
			{
				POSITION: [1, 12, 1, 15, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 3,
					SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
					TYPE: "buildMinion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
				},
			},
		],
	};
	Class.machTrapMaker = {
		PARENT: ["genericTank"],
		LABEL: "Downloader",
		DANGER: 6,
		STAT_NAMES: statnames.drone,
		BODY: {
			SPEED: base.SPEED * 0.8,
			FOV: 1.1,
		},
		GUNS: [
			{
				/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [4.5, 10, 1, 10.5, 0, 0, 0],
			},
			{
				POSITION: [11.5, 12, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [2, 8, 1.5, 10.5, 0, 0, 0],
			},
			{
				POSITION: [4.5, 6, 1.5, 10.5, 0, 0, 0],
			},
			{
				POSITION: [1, 12, 1, 15, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 3,
					SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
					TYPE: "machTrapMinion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
				},
			},
		],
	};
	Class.overMaker = {
		PARENT: ["genericTank"],
		LABEL: "Delegator",
		DANGER: 6,
		STAT_NAMES: statnames.drone,
		BODY: {
			SPEED: base.SPEED * 0.8,
			FOV: 1.1,
		},
		GUNS: [
			{
				/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [4.5, 10, 1, 10.5, 0, 0, 0],
			},
			{
				POSITION: [11.5, 12, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [1, 8, 1.2, 10.5, 0, 0, 0],
			},
			{
				POSITION: [1, 4, 1.2, 10.5, 0, 0, 0],
			},
			{
				POSITION: [1, 12, 1, 15, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 3,
					SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
					TYPE: "overMinion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
				},
			},
		],
	};
	Class.spawnMaker = {
		PARENT: ["genericTank"],
		LABEL: "Delegator",
		DANGER: 6,
		STAT_NAMES: statnames.drone,
		BODY: {
			SPEED: base.SPEED * 0.8,
			FOV: 1.1,
		},
		GUNS: [
			{
				/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [4.5, 10, 1, 10.5, 0, 0, 0],
			},
			{
				POSITION: [11.5, 12, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [1, 12, 1, 15, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 3,
					SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
					TYPE: "spawnMinion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
				},
			},
			{
				POSITION: [1, 2, 1, 15, 0, 0, 0],
			},
		],
	};
	Class.cruiserMaker = {
		PARENT: ["genericTank"],
		LABEL: "Mitigator",
		DANGER: 6,
		STAT_NAMES: statnames.drone,
		BODY: {
			SPEED: base.SPEED * 0.8,
			FOV: 1.1,
		},
		GUNS: [
			{
				/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [4.5, 10, 1, 10.5, 0, 0, 0],
			},
			{
				POSITION: [11.5, 12, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [1, 12, 1, 15, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 3,
					SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
					TYPE: "cruiserMinion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
				},
			},
			{
				POSITION: [1, 2, 0, 15, 0, 0, 0],
			},
		],
	};
	Class.assassMaker = {
		PARENT: ["genericTank"],
		LABEL: "Royalist",
		DANGER: 6,
		STAT_NAMES: statnames.drone,
		BODY: {
			SPEED: base.SPEED * 0.8,
			FOV: 1.1,
		},
		GUNS: [
			{
				/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [8.5, 10, 1, 10.5, 0, 0, 0],
			},
			{
				POSITION: [15.5, 12, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [1, 12, 1, 19, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 4,
					SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
					TYPE: "assassMinion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
				},
			},
						{
				POSITION: [12, 18, 2/3, 0, 0, 0, 0],
			},
		],
	};
	Class.huntMaker = {
		PARENT: ["genericTank"],
		LABEL: "Communist",
		DANGER: 6,
		CONTROLLERS: ["zoom"],
		TOOLTIP: "Hold right click to zoom.",
		STAT_NAMES: statnames.drone,
		BODY: {
			SPEED: base.SPEED * 0.8,
			FOV: 1.1,
		},
		GUNS: [
			{
				/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [8.5, 10, 1, 10.5, 0, 0, 0],
			},
			{
				POSITION: [15.5, 12, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [1, 12, 1, 19, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 4,
					SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
					TYPE: "huntMinion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
				},
			},
						{
				POSITION: [12, 14, 1, 0, 0, 0, 0],
			},
		],
	};

	// ARMS RACE AUTO-SPAWNERS
	Class.autoTwinMaker = makeAuto(Class.twinMaker);
	Class.autoFlankMaker = makeAuto(Class.flankMaker);
	Class.autoMachineMaker = makeAuto(Class.machineMaker);
	Class.autoTrapMaker = makeAuto(Class.trapMaker);
	Class.autoDirectorMaker = makeAuto(Class.directorMaker);
	Class.autoSniperMaker = makeAuto(Class.sniperMaker);
	
	// ARMS RACE FACTORIES
	Class.twinFactory = {
		PARENT: ["genericTank"],
		LABEL: "Alternator",
		DANGER: 6,
		STAT_NAMES: statnames.drone,
		BODY: {
			SPEED: base.SPEED * 0.8,
			FOV: 1.1,
		},
		GUNS: [
			{
				/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [5, 5, 1, 10.5, 3, 0, 0],
			},
			{
				POSITION: [5, 5, 1, 10.5, -3, 0, 0],
			},
			{
				POSITION: [12, 14, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [2, 14, 1, 15.5, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 6,
					SHOOT_SETTINGS: combineStats([g.factory]),
					TYPE: "twinMinion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
				},
			},
		],
	};
	Class.flankFactory = {
		PARENT: ["genericTank"],
		LABEL: "Pressurizer",
		DANGER: 6,
		STAT_NAMES: statnames.drone,
		BODY: {
			SPEED: base.SPEED * 0.8,
			FOV: 1.1,
		},
		GUNS: [
			{
				/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [5, 11, 1, 10.5, 0, 0, 0],
			},
			{
				POSITION: [12, 14, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [7.5, 10, 0.5, 8, 0, 0, 0],
			},
			{
				POSITION: [2, 14, 1, 15.5, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 6,
					SHOOT_SETTINGS: combineStats([g.factory]),
					TYPE: "flankMinion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
				},
			},
		],
	};
	Class.machineFactory = {
		PARENT: ["genericTank"],
		LABEL: "Blast furnace",
		DANGER: 6,
		STAT_NAMES: statnames.drone,
		BODY: {
			SPEED: base.SPEED * 0.8,
			FOV: 1.1,
		},
		GUNS: [
			{
				/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [5, 11, 1, 10.5, 0, 0, 0],
			},
			{
				POSITION: [12, 14, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [7.5, 4, 2.3, 8, 0, 0, 0],
			},
			{
				POSITION: [2, 14, 1, 15.5, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 6,
					SHOOT_SETTINGS: combineStats([g.factory]),
					TYPE: "machineMinion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
				},
			},
		],
	};
	Class.trapFactory = {
		PARENT: ["genericTank"],
		LABEL: "Firewall",
		DANGER: 6,
		STAT_NAMES: statnames.drone,
		BODY: {
			SPEED: base.SPEED * 0.8,
			FOV: 1.1,
		},
		GUNS: [
			{
				/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [5, 11, 1, 10.5, 0, 0, 0],
			},
			{
				POSITION: [12, 14, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [2, 9.3, 1.5, 10, 0, 0, 0],
			},
			{
				POSITION: [2, 14, 1, 15.5, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 5,
					SHOOT_SETTINGS: combineStats([g.factory]),
					TYPE: "trapperMinion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
				},
			},
		],
	};
	Class.directorFactory = {
		PARENT: ["genericTank"],
		LABEL: "Engager",
		DANGER: 6,
		STAT_NAMES: statnames.drone,
		BODY: {
			SPEED: base.SPEED * 0.8,
			FOV: 1.1,
		},
		GUNS: [
			{
				/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [5, 11, 1, 10.5, 0, 0, 0],
			},
			{
				POSITION: [12, 14, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [2, 14, 1, 15.5, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 5,
					SHOOT_SETTINGS: combineStats([g.factory]),
					TYPE: "directorMinion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
				},
			},
			{
				POSITION: [2, 6, 1.2, 15.5, 0, 0, 0],
			},
		],
	};
	Class.sniperFactory = {
		PARENT: ["genericTank"],
		LABEL: "Gentry",
		DANGER: 6,
		STAT_NAMES: statnames.drone,
		BODY: {
			SPEED: base.SPEED * 0.8,
			FOV: 1.1,
		},
		GUNS: [
			{
				/**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
				POSITION: [7, 11, 1, 10.5, 0, 0, 0],
			},
			{
				POSITION: [14, 14, 1, 0, 0, 0, 0],
			},
			{
				POSITION: [2, 14, 1, 17.5, 0, 0, 0],
				PROPERTIES: {
					MAX_CHILDREN: 6,
					SHOOT_SETTINGS: combineStats([g.factory]),
					TYPE: "sniperMinion",
					STAT_CALCULATOR: gunCalcNames.drone,
					AUTOFIRE: true,
					SYNCS_SKILLS: true,
				},
			},
		],
	};
	
	// END OF DEFINITIONS
	Class.spawner.UPGRADES_TIER_3.push("twinMaker", "flankMaker", "machineMaker", "trapMaker", "directorMaker", "sniperMaker");
		Class.twinMaker.UPGRADES_TIER_3 = ["bentMaker", "gunMaker", "doubleMaker", "autoTwinMaker", "twinFactory"];
		Class.flankMaker.UPGRADES_TIER_3 = ["hexaMaker", "triMaker", "auto3Maker", "autoFlankMaker", "flankFactory"];
		Class.machineMaker.UPGRADES_TIER_3 = ["sprayMaker", "gunMaker", "machTrapMaker", "autoMachineMaker", "machineFactory"];
		Class.trapMaker.UPGRADES_TIER_3 = ["triTrapMaker", "buildMaker", "machTrapMaker", "autoTrapMaker", "trapFactory"];
		Class.directorMaker.UPGRADES_TIER_3 = ["overMaker", "spawnMaker", "cruiserMaker", "autoDirectorMaker", "directorFactory"];
		Class.sniperMaker.UPGRADES_TIER_3 = ["assassMaker", "huntMaker", "autoSniperMaker", "sniperFactory"];
	Class.autoSpawner.UPGRADES_TIER_3 != null ? Class.autoSpawner.UPGRADES_TIER_3.push("autoTwinMaker", "autoFlankMaker", "autoMachineMaker", "autoTrapMaker", "autoDirectorMaker", "autoSniperMaker") : Class.autoSpawner.UPGRADES_TIER_3 = ["autoTwinMaker", "autoFlankMaker", "autoMachineMaker", "autoTrapMaker", "autoDirectorMaker", "autoSniperMaker"]
	Class.factory.UPGRADES_TIER_3 != null ? Class.factory.UPGRADES_TIER_3.push("twinFactory", "flankFactory", "machineFactory", "trapFactory", "directorFactory", "sniperFactory") : Class.factory.UPGRADES_TIER_3 = ["twinFactory", "flankFactory", "machineFactory", "trapFactory", "directorFactory", "sniperFactory"]
	console.log('[coolSpawnersAddon] Loaded successfully');
};
