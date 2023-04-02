module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue'
  ],
  rules: {
    'function-no-unknown': null,
    'selector-class-pattern': '^([a-z][a-z0-9]*)(_[a-z0-9]+)*$',
    'selector-type-case': 'lower',
    'at-rule-no-unknown': null,
    'keyframe-block-no-duplicate-selectors': null
  }
};
