/** Track history and reward independently for one exercise attempt. */
export function createAttempt() {
  let recorded = false;
  let rewarded = false;
  return {
    check(correct, total) {
      if (total === 0) return { record: false, points: 0 };
      const record = !recorded;
      const points = !rewarded && correct === total ? total * 10 : 0;
      recorded = true;
      if (points > 0) rewarded = true;
      return { record, points };
    },
  };
}
