import { InitialsPipe } from '#core/pipe';
import { TestCase } from '#test/model';

const testCases: TestCase[] = [
  {
    input: 'Mark Zieliński',
    output: 'MZ',
  },
  {
    input: 'Mark ',
    output: 'M',
  },
  {
    input: 'Adrianna Ciechocka-Wieniawska',
    output: 'ACW',
  },
  {
    input: 'Testtt test-test-test',
    output: 'TTTT',
  },
  {
    input: 'Dicky',
    output: 'D',
  },
];

describe('InitialsPipe', () => {
  const pipe = new InitialsPipe();

  testCases.forEach(({ input, output }) => {
    it(`Should return ${input} initials`, () => {
      expect(output).toEqual(pipe.transform(input));
    });
  });
});
