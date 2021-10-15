import sanitiseString from "../../../models/functions/sanitiseString";

describe('sanitiseString', () => {

  test('it lets a normal message go through', () => {
    const test = sanitiseString('hello this is normal')
    expect(test).toBe('hello this is normal');
    return;
  });

  test('it removes characters other than a-z A-Z 0-9 space .,', () => {
    const test = sanitiseString('hello ./@#&*!(,');
    expect(test).toBe('hello .,');
    return;
  });

  test('it strips the preceding and trailing spaces if there is one', () => {
    const test = sanitiseString('   hello   ');
    expect(test).toBe('hello');
    const test2 = sanitiseString(' hello .    ');
    expect(test2).toBe('hello .');
  });
});

