import SPELLS from 'common/SPELLS';
import ISSUE_IMPORTANCE from 'Parser/Core/ISSUE_IMPORTANCE';
import CoreAbilities from 'Parser/Core/Modules/Abilities';

class Abilities extends CoreAbilities {
  spellbook() {
    const combatant = this.combatants.selected;
    return [
      {
        spell: SPELLS.RIPTIDE,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        charges: combatant.hasTalent(SPELLS.ECHO_OF_THE_ELEMENTS_TALENT.id) ? 2 : 1,
        cooldown: 6,
        timelineSortIndex: 11,
        isOnGCD: true,
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: combatant.hasTalent(SPELLS.ECHO_OF_THE_ELEMENTS_TALENT.id) ? 0.90 : 0.70,
        },
      },
      {
        spell: SPELLS.HEALING_STREAM_TOTEM_CAST,
        category: Abilities.SPELL_CATEGORIES.ROTATIONAL,
        charges: combatant.hasTalent(SPELLS.ECHO_OF_THE_ELEMENTS_TALENT.id) ? 2 : 1,
        timelineSortIndex: 18,
        enabled: !combatant.hasTalent(SPELLS.CLOUDBURST_TOTEM_TALENT.id),
        isOnGCD: true,
        cooldown: 30,
        castEfficiency: {
          suggestion: true,
          majorIssueEfficiency: 0.50,
          averageIssueEfficiency: 0.70,
          recommendedEfficiency: 0.90,
        },
      },
      {
        spell: SPELLS.ASTRAL_SHIFT,
        buffSpellId: SPELLS.ASTRAL_SHIFT.id,
        category: Abilities.SPELL_CATEGORIES.DEFENSIVE,
        timelineSortIndex: 82,
        cooldown: 90,
        castEfficiency: {
          suggestion: true,
          recommendedEfficiency: 0.6,
          importance: ISSUE_IMPORTANCE.MINOR,
        },
      },
      {
        spell: SPELLS.HEALING_RAIN_CAST,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        cooldown: 10,
        timelineSortIndex: 17,
        isOnGCD: true,
        castEfficiency: {
          suggestion: true,
          majorIssueEfficiency: 0.30,
          averageIssueEfficiency: 0.50,
          recommendedEfficiency: 0.70,
        },
      },
      {
        spell: SPELLS.WELLSPRING_TALENT,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        cooldown: 20,
        timelineSortIndex: 20,
        isOnGCD: true,
        enabled: combatant.lv100Talent === SPELLS.WELLSPRING_TALENT.id,
        castEfficiency: {
          suggestion: true,
          majorIssueEfficiency: 0.30,
          averageIssueEfficiency: 0.50,
          recommendedEfficiency: 0.70,
        },
      },
      {
        spell: SPELLS.CLOUDBURST_TOTEM_TALENT,
        buffSpellId: SPELLS.CLOUDBURST_TOTEM_TALENT.id,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        charges: combatant.hasTalent(SPELLS.ECHO_OF_THE_ELEMENTS_TALENT.id) ? 2 : 1,
        cooldown: 30,
        timelineSortIndex: 16,
        isOnGCD: true,
        enabled: combatant.hasTalent(SPELLS.CLOUDBURST_TOTEM_TALENT.id),
        castEfficiency: {
          suggestion: true,
          majorIssueEfficiency: 0.50,
          averageIssueEfficiency: 0.70,
          recommendedEfficiency: 0.90,
        },
      },
      {
        spell: SPELLS.EARTHEN_WALL_TOTEM_TALENT,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        cooldown: 60,
        timelineSortIndex: 20,
        isOnGCD: true,
        enabled: combatant.hasTalent(SPELLS.EARTHEN_WALL_TOTEM_TALENT.id),
        castEfficiency: {
          suggestion: true,
          majorIssueEfficiency: 0.50,
          averageIssueEfficiency: 0.70,
          recommendedEfficiency: 0.90,
        },
      },
      {
        spell: SPELLS.UNLEASH_LIFE_TALENT,
        buffSpellId: SPELLS.UNLEASH_LIFE_TALENT.id,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        cooldown: 15,
        timelineSortIndex: 5,
        isOnGCD: true,
        enabled: combatant.lv15Talent === SPELLS.UNLEASH_LIFE_TALENT.id,
        castEfficiency: {
          suggestion: true,
          majorIssueEfficiency: 0.50,
          averageIssueEfficiency: 0.70,
          recommendedEfficiency: 0.90,
        },
      },
      {
        spell: SPELLS.ASCENDANCE_TALENT_RESTORATION,
        buffSpellId: SPELLS.ASCENDANCE_TALENT_RESTORATION.id,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        cooldown: 180,
        isOnGCD: true,
        enabled: combatant.lv100Talent === SPELLS.ASCENDANCE_TALENT_RESTORATION.id,
        castEfficiency: {
          suggestion: true,
          majorIssueEfficiency: 0.2,
          averageIssueEfficiency: 0.5,
          recommendedEfficiency: 0.8,
        },
      },
      {
        spell: SPELLS.HEALING_TIDE_TOTEM_CAST,
        buffSpellId: SPELLS.HEALING_TIDE_TOTEM_CAST.id,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        cooldown: 180,
        isOnGCD: true,
        castEfficiency: {
          suggestion: true,
          majorIssueEfficiency: 0.2,
          averageIssueEfficiency: 0.5,
          recommendedEfficiency: 0.8,
        },
      },
      {
        spell: SPELLS.SPIRIT_LINK_TOTEM,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        cooldown: 180,
        isOnGCD: true,
        castEfficiency: {
          suggestion: true,
          majorIssueEfficiency: 0.2,
          averageIssueEfficiency: 0.4,
          recommendedEfficiency: 0.6,
        },
      },
      {
        spell: SPELLS.HEALING_WAVE,
        timelineSortIndex: 13,
        isOnGCD: true,
        category: Abilities.SPELL_CATEGORIES.OTHERS,
        castEfficiency: {
          casts: castCount => (castCount.casts || 0) - (castCount.healingTwHits || 0),
        },
      },
      {
        spell: SPELLS.HEALING_WAVE,
        name: `Tidal Waved ${SPELLS.HEALING_WAVE.name}`,
        timelineSortIndex: 13,
        isOnGCD: true,
        category: Abilities.SPELL_CATEGORIES.OTHERS,
        castEfficiency: {
          casts: castCount => castCount.healingTwHits || 0,
        },
      },
      {
        spell: SPELLS.HEALING_SURGE_RESTORATION,
        timelineSortIndex: 14,
        isOnGCD: true,
        category: Abilities.SPELL_CATEGORIES.OTHERS,
        castEfficiency: {
          casts: castCount => (castCount.casts || 0) - (castCount.healingTwHits || 0),
        },
      },
      {
        spell: SPELLS.HEALING_SURGE_RESTORATION,
        name: `Tidal Waved ${SPELLS.HEALING_SURGE_RESTORATION.name}`,
        timelineSortIndex: 14,
        isOnGCD: true,
        category: Abilities.SPELL_CATEGORIES.OTHERS,
        castEfficiency: {
          casts: castCount => castCount.healingTwHits || 0,
        },
      },
      {
        spell: SPELLS.CHAIN_HEAL,
        category: Abilities.SPELL_CATEGORIES.OTHERS,
        timelineSortIndex: 12,
        isOnGCD: true,
      },
      {
        spell: SPELLS.PURIFY_SPIRIT,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        timelineSortIndex: 80,
        cooldown: 8,
        isOnGCD: true,
      },
      {
        spell: SPELLS.FLAME_SHOCK_RESTORATION,
        buffSpellId: SPELLS.FLAME_SHOCK_RESTORATION.id,
        category: Abilities.SPELL_CATEGORIES.HEALER_DAMAGING_SPELL,
        timelineSortIndex: 60,
        cooldown: 6,
        isOnGCD: true,
      },
      {
        spell: SPELLS.LAVA_BURST,
        buffSpellId: SPELLS.LAVA_SURGE.id,
        category: Abilities.SPELL_CATEGORIES.HEALER_DAMAGING_SPELL,
        charges: combatant.hasTalent(SPELLS.ECHO_OF_THE_ELEMENTS_TALENT.id) ? 2 : 1,
        timelineSortIndex: 60,
        cooldown: 8,
        isOnGCD: true,
      },
      {
        spell: SPELLS.LIGHTNING_BOLT_RESTORATION,
        category: Abilities.SPELL_CATEGORIES.HEALER_DAMAGING_SPELL,
        isOnGCD: true,
        timelineSortIndex: 60,
      },
      {
        spell: SPELLS.CHAIN_LIGHTNING_RESTORATION,
        category: Abilities.SPELL_CATEGORIES.HEALER_DAMAGING_SPELL,
        isOnGCD: true,
        timelineSortIndex: 60,
      },
      {
        spell: SPELLS.GHOST_WOLF,
        buffSpellId: SPELLS.GHOST_WOLF.id,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        timelineSortIndex: 80,
        isOnGCD: true,
      },
      {
        spell: SPELLS.SPIRITWALKERS_GRACE,
        buffSpellId: SPELLS.SPIRITWALKERS_GRACE.id,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: combatant.hasTalent(SPELLS.GRACEFUL_SPIRIT_TALENT.id) ? 60 : 120,
        timelineSortIndex: 81,
      },
      {
        spell: SPELLS.EARTHBIND_TOTEM,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        timelineSortIndex: 80,
        isOnGCD: true,
        cooldown: 30,
      },
      {
        spell: SPELLS.PURGE,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        timelineSortIndex: 80,
        isOnGCD: true,
      },
      {
        spell: SPELLS.CAPACITOR_TOTEM,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        timelineSortIndex: 80,
        isOnGCD: true,
        cooldown: 60,
      },
      {
        spell: SPELLS.WIND_RUSH_TOTEM_TALENT,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        timelineSortIndex: 80,
        isOnGCD: true,
        enabled: combatant.hasTalent(SPELLS.WIND_RUSH_TOTEM_TALENT.id),
        cooldown: 120,
      }, 
      {
        spell: SPELLS.EARTHGRAB_TOTEM_TALENT,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        timelineSortIndex: 80,
        isOnGCD: true,
        enabled: combatant.hasTalent(SPELLS.EARTHGRAB_TOTEM_TALENT.id),
        cooldown: 30,
      }, 
      {
        spell: SPELLS.ANCESTRAL_PROTECTION_TOTEM_TALENT,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        isOnGCD: true,
        enabled: combatant.hasTalent(SPELLS.ANCESTRAL_PROTECTION_TOTEM_TALENT.id),
        cooldown: 300,
      },
      {
        spell: SPELLS.REINCARNATION,
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 1800,
      },
      {
        spell: SPELLS.WIND_SHEAR, 
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        timelineSortIndex: 80,
        cooldown: 12,
      },
      {
        spell: [SPELLS.HEX, SPELLS.HEX_RAPTOR, SPELLS.HEX_SNAKE, SPELLS.HEX_SPIDER, SPELLS.HEX_COCKROACH, SPELLS.HEX_SKELETAL],
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        isOnGCD: true,
        timelineSortIndex: 80,
        cooldown: 30,
      },
      {
        spell: SPELLS.EARTH_SHIELD_TALENT, 
        category: Abilities.SPELL_CATEGORIES.OTHERS,
        isOnGCD: true,
        enabled: combatant.hasTalent(SPELLS.EARTH_SHIELD_TALENT.id),
        timelineSortIndex: 80,
      },
      {
        spell: SPELLS.TREMOR_TOTEM, 
        category: Abilities.SPELL_CATEGORIES.UTILITY,
        cooldown: 60,
        isOnGCD: true,
        timelineSortIndex: 80,
      },
      {
        spell: SPELLS.DOWNPOUR_TALENT,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        cooldown: 35, // CD changes depending on amount of effective targets hit (0 = 5s, 6 = 35s)
        isOnGCD: true,
        timelineSortIndex: 20,
        enabled: combatant.hasTalent(SPELLS.DOWNPOUR_TALENT.id),
        castEfficiency: {
          suggestion: true,
          majorIssueEfficiency: 0.20,
          averageIssueEfficiency: 0.40,
          recommendedEfficiency: 0.60,
        },
      },
      {
        spell: SPELLS.BERSERKING,
        buffSpellId: SPELLS.BERSERKING.id,
        category: Abilities.SPELL_CATEGORIES.COOLDOWNS,
        cooldown: 180,
        isUndetectable: true,
      },
    ];
  }
}

export default Abilities;
