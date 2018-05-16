var print = require('graphql/language/printer').print;
var prettyFormat = require('pretty-format');
var indentString = require('indent-string');
var get = require('lodash.get');
var trimStart = require('lodash.trimStart');
var trimEnd = require('lodash.trimEnd');


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
