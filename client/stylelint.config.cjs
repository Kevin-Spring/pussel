module.exports = {
	extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order', 'stylelint-config-prettier-scss'],
	plugins: ['stylelint-declaration-block-no-ignored-properties', 'stylelint-selector-pseudo-class-lvhfa'],
	rules: {
		'selector-class-pattern': null,
		'scss/percent-placeholder-pattern': null,
		'plugin/declaration-block-no-ignored-properties': true,
		'unit-no-unknown': [true, {}],
		'property-no-vendor-prefix': null,
		'value-no-vendor-prefix': null,
		'at-rule-no-vendor-prefix': null,
		'selector-no-vendor-prefix': null,
		'no-descending-specificity': null,
		'block-no-empty': [true, { severity: 'warning' }],
		'declaration-empty-line-before': [
			'always',
			{
				except: ['first-nested', 'after-declaration', 'after-comment'],
			},
		],
		'at-rule-empty-line-before': [
			'always',
			{
				ignore: ['first-nested', 'blockless-after-same-name-blockless', 'after-comment'],
				ignoreAtRules: 'else',
			},
		],
		'declaration-property-value-disallowed-list': [
			{
				transition: ['$trns-base'],
			},
			{
				message: 'Use @extend %trns-base instead',
			},
		],
		'order/order': [
			[
				{ type: 'at-rule', name: 'import' },
				{ type: 'at-rule', name: 'forward' },
				{ type: 'at-rule', name: 'use' },
				'dollar-variables',
				'at-variables',
				'custom-properties',
				{ type: 'at-rule', name: 'custom-media' },
				{ type: 'at-rule', name: 'function' },
				{ type: 'at-rule', name: 'mixin' },
				{ type: 'at-rule', name: 'extend' },
				{ type: 'at-rule', name: 'include' },
				'declarations',
				{
					type: 'rule',
					selector: /^(.*):link/,
				},
				{
					type: 'rule',
					selector: /^(.*):visited/,
				},
				{
					type: 'rule',
					selector: /^(.*):hover/,
				},
				{
					type: 'rule',
					selector: /^(.*):focus/,
				},
				{
					type: 'rule',
					selector: /^(.*):active/,
				},
				{
					type: 'rule',
					selector: /^(.*):checked/,
					hasBlock: true,
				},
				{
					type: 'rule',
					selector: /^(.*):disabled/,
					hasBlock: true,
				},
				{
					type: 'rule',
					selector: /^(.*):first-child/,
					hasBlock: true,
				},
				{
					type: 'rule',
					selector: /^(.*):first-of-type/,
					hasBlock: true,
				},
				{
					type: 'rule',
					selector: /^(.*):last-child/,
					hasBlock: true,
				},
				{
					type: 'rule',
					selector: /^(.*):last-of-type/,
					hasBlock: true,
				},
				{
					type: 'rule',
					selector: /^(.*):(?!where)/,
					hasBlock: true,
				},
				{
					type: 'rule',
					selector: /^(.*):(is|not)/,
					hasBlock: true,
				},
				{
					type: 'rule',
					selector: /^(.*)::before/,
					hasBlock: true,
				},
				{
					type: 'rule',
					selector: /^(.*)::after/,
					hasBlock: true,
				},
				{
					type: 'rule',
					selector: /^(.*)::/,
					hasBlock: true,
				},
				{
					type: 'rule',
					selector: /&-/,
					hasBlock: true,
				},
				{
					type: 'rule',
					selector: /&./,
					hasBlock: true,
				},
				{
					type: 'rule',
					selector: /./,
					hasBlock: true,
				},
				{ type: 'at-rule', name: 'include', hasBlock: true },
				{ type: 'at-rule', name: 'media', hasBlock: true },
			],
			{
				severity: 'warning',
			},
		],
		'plugin/selector-pseudo-class-lvhfa': true,
	},
};
