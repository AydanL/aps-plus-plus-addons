// This addon is disabled by default.
// You can also disable addons by not making them end with '.js'
// If you want to enable, simply make the line below just not run.
return console.log('[realTanks.js] Addon disabled by default');

// CONSTANTS AND LOCAL FUNCTIONS
const { combineStats, makeBird } = require('../facilitators.js');
const { base, statnames, gunCalcNames } = require('../constants.js');
const g = { // GUNVALS
	gun: { reload: 150, recoil: 0, shudder: 0, damage: 1, speed: 20, spray: 1, range: 2 },
	heavy: { damage: 5 },
	mach: { damage: 0.05, reload: 0.02, range: 0.1},
};
const c = { // COLORS
	menu: '#657243',
	markV: {brown: '#D89B5A', grey: '#7F786E'},
	ft17: {brown: '#744F30', tan: '#E7D8C3', green: '#626C32'},
	ca1: {grey: '#A5AAB6', darkGrey: '#6D6F62', brown: '#927E7A', tan: '#F5D886'},
	stChamond: {grey: '#CFD8DD', tan: '#FFD984'},
	a7v: {tan: '#D6C0AB', kaki: '#90938C', brown: '#8C7A78'},
	lk2: {blue: '#C0D6DE', tan: '#DFDACE', white: '#E9EAEE', grey: '#9C9B99'},
	fiat2000: {kaki: '#88A07E', cyan: '#577E83', grey: '#A3A5A0'}
};
const tracks = ( params /*{len, wid, x_ofs, y_ofs, seg, color}*/ ) => {
	let paramsList = ['len', 'wid', 'x_ofs', 'y_ofs', 'seg', 'color'];
	let paramsDflt = {len: 20, wid: 4, x_ofs: 0, y_ofs: 8, seg: 1.5, color: 'grey'};
	for (let param of paramsList) {
		if (params[param] == null) {
			params[param] = paramsDflt[param]
		}
	};
	let tracks = [];
	let backPoint = -1 * ( params.len / 2 ) + params.x_ofs;
	let trackL; let trackR;
	for ( let i = backPoint; i < ( params.len + backPoint - params.seg ); i += params.seg ) {
		trackL = {
			POSITION: [params.seg-0.8, params.wid, 1, i, params.y_ofs*-1, 0, 0],
			PROPERTIES: {
				COLOR: params.color,
			},
		};
		trackR = {
			POSITION: [params.seg-0.8, params.wid, 1, i, params.y_ofs, 0, 0],
			PROPERTIES: {
				COLOR: params.color,
			},
		};
		tracks.push( trackL, trackR );
	};
	let turretDef = {
		PARENT: "genericTank",
		MIRROR_MASTER_ANGLE: true,
		SHAPE: "",
		GUNS: tracks,
	};
	return turretDef;
};
const makeDeco = (color = -1, shape = 0) => {
    return {
        PARENT: "genericTank",
		MIRROR_MASTER_ANGLE: true,
        SHAPE: shape,
        COLOR: color,
    };
}
const menu = (name = -1, color = '#657243', shape = 0) => {
    let gun = {
        POSITION: [18, 10, -1.4, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([{ reload: 10.5, recoil: 1.4, shudder: 0.1, damage: 0.75, speed: 4.5, spray: 15 }]),
            TYPE: "bullet",
        },
    };
    return {
        PARENT: "genericTank",
        LABEL: name == -1 ? undefined : name,
        GUNS: [gun],
        COLOR: color,
        UPGRADE_COLOR: color == -1 ? undefined : color,
        SHAPE: shape,
        IGNORED_BY_AI: true,
		REROOT_UPGRADE_TREE: 'aydanl_realTanks'
    };
}

// DEV SHIT
Class.aydanl_tankParent = {
	PARENT: "genericTank",
	COLOR: c.menu,
	REROOT_UPGRADE_TREE: 'aydanl_realTanks'
}
Class.aydanl_realTanks = menu("Real Tanks");
	Class.aydanl_battleTanks = menu("Battle Tanks");
	Class.aydanl_tests = menu("Tests");

// TESTING
Class.aydanl_testHeavy = {
    PARENT: "aydanl_tankParent",
    LABEL: "Heavy gun",
	COLOR: c.menu,
    BODY: {
        FOV: 1.4 * base.FOV
    },
    GUNS: [
        {
            POSITION: [24, 8.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.gun, g.heavy]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.aydanl_testMach = {
    PARENT: "aydanl_tankParent",
    LABEL: "Machine gun",
	COLOR: c.menu,
    BODY: {
        FOV: 1.4 * base.FOV
    },
    GUNS: [
        {
            POSITION: [24, 8.5, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.gun, g.mach]),
                TYPE: "bullet"
            }
        }
    ]
}
Class.aydanl_testTracks = tracks({})
Class.aydanl_testTracked = {
	PARENT: "aydanl_tankParent",
    LABEL: "Tracks test",
	COLOR: c.menu,
	TURRETS: [
        {
            POSITION: [25, 0, 0, 0, 0, 0],
            TYPE: "aydanl_testTracks",
        },
	]
}

// DEFINITIONS

// UPGRADES TREE
Class.addons.UPGRADES_TIER_0.push("aydanl_realTanks");
	Class.aydanl_realTanks.UPGRADES_TIER_0 = ["aydanl_battleTanks", "aydanl_tests"];
		Class.aydanl_tests.UPGRADES_TIER_0 = ["aydanl_testHeavy", "aydanl_testMach", "aydanl_testTracked"];
		Class.aydanl_battleTanks.UPGRADES_TIER_0 = [];