function groupRemindersByList(groupedReminders, reminder) {
  return {
    ...groupedReminders,
    [reminder.list]: (groupedReminders[reminder.list] || []).concat(
      reminder.title
    )
  };
}

function formatAsMarkdown([list, reminders], { headingLevel = 1 } = {}) {
  const titleLeadingDecoration = '#'.repeat(headingLevel);
  const title = `${titleLeadingDecoration} ${list}`;
  const todos = reminders.map(reminder => `- [ ] ${reminder}`).join('\n');

  return `${title}\n\n${todos}\n`;
}

function formatReminders(reminders, options) {
  if (!Array.isArray(reminders)) return '';

  return Object.entries(reminders.reduce(groupRemindersByList, {}))
    .map(reminder => formatAsMarkdown(reminder, options))
    .join('\n');
}

module.exports = formatReminders;
