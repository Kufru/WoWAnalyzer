import React from 'react';
import Analyzer from 'parser/core/Analyzer';
import { calculateAzeriteEffects } from 'common/stats';
import SPELLS from 'common/SPELLS/index';
import TraitStatisticBox, { STATISTIC_ORDER } from 'interface/others/TraitStatisticBox';
import SpellLink from 'common/SpellLink';

const archiveOfTheTitansStats = traits => Object.values(traits).reduce((total, rank) => {
  const [stat] = calculateAzeriteEffects(SPELLS.ARCHIVE_OF_THE_TITANS.id, rank);
  return total + stat;
}, 0);

export const STAT_TRACKER = {
  intellect: combatant => archiveOfTheTitansStats(combatant.traitsBySpellId[SPELLS.ARCHIVE_OF_THE_TITANS.id]),
  strength: combatant => archiveOfTheTitansStats(combatant.traitsBySpellId[SPELLS.ARCHIVE_OF_THE_TITANS.id]),
  agility: combatant => archiveOfTheTitansStats(combatant.traitsBySpellId[SPELLS.ARCHIVE_OF_THE_TITANS.id]),
};

/**
 * Archive of the Titans
 * Your armor gathers and analyzes combat data every 5 sec, increasing your primary stat by 6, stacking up to 20 times.
 * The data decays while out of combat.
 * 
 * Enables Reorigination Array within Uldir.
 */
class ArchiveOfTheTitans extends Analyzer {
  primaryPerStack = 0;
  currentStacks = 0;
  lastTimestamp = 0;
  totalPrimary = 0;

  constructor(...args){
    super(...args);
    this.active = this.selectedCombatant.hasTrait(SPELLS.ARCHIVE_OF_THE_TITANS.id);
    if (!this.active) {
      return;
    }

    this.primaryPerStack = archiveOfTheTitansStats(this.selectedCombatant.traitsBySpellId[SPELLS.ARCHIVE_OF_THE_TITANS.id]);
  }

  on_byPlayer_applybuff(event) {
    this.handleBuff(event);
  }

  on_byPlayer_applybuffstack(event) {
    this.handleBuff(event);
  }

  on_byPlayer_removebuff(event) {
    this.handleBuff(event);
  }

  handleBuff(event) {
    if (event.ability.guid !== SPELLS.ARCHIVE_OF_THE_TITANS_BUFF.id) {
      return;
    }

    if (this.currentStacks !== 0 && this.lastTimestamp !== 0) {
      const uptimeOnStack = event.timestamp - this.lastTimestamp;
      this.totalPrimary += this.currentStacks * this.primaryPerStack * uptimeOnStack;
    }

    if (event.type === "removebuff") {
      this.currentStacks = 0;
    } else {
      this.currentStacks = (event.stack || 1);
    }

    this.lastTimestamp = event.timestamp;
  }

  on_finished() {
    if (this.currentStacks !== 0 && this.lastTimestamp !== 0) {
      const uptimeOnStack = this.owner.fight.end_time - this.lastTimestamp;
      this.totalPrimary += this.currentStacks * this.primaryPerStack * uptimeOnStack;
    }
  }

  get averagePrimaryStat() {
    return (this.totalPrimary / this.owner.fightDuration).toFixed(0);
  }

  // todo: reorigination array
  statistic() {
    return (
      <TraitStatisticBox
        position={STATISTIC_ORDER.OPTIONAL()}
        trait={SPELLS.ARCHIVE_OF_THE_TITANS.id}
        value={(
          <>
          {this.averagePrimaryStat} average {this.selectedCombatant.spec.primaryStat}<br />
          Gained <SpellLink id={SPELLS.REORIGINATION_ARRAY.id} /><br />
          </>
        )}
      />
    );
  }
}

export default ArchiveOfTheTitans;
