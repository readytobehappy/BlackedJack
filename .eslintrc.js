// http://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 2020
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue-scoped-css/vue3-recommended',
    '@vue/typescript/recommended',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      vars: 'local',
      args: 'after-used',
      ignoreRestSiblings: false
    }],
    '@typescript-eslint/no-use-before-define': ['error', {
      functions: false,
      variables: false,
      classes: false
    }],
    'arrow-body-style': 'warn',
    'arrow-parens': ['warn', 'as-needed'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'brace-style': ['error', '1tbs', { allowSingleLine: false }],
    'comma-dangle': ['error', 'never'],
    'comma-spacing': ['error', { before: false, after: true }],
    'computed-property-spacing': ['error', 'never'],
    curly: ['error', 'multi-or-nest'],
    'dot-location': ['error', 'property'],
    'dot-notation': 'error',
    'eol-last': ['error', 'always'],
    eqeqeq: 'error',
    'func-call-spacing': ['error', 'never'],
    'function-call-argument-newline': ['error', 'consistent'],
    'function-paren-newline': ['error', 'consistent'],
    'generator-star-spacing': ['error', { before: true, after: false }],
    'import/no-webpack-loader-syntax': 'off',
    '@typescript-eslint/indent': ['error', 2, {
      SwitchCase: 1
    }],
    'jsx-quotes': ['error', 'prefer-double'],
    'key-spacing': ['error', { beforeColon: false, mode: 'strict' }],
    'keyword-spacing': ['error', { before: true, after: true }],
    'linebreak-style': ['error', 'unix'],
    'lines-between-class-members': ['error', 'always'],
    'max-len': ['error', {
      code: 120,
      ignoreTrailingComments: true,
      ignorePattern: '^[ ]*background[-:]|^[ ]*import[( ]'
    }],
    'max-statements-per-line': ['error', { max: 1 }],
    'multiline-ternary': ['error', 'always-multiline'],
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 1 }],
    'new-parens': 'error',
    'no-console': ['error', { allow: ['error'] }], // временно разрешаем логирование ошибки
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-import-assign': 'error',
    'no-inner-declarations': 'off',
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': ['error', {
      max: 1, maxBOF: 0, maxEOF: 1
    }],
    'no-new-object': 'error',
    'no-restricted-imports': ['error', {
      paths: [
        {
          name: 'lodash',
          importNames: ['chain'],
          message: 'Please dont use chain from lodash'
        }
      ],
      patterns: [{
        group: ['~*'],
        message: 'Please use `@` instead `~`'
      },
      {
        group: ['@/sites*'],
        message: 'Please don\'t import from sites absolutely, use relative path'
      },
      {
        group: ['@/components/*'],
        // eslint-disable-next-line max-len
        message: 'Please use import from `@/components` root only. Add necessary export at `/components/index.ts` in sites or use relative path in components.'
      }]
    }],
    'no-tabs': 'error',
    'no-trailing-spaces': 'error',
    'no-unneeded-ternary': 'warn',
    'no-unused-expressions': 'off', // неадекватно работает с optional chaining
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'no-useless-concat': 'error',
    'no-useless-constructor': 'off',
    'no-var': 'error',
    'no-void': 'off',
    'no-whitespace-before-property': 'error',
    'nonblock-statement-body-position': ['error', 'below'],
    'object-curly-newline': ['error', {
      ObjectExpression: { multiline: true, consistent: true },
      ObjectPattern: { multiline: true, consistent: true },
      ImportDeclaration: { multiline: true, consistent: true },
      ExportDeclaration: { multiline: true, consistent: true }
    }],
    'object-curly-spacing': ['error', 'always'],
    'object-literal-sort-keys': 'off',
    'one-var': ['error', 'never'],
    'one-var-declaration-per-line': ['error', 'always'],
    'operator-linebreak': ['error', 'before'],
    'padded-blocks': ['error', 'never'],
    'prefer-const': 'error',
    'prefer-destructuring': 'error',
    'prefer-template': 'error',
    quotes: ['error', 'single'],
    'rest-spread-spacing': ['error', 'never'],
    semi: ['error', 'always'],
    'sort-imports': ['error', {
      ignoreCase: true,
      ignoreDeclarationSort: true,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      allowSeparatedGroups: false
    }],
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'always',
      asyncArrow: 'always'
    }],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': ['error', { int32Hint: true }],
    'space-unary-ops': ['error', { words: true, nonwords: false }],
    'spaced-comment': ['off', 'always'],
    'template-curly-spacing': 'error',
    'unicode-bom': ['error'],
    'vue/attribute-hyphenation': ['error', 'never'],
    'vue/attributes-order': ['error', {
      order: [
        'CONDITIONALS',
        'DEFINITION',
        'LIST_RENDERING',
        'RENDER_MODIFIERS',
        'GLOBAL',
        'UNIQUE',
        'TWO_WAY_BINDING',
        'CONTENT',
        'OTHER_DIRECTIVES',
        'OTHER_ATTR',
        'EVENTS'
      ]
    }],
    'vue/block-tag-newline': ['error'],
    'vue/camelcase': ['error'],
    'vue/comment-directive': ['error', {
      reportUnusedDisableDirectives: true
    }],
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      registeredComponentsOnly: false,
      ignores: [
        'ol-map',
        'ol-view',
        'ol-tile-layer',
        'ol-source-osm',
        'ol-source-xyz',
        'ol-overlay',
        'ol-zoom-control',
        'ol-zoomslider-control',
        'teleport',
        'component',
        'router-view',
        'router-link',
        'transition',
        'transition-group'
      ]
    }],
    'vue/custom-event-name-casing': ['off'],
    'vue/eqeqeq': ['error', 'always'],
    'vue/first-attribute-linebreak': ['error', {
      singleline: 'ignore',
      multiline: 'beside'
    }],
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'never'
    }],
    'vue/html-closing-bracket-spacing': ['error', {
      startTag: 'never',
      endTag: 'never',
      selfClosingTag: 'never'
    }],
    'vue/html-indent': ['error', 2, {
      alignAttributesVertically: true
    }],
    'vue/html-self-closing': ['error', {
      html: {
        void: 'never',
        normal: 'always',
        component: 'always'
      },
      svg: 'always',
      math: 'always'
    }],
    'vue/match-component-file-name': ['error', {
      extensions: ['vue', 'js', 'ts'],
      shouldMatchCase: true
    }],
    'vue/max-attributes-per-line': ['error', {
      singleline: { max: 2 },
      multiline: { max: 1 }
    }],
    'vue/multi-word-component-names': 'off',
    'vue/no-boolean-default': ['error', 'default-false'],
    'vue/no-dupe-keys': ['error', {
      groups: []
    }],
    'vue/no-dupe-v-else-if': ['error'],
    'vue/no-duplicate-attr-inheritance': ['error'],
    'vue/no-duplicate-attributes': ['error', {
      allowCoexistClass: true,
      allowCoexistStyle: true
    }],
    'vue/no-empty-component-block': ['error'],
    'vue/no-mutating-props': ['error'],
    'vue/no-potential-component-option-typo': ['error', {
      presets: ['vue', 'vue-router']
    }],
    'vue/no-reserved-component-names': ['error', {
      disallowVueBuiltInComponents: true,
      disallowVue3BuiltInComponents: true
    }],
    'vue/no-reserved-keys': ['error', {
      reserved: [],
      groups: []
    }],
    'vue/no-reserved-props': ['error', {
      vueVersion: 3
    }],
    'vue/no-restricted-component-options': ['error', {
      name: 'model',
      message: '"model" option is deprecated in vue3'
    }],
    'vue/no-side-effects-in-computed-properties': ['error'],
    'vue/no-template-key': ['error'],
    'vue/no-unregistered-components': ['error'],
    'vue/no-unused-components': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'vue/no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'vue/no-useless-mustaches': ['error'],
    'vue/no-useless-v-bind': ['error'],
    'vue/no-v-html': ['off'],
    'vue/no-v-text-v-html-on-component': ['error'],
    'vue/object-curly-newline': ['error', { 'consistent': true }],
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/order-in-components': ['error', {
      order: [
        'el',
        'name',
        'parent',
        'functional',
        ['delimiters', 'comments'],
        ['components', 'directives'],
        'extends',
        'mixins',
        'inheritAttrs',
        ['props', 'propsData'],
        'emits',
        'beforeCreate',
        'setup',
        'created',
        'beforeMount',
        'mounted',
        'beforeUpdate',
        'updated',
        'activated',
        'deactivated',
        'beforeUnmount',
        'destroyed',
        'data',
        ['template', 'render'],
        'renderError',
        'methods',
        'computed',
        'watch'
      ]
    }],
    'vue/padding-line-between-blocks': ['error', 'always'],
    'vue/prefer-import-from-vue': ['error'],
    'vue/require-default-prop': ['off'],
    'vue/require-emit-validator': ['error'],
    'vue/require-explicit-emits': ['error'],
    'vue/require-name-property': ['error'],
    'vue/script-indent': ['error', 2, {
      baseIndent: 0,
      switchCase: 1
    }],
    'vue/script-setup-uses-vars': 2,
    'vue/singleline-html-element-content-newline': ['off'],
    'vue/v-for-delimiter-style': ['error', 'in'],
    'vue/v-on-event-hyphenation': ['error', 'never'],
    'vue/v-slot-style': ['error', {
      atComponent: 'shorthand',
      default: 'shorthand',
      named: 'shorthand'
    }],
    'vue-scoped-css/enforce-style-type': ['error', { allows: ['module'] }],
    'yield-star-spacing': ['error', { before: true, after: false }]
  },
  ignorePatterns: [
    'node_modules'
  ],
  overrides: [
    {
      files: [
        '**/*.spec.{j,t}s?(x)'
      ],
      rules: {
        'object-literal-sort-keys': 'off',
        'no-console': 'off',
        'max-len': 'off',
        'no-return-assign': 'off',
        'import/no-named-default': 'off',
        'prefer-destructuring': 'off',
        'vue/require-prop-types': 'off',
        'vue/require-name-property': 'off',
        'vue/match-component-file-name': 'off'
      },
      env: {
        jest: true
      }
    },
    {
      files: ['*.vue'],
      rules: {
        indent: 'off'
      }
    },
    {
      files: ['typeDefinitions.ts'],
      rules: {
        'max-len': 'off'
      }
    }
  ],
  globals: {
    Maybe: true,
    '$fetch': true
  },
  plugins: [

    //   '@nrwl/nx'
  ]
};
