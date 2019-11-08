const formatReminders = require('.');

test('exports a function returning a string', () => {
  expect(formatReminders([])).toBe('');
});

test('formats an array of reminders as markdown', () => {
  const input = [
    { list: 'reminders', title: 'abc' },
    { list: 'reminders', title: 'cbd' }
  ];

  const expected = `
# reminders

- [ ] abc
- [ ] cbd
`.trimLeft();

  expect(formatReminders(input)).toBe(expected);
});

test('groups reminders by list', () => {
  const input = [
    { list: 'TODOs', title: 'pack' },
    { list: 'TODOs', title: 'meal prep' },
    { list: 'TODOs', title: '😃 smile' },
    { list: 'Cool List', title: 'Be awesome' }
  ];

  const expected = `
# TODOs

- [ ] pack
- [ ] meal prep
- [ ] 😃 smile

# Cool List

- [ ] Be awesome
`.trimLeft();

  expect(formatReminders(input)).toBe(expected);
});

test('the headingLevel option sets the markdown level', () => {
  const input = [
    { list: 'reminders', title: 'abc' },
    { list: 'reminders', title: 'cbd' }
  ];

  const expected = `
### reminders

- [ ] abc
- [ ] cbd
`.trimLeft();

  expect(formatReminders(input, { headingLevel: 3 })).toBe(expected);
});
