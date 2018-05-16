const ListItemsQuery = require('./testQueries.graphql').ListItems;
const serializer = require('..');
const serialize = serializer.serialize;
const serializeTest = serializer.test;


describe('serializer', () => {
  describe('test function', () => {
    it('returns true when passed value contains GraphQL query body', () => {
      expect(serializeTest(ListItemsQuery)).toEqual(true);
    });

    it('returns false when passed value does not contain GraphQL query body', () => {
      expect(serializeTest({})).toEqual(false);
    });

    it('returns false when passed value is not an object', () => {
      expect(serializeTest('not an object')).toEqual(false);
    });
  });

  describe('serialization function', () => {
    const testWrapping = (output) => {
      it('wraps query in double quotes', () => {
        expect(output.slice(-1)).toEqual('"');
        expect(output.slice(0, 1)).toEqual('"');
      });

      it('removes whitespace from start of query string', () => {
        expect(output.slice(1, 6)).toEqual('query');
      });

      it('removes newlines from end of query string', () => {
        expect(output.slice(-1)).not.toEqual('\n');
      });
    };

    describe('with no depth', () => {
      const output = serialize(ListItemsQuery, { indent: ' ' });

      testWrapping(output);

      it('returns formatted query', () => {
        expect(output).toMatchSnapshot();
      });
    });

    describe('with depth', () => {
      const output = serialize(ListItemsQuery, { indent: ' ' }, undefined, 10);

      testWrapping(output);

      it('returns formatted and indented query', () => {
        expect(output).toMatchSnapshot();
      });
    });
  });
});
