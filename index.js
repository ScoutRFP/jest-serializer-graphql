var print = require('graphql/language/printer').print;
var prettyFormat = require('pretty-format').format;
var indentString = require('indent-string');
var get = require('lodash.get');
var trimStart = require('lodash.trimstart');
var trimEnd = require('lodash.trimend');


module.exports = {
  serialize(val, config, indentation, depth) {
    var query = print(val);
    var queryIndented = indentString(
      query,
      depth + 1,
      { indent: config.indent }
    );

    var queryTrimmed = trimStart(
      trimEnd(queryIndented, '\n')
    );

    return prettyFormat(queryTrimmed);
  },

  test(val) {
    return !!get(val, 'loc.source.body');
  }
};
