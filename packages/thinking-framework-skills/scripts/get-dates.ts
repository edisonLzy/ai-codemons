#!/usr/bin/env bun

interface DateResult {
  today: string; // YYYY-MM-DD
  yesterday: string; // YYYY-MM-DD
}

function getDates(): DateResult {
  const now = new Date();
  const today = now.toISOString().split('T')[0]; // YYYY-MM-DD

  const yesterdayDate = new Date(now);
  yesterdayDate.setDate(now.getDate() - 1);
  const yesterday = yesterdayDate.toISOString().split('T')[0];

  return { today, yesterday };
}

const result = getDates();
console.log(JSON.stringify(result));
