/**
 * Date utilities for note-refining-skills
 * Provides timestamp calculations for codemons-cli highlight queries
 */

export interface DateRange {
  startDate: number; // Unix timestamp in milliseconds
  endDate: number;
  label: string;
}

/**
 * Get start and end of today in local timezone
 */
export function getTodayRange(): DateRange {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
  return {
    startDate: start.getTime(),
    endDate: end.getTime(),
    label: formatDateLabel(start),
  };
}

/**
 * Get date range for T-n (n days ago)
 * @param daysAgo - number of days ago (1 = yesterday, 2 = 2 days ago, etc.)
 */
export function getDaysAgoRange(daysAgo: number): DateRange {
  if (daysAgo < 0) throw new Error('daysAgo must be non-negative');
  
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
  
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  start.setDate(start.getDate() - daysAgo);
  
  return {
    startDate: start.getTime(),
    endDate: end.getTime(),
    label: formatDateLabel(start),
  };
}

/**
 * Get date range for a specific date
 * @param dateString - ISO date string or YYYY-MM-DD format
 */
export function getDateRange(dateString: string): DateRange {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) throw new Error(`Invalid date: ${dateString}`);
  
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
  const end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
  
  return {
    startDate: start.getTime(),
    endDate: end.getTime(),
    label: formatDateLabel(start),
  };
}

/**
 * Get date range from startDate to endDate
 * @param startDateString - ISO date string or YYYY-MM-DD
 * @param endDateString - ISO date string or YYYY-MM-DD
 */
export function getRange(startDateString: string, endDateString: string): DateRange {
  const start = new Date(startDateString);
  const end = new Date(endDateString);
  if (isNaN(start.getTime())) throw new Error(`Invalid start date: ${startDateString}`);
  if (isNaN(end.getTime())) throw new Error(`Invalid end date: ${endDateString}`);
  
  const startMs = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0, 0);
  const endMs = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59, 999);
  
  return {
    startDate: startMs.getTime(),
    endDate: endMs.getTime(),
    label: `${formatDateLabel(startMs)} ~ ${formatDateLabel(endMs)}`,
  };
}

/**
 * Format date for CLI command output
 */
export function formatCLICommand(range: DateRange): string {
  return `codemons-cli highlight --start-date ${range.startDate} --end-date ${range.endDate}`;
}

/**
 * Format date for display
 */
function formatDateLabel(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// CLI entry point
const args = process.argv.slice(2);

function printUsage() {
  console.log(`
📅 Date Range Calculator for Note Refining

Usage:
  npx tsx scripts/date.ts <command> [options]

Commands:
  today              Get today's date range
  yesterday          Get yesterday's date range  
  t-<n>              Get date range for n days ago (e.g., t-7)
  date <YYYY-MM-DD>  Get date range for specific date
  range <start> <end> Get range from start to end date

Examples:
  npx tsx scripts/date.ts today
  npx tsx scripts/date.ts t-3
  npx tsx scripts/date.ts date 2026-03-15
  npx tsx scripts/date.ts range 2026-03-01 2026-03-31
`);
}

async function main() {
  if (args.length === 0 || args[0] === 'help' || args[0] === '--help' || args[0] === '-h') {
    printUsage();
    return;
  }

  const command = args[0];
  let range: DateRange;

  try {
    if (command === 'today') {
      range = getTodayRange();
    } else if (command === 'yesterday') {
      range = getDaysAgoRange(1);
    } else if (command.startsWith('t-')) {
      const daysAgo = parseInt(command.slice(2), 10);
      if (isNaN(daysAgo)) throw new Error('Invalid T-n format');
      range = getDaysAgoRange(daysAgo);
    } else if (command === 'date') {
      if (!args[1]) throw new Error('Missing date argument');
      range = getDateRange(args[1]);
    } else if (command === 'range') {
      if (!args[1] || !args[2]) throw new Error('Missing start or end date');
      range = getRange(args[1], args[2]);
    } else {
      console.error(`Unknown command: ${command}`);
      printUsage();
      process.exit(1);
    }

    console.log(`\n📅 Range: ${range.label}`);
    console.log(`   start-date: ${range.startDate}`);
    console.log(`   end-date:   ${range.endDate}`);
    console.log(`\n🔧 CLI command:\n   ${formatCLICommand(range)}\n`);
  } catch (err) {
    console.error(`Error: ${(err as Error).message}\n`);
    printUsage();
    process.exit(1);
  }
}

main();
