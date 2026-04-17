import { CriterionModifier } from "src/core/generated-graphql";
import TextUtils from "src/utils/text";
const modifierMessageIDs = {
	[CriterionModifier.Equals]: "criterion_modifier.equals",
	[CriterionModifier.NotEquals]: "criterion_modifier.not_equals",
	[CriterionModifier.GreaterThan]: "criterion_modifier.greater_than",
	[CriterionModifier.LessThan]: "criterion_modifier.less_than",
	[CriterionModifier.IsNull]: "criterion_modifier.is_null",
	[CriterionModifier.NotNull]: "criterion_modifier.not_null",
	[CriterionModifier.Includes]: "criterion_modifier.includes",
	[CriterionModifier.IncludesAll]: "criterion_modifier.includes_all",
	[CriterionModifier.Excludes]: "criterion_modifier.excludes",
	[CriterionModifier.MatchesRegex]: "criterion_modifier.matches_regex",
	[CriterionModifier.NotMatchesRegex]: "criterion_modifier.not_matches_regex",
	[CriterionModifier.Between]: "criterion_modifier.between",
	[CriterionModifier.NotBetween]: "criterion_modifier.not_between",
};
export class Criterion {
	constructor(type) {
		Object.defineProperty(this, "criterionOption", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		this.criterionOption = type;
	}
	isValid() {
		return true;
	}
	clone() {
		const ret = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
		ret.cloneValues();
		return ret;
	}
	cloneValues() {}
	getId() {
		return `${this.criterionOption.type}`;
	}
}
// V = criterion value type
export class ModifierCriterion extends Criterion {
	get modifier() {
		return this._modifier;
	}
	set modifier(value) {
		this._modifier = value;
	}
	get value() {
		return this._value;
	}
	set value(newValue) {
		this._value = newValue;
	}
	isValid() {
		return true;
	}
	constructor(type, value) {
		super(type);
		Object.defineProperty(this, "_modifier", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "_value", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		this.modifier = type.defaultModifier;
		this.value = value;
	}
	modifierCriterionOption() {
		return this.criterionOption;
	}
	clone() {
		const ret = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
		ret.cloneValues();
		return ret;
	}
	cloneValues() {}
	static getModifierLabel(intl, modifier) {
		const modifierMessageID = modifierMessageIDs[modifier];
		return modifierMessageID
			? intl.formatMessage({ id: modifierMessageID })
			: "";
	}
	getLabel(intl, sfwContentMode = false) {
		var _a;
		const modifierString = ModifierCriterion.getModifierLabel(
			intl,
			this.modifier,
		);
		let valueString = "";
		if (
			this.modifier !== CriterionModifier.IsNull &&
			this.modifier !== CriterionModifier.NotNull
		) {
			valueString = this.getLabelValue(intl);
		}
		const messageID = !sfwContentMode
			? this.criterionOption.messageID
			: (_a = this.criterionOption.sfwMessageID) !== null && _a !== void 0
				? _a
				: this.criterionOption.messageID;
		return intl.formatMessage(
			{ id: "criterion_modifier.format_string" },
			{
				criterion: intl.formatMessage({ id: messageID }),
				modifierString,
				valueString,
			},
		);
	}
	toQueryParams() {
		let encodedCriterion = {
			type: this.criterionOption.type,
			modifier: this.modifier,
		};
		if (
			this.modifier !== CriterionModifier.IsNull &&
			this.modifier !== CriterionModifier.NotNull
		) {
			encodedCriterion.value = this.encodeValue();
		}
		return encodedCriterion;
	}
	encodeValue() {
		return this.value;
	}
	decodeValue(v) {
		if (v !== undefined && v !== null) {
			this.value = v;
		}
	}
	fromDecodedParams(i) {
		// use same logic as from saved criterion by default
		const c = i;
		this.modifier = c.modifier;
		this.decodeValue(c.value);
	}
	setFromSavedCriterion(criterion) {
		const c = criterion;
		if (c.value !== undefined && c.value !== null) {
			this.value = c.value;
		}
		this.modifier = c.modifier;
	}
	applyToCriterionInput(input) {
		input[this.criterionOption.type] = this.toCriterionInput();
	}
	// TODO - saved criterion _should_ be criterion input
	// kicking this can down the road a little further
	applyToSavedCriterion(input) {
		input[this.criterionOption.type] = {
			value: this.value,
			modifier: this.modifier,
		};
	}
	toCriterionInput() {
		return {
			value: this.value,
			modifier: this.modifier,
		};
	}
}
export class CriterionOption {
	constructor(options) {
		var _a;
		Object.defineProperty(this, "type", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "messageID", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "makeCriterionFn", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "sfwMessageID", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		// used for legacy criteria that are not shown in the UI
		Object.defineProperty(this, "hidden", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: false,
		});
		this.type = options.type;
		this.messageID = options.messageID;
		this.makeCriterionFn = options.makeCriterion;
		this.hidden = (_a = options.hidden) !== null && _a !== void 0 ? _a : false;
		this.sfwMessageID = options.sfwMessageID;
	}
	makeCriterion(config) {
		return this.makeCriterionFn(this, config);
	}
}
export class ModifierCriterionOption extends CriterionOption {
	constructor(options) {
		var _a, _b;
		super(options);
		Object.defineProperty(this, "modifierOptions", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "defaultModifier", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "options", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "inputType", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		this.modifierOptions =
			(_a = options.modifierOptions) !== null && _a !== void 0 ? _a : [];
		this.defaultModifier =
			(_b = options.defaultModifier) !== null && _b !== void 0
				? _b
				: CriterionModifier.Equals;
		this.options = options.options;
		this.inputType = options.inputType;
	}
}
export class ILabeledIdCriterionOption extends ModifierCriterionOption {
	constructor(messageID, value, includeAll, inputType, makeCriterion) {
		const modifierOptions = [
			CriterionModifier.Includes,
			CriterionModifier.Excludes,
			CriterionModifier.IsNull,
			CriterionModifier.NotNull,
		];
		let defaultModifier = CriterionModifier.Includes;
		if (includeAll) {
			modifierOptions.unshift(CriterionModifier.IncludesAll);
			defaultModifier = CriterionModifier.IncludesAll;
		}
		super({
			messageID,
			type: value,
			modifierOptions,
			defaultModifier,
			inputType,
			makeCriterion: makeCriterion
				? makeCriterion
				: () => new ILabeledIdCriterion(this),
		});
	}
}
export class ILabeledIdCriterion extends ModifierCriterion {
	constructor(type, value = []) {
		super(type, value);
	}
	cloneValues() {
		this.value = this.value.map((v) => ({ ...v }));
	}
	getLabelValue(_intl) {
		return this.value.map((v) => v.label).join(", ");
	}
	toCriterionInput() {
		return {
			value: this.value.map((v) => v.id),
			modifier: this.modifier,
		};
	}
	isValid() {
		if (
			this.modifier === CriterionModifier.IsNull ||
			this.modifier === CriterionModifier.NotNull
		) {
			return true;
		}
		return this.value.length > 0;
	}
}
export class IHierarchicalLabeledIdCriterion extends ModifierCriterion {
	constructor(
		type,
		value = {
			items: [],
			excluded: [],
			depth: 0,
		},
	) {
		super(type, value);
	}
	cloneValues() {
		this.value = {
			...this.value,
			items: this.value.items.map((v) => ({ ...v })),
			excluded: this.value.excluded.map((v) => ({ ...v })),
		};
	}
	get modifier() {
		return this._modifier;
	}
	set modifier(value) {
		this._modifier = value;
		// excluded only makes sense for includes and includes all
		// so reset it for other modifiers
		if (
			this.value &&
			value !== CriterionModifier.Includes &&
			value !== CriterionModifier.IncludesAll
		) {
			this.value.excluded = [];
		}
	}
	setFromSavedCriterion(criterion) {
		var _a;
		const { modifier, value } = criterion;
		if (value !== undefined) {
			this.value = {
				items: value.items || [],
				excluded: value.excluded || [],
				depth: value.depth || 0,
			};
		}
		const modifierOptions =
			(_a = this.criterionOption.modifierOptions) !== null && _a !== void 0
				? _a
				: [];
		// if the previous modifier was excludes, replace it with the equivalent includes criterion
		// this is what is done on the backend
		// only replace if excludes is not a valid modifierOption
		if (
			modifier === CriterionModifier.Excludes &&
			modifierOptions.find((m) => m === CriterionModifier.Excludes) ===
				undefined
		) {
			this.modifier = CriterionModifier.Includes;
			this.value.excluded = [...this.value.excluded, ...this.value.items];
			this.value.items = [];
		} else {
			this.modifier = modifier;
		}
	}
	getLabelValue(_intl) {
		var _a;
		const labels = ((_a = this.value.items) !== null && _a !== void 0 ? _a : [])
			.map((v) => v.label)
			.join(", ");
		if (this.value.depth === 0) {
			return labels;
		}
		return `${labels} (+${this.value.depth > 0 ? this.value.depth : "all"})`;
	}
	toCriterionInput() {
		let excludes = [];
		// if modifier is equals, depth must be 0
		const depth =
			this.modifier === CriterionModifier.Equals ? 0 : this.value.depth;
		if (this.value.excluded) {
			excludes = this.value.excluded.map((v) => v.id);
		}
		return {
			value: this.value.items.map((v) => v.id),
			excludes: excludes,
			modifier: this.modifier,
			depth,
		};
	}
	isValid() {
		if (
			this.modifier === CriterionModifier.IsNull ||
			this.modifier === CriterionModifier.NotNull
		) {
			return true;
		}
		return (
			this.value.items.length > 0 ||
			(this.value.excluded && this.value.excluded.length > 0)
		);
	}
	getLabel(intl, sfwContentMode) {
		var _a;
		let id = "criterion_modifier.format_string";
		let modifierString = ModifierCriterion.getModifierLabel(
			intl,
			this.modifier,
		);
		let valueString = "";
		let excludedString = "";
		if (
			this.modifier !== CriterionModifier.IsNull &&
			this.modifier !== CriterionModifier.NotNull
		) {
			valueString = this.value.items.map((v) => v.label).join(", ");
			if (this.value.excluded && this.value.excluded.length > 0) {
				if (this.value.items.length === 0) {
					modifierString = ModifierCriterion.getModifierLabel(
						intl,
						CriterionModifier.Excludes,
					);
					valueString = this.value.excluded.map((v) => v.label).join(", ");
				} else {
					id = "criterion_modifier.format_string_excludes";
					excludedString = this.value.excluded.map((v) => v.label).join(", ");
				}
			}
			if (this.value.depth !== 0) {
				id += "_depth";
			}
		}
		const messageID = !sfwContentMode
			? this.criterionOption.messageID
			: (_a = this.criterionOption.sfwMessageID) !== null && _a !== void 0
				? _a
				: this.criterionOption.messageID;
		return intl.formatMessage(
			{ id },
			{
				criterion: intl.formatMessage({ id: messageID }),
				modifierString,
				valueString,
				excludedString,
				depth: this.value.depth,
			},
		);
	}
}
export class StringCriterionOption extends ModifierCriterionOption {
	constructor(options) {
		super({
			modifierOptions: [
				CriterionModifier.Equals,
				CriterionModifier.NotEquals,
				CriterionModifier.Includes,
				CriterionModifier.Excludes,
				CriterionModifier.IsNull,
				CriterionModifier.NotNull,
				CriterionModifier.MatchesRegex,
				CriterionModifier.NotMatchesRegex,
			],
			defaultModifier: CriterionModifier.Equals,
			inputType: "text",
			makeCriterion: () => new StringCriterion(this),
			...options,
		});
	}
}
export function createStringCriterionOption(type, messageID, options) {
	return new StringCriterionOption({
		messageID: messageID !== null && messageID !== void 0 ? messageID : type,
		type,
		...options,
	});
}
export class MandatoryStringCriterionOption extends ModifierCriterionOption {
	constructor(messageID, value) {
		super({
			messageID,
			type: value,
			modifierOptions: [
				CriterionModifier.Equals,
				CriterionModifier.NotEquals,
				CriterionModifier.Includes,
				CriterionModifier.Excludes,
				CriterionModifier.MatchesRegex,
				CriterionModifier.NotMatchesRegex,
			],
			defaultModifier: CriterionModifier.Equals,
			inputType: "text",
			makeCriterion: () => new StringCriterion(this),
		});
	}
}
export function createMandatoryStringCriterionOption(value, messageID) {
	return new MandatoryStringCriterionOption(
		messageID !== null && messageID !== void 0 ? messageID : value,
		value,
	);
}
export class StringCriterion extends ModifierCriterion {
	constructor(type) {
		super(type, "");
	}
	getLabelValue(_intl) {
		return this.value;
	}
	isValid() {
		return (
			this.modifier === CriterionModifier.IsNull ||
			this.modifier === CriterionModifier.NotNull ||
			this.value.length > 0
		);
	}
}
export class MultiStringCriterion extends ModifierCriterion {
	constructor(type, value = []) {
		super(type, value);
	}
	cloneValues() {
		this.value = this.value.slice();
	}
	getLabelValue(_intl) {
		return this.value.join(", ");
	}
	isValid() {
		return (
			this.modifier === CriterionModifier.IsNull ||
			this.modifier === CriterionModifier.NotNull ||
			this.value.length > 0
		);
	}
}
export class BooleanCriterionOption extends ModifierCriterionOption {
	constructor(messageID, value, makeCriterion) {
		super({
			messageID,
			type: value,
			modifierOptions: [],
			defaultModifier: CriterionModifier.Equals,
			options: ["true", "false"],
			makeCriterion: makeCriterion
				? makeCriterion
				: () => new BooleanCriterion(this),
		});
	}
}
export function createBooleanCriterionOption(value, messageID) {
	return new BooleanCriterionOption(
		messageID !== null && messageID !== void 0 ? messageID : value,
		value,
	);
}
export class BooleanCriterion extends StringCriterion {
	toCriterionInput() {
		return this.value === "true";
	}
	isValid() {
		return this.value === "true" || this.value === "false";
	}
}
export class StringBooleanCriterionOption extends ModifierCriterionOption {
	constructor(messageID, value, makeCriterion) {
		super({
			messageID,
			type: value,
			options: ["true", "false"],
			makeCriterion: makeCriterion
				? makeCriterion
				: () => new StringBooleanCriterion(this),
		});
	}
}
export class StringBooleanCriterion extends StringCriterion {
	toCriterionInput() {
		return this.value;
	}
	isValid() {
		return this.value === "true" || this.value === "false";
	}
}
export class NumberCriterionOption extends ModifierCriterionOption {
	constructor(messageID, value) {
		super({
			messageID,
			type: value,
			modifierOptions: [
				CriterionModifier.Equals,
				CriterionModifier.NotEquals,
				CriterionModifier.GreaterThan,
				CriterionModifier.LessThan,
				CriterionModifier.IsNull,
				CriterionModifier.NotNull,
				CriterionModifier.Between,
				CriterionModifier.NotBetween,
			],
			defaultModifier: CriterionModifier.Equals,
			inputType: "number",
			makeCriterion: () => new NumberCriterion(this),
		});
	}
}
export function createNumberCriterionOption(value, messageID) {
	return new NumberCriterionOption(
		messageID !== null && messageID !== void 0 ? messageID : value,
		value,
	);
}
export class NullNumberCriterionOption extends ModifierCriterionOption {
	constructor(messageID, value, makeCriterion) {
		super({
			messageID,
			type: value,
			modifierOptions: [
				CriterionModifier.Equals,
				CriterionModifier.NotEquals,
				CriterionModifier.GreaterThan,
				CriterionModifier.LessThan,
				CriterionModifier.Between,
				CriterionModifier.NotBetween,
				CriterionModifier.IsNull,
				CriterionModifier.NotNull,
			],
			defaultModifier: CriterionModifier.Equals,
			inputType: "number",
			makeCriterion: makeCriterion
				? makeCriterion
				: () => new NumberCriterion(this),
		});
	}
}
export function createNullNumberCriterionOption(value, messageID) {
	return new NullNumberCriterionOption(
		messageID !== null && messageID !== void 0 ? messageID : value,
		value,
	);
}
export class MandatoryNumberCriterionOption extends ModifierCriterionOption {
	constructor(messageID, value, makeCriterion, options) {
		super({
			messageID,
			type: value,
			modifierOptions: [
				CriterionModifier.Equals,
				CriterionModifier.NotEquals,
				CriterionModifier.GreaterThan,
				CriterionModifier.LessThan,
				CriterionModifier.Between,
				CriterionModifier.NotBetween,
			],
			defaultModifier: CriterionModifier.Equals,
			inputType: "number",
			makeCriterion: makeCriterion
				? makeCriterion
				: () => new NumberCriterion(this),
			...options,
		});
	}
}
export function createMandatoryNumberCriterionOption(
	value,
	messageID,
	options,
) {
	return new MandatoryNumberCriterionOption(
		messageID !== null && messageID !== void 0 ? messageID : value,
		value,
		undefined,
		options,
	);
}
export function encodeRangeValue(modifier, value) {
	// only encode value2 if modifier is between/not between
	if (
		modifier === CriterionModifier.Between ||
		modifier === CriterionModifier.NotBetween
	) {
		return { value: value.value, value2: value.value2 };
	}
	return { value: value.value };
}
export function decodeRangeValue(v) {
	// handle backwards compatible value
	if (typeof v.value === "object") {
		return v.value;
	} else {
		return { value: v.value, value2: v.value2 };
	}
}
export class NumberCriterion extends ModifierCriterion {
	constructor(type) {
		super(type, { value: undefined, value2: undefined });
	}
	cloneValues() {
		this.value = { ...this.value };
	}
	get value() {
		return this._value;
	}
	set value(newValue) {
		// backwards compatibility - if this.value is a number, use that
		if (typeof newValue !== "object") {
			this._value = {
				value: newValue,
				value2: undefined,
			};
		} else {
			this._value = newValue;
		}
	}
	toCriterionInput() {
		var _a, _b, _c;
		return {
			modifier: this.modifier,
			value:
				(_b =
					(_a = this.value) === null || _a === void 0 ? void 0 : _a.value) !==
					null && _b !== void 0
					? _b
					: 0,
			value2: (_c = this.value) === null || _c === void 0 ? void 0 : _c.value2,
		};
	}
	setFromSavedCriterion(c) {
		super.setFromSavedCriterion(c);
		// this.value = decodeRangeValue(c);
	}
	encodeValue() {
		return encodeRangeValue(this.modifier, this.value);
	}
	getLabelValue(_intl) {
		const { value, value2 } = this.value;
		if (
			this.modifier === CriterionModifier.Between ||
			this.modifier === CriterionModifier.NotBetween
		) {
			return `${value}, ${value2 !== null && value2 !== void 0 ? value2 : 0}`;
		} else {
			return `${value}`;
		}
	}
	isValid() {
		if (
			this.modifier === CriterionModifier.IsNull ||
			this.modifier === CriterionModifier.NotNull
		) {
			return true;
		}
		const { value, value2 } = this.value;
		if (value === undefined) {
			return false;
		}
		if (
			value2 === undefined &&
			(this.modifier === CriterionModifier.Between ||
				this.modifier === CriterionModifier.NotBetween)
		) {
			return false;
		}
		return true;
	}
}
export class DurationCriterionOption extends MandatoryNumberCriterionOption {
	constructor(messageID, value) {
		super(messageID, value, () => new DurationCriterion(this));
	}
}
export function createDurationCriterionOption(value, messageID) {
	return new DurationCriterionOption(
		messageID !== null && messageID !== void 0 ? messageID : value,
		value,
	);
}
export class NullDurationCriterionOption extends NullNumberCriterionOption {
	constructor(messageID, value) {
		super(messageID, value, () => new DurationCriterion(this));
	}
}
export function createNullDurationCriterionOption(value, messageID) {
	return new NullDurationCriterionOption(
		messageID !== null && messageID !== void 0 ? messageID : value,
		value,
	);
}
export class DurationCriterion extends ModifierCriterion {
	constructor(type) {
		super(type, { value: undefined, value2: undefined });
	}
	cloneValues() {
		this.value = { ...this.value };
	}
	toCriterionInput() {
		var _a, _b, _c;
		return {
			modifier: this.modifier,
			value:
				(_b =
					(_a = this.value) === null || _a === void 0 ? void 0 : _a.value) !==
					null && _b !== void 0
					? _b
					: 0,
			value2: (_c = this.value) === null || _c === void 0 ? void 0 : _c.value2,
		};
	}
	setFromSavedCriterion(c) {
		super.setFromSavedCriterion(c);
		// this.value = decodeRangeValue(c);
	}
	encodeValue() {
		return encodeRangeValue(this.modifier, this.value);
	}
	getLabelValue(_intl) {
		var _a, _b;
		const value = TextUtils.secondsToTimestamp(
			(_a = this.value.value) !== null && _a !== void 0 ? _a : 0,
		);
		const value2 = TextUtils.secondsToTimestamp(
			(_b = this.value.value2) !== null && _b !== void 0 ? _b : 0,
		);
		if (
			this.modifier === CriterionModifier.Between ||
			this.modifier === CriterionModifier.NotBetween
		) {
			return `${value}, ${value2}`;
		} else {
			return value;
		}
	}
	isValid() {
		if (
			this.modifier === CriterionModifier.IsNull ||
			this.modifier === CriterionModifier.NotNull
		) {
			return true;
		}
		const { value, value2 } = this.value;
		if (value === undefined) {
			return false;
		}
		if (
			value2 === undefined &&
			(this.modifier === CriterionModifier.Between ||
				this.modifier === CriterionModifier.NotBetween)
		) {
			return false;
		}
		return true;
	}
}
export class DateCriterionOption extends ModifierCriterionOption {
	constructor(messageID, value) {
		super({
			messageID,
			type: value,
			modifierOptions: [
				CriterionModifier.Equals,
				CriterionModifier.NotEquals,
				CriterionModifier.GreaterThan,
				CriterionModifier.LessThan,
				CriterionModifier.IsNull,
				CriterionModifier.NotNull,
				CriterionModifier.Between,
				CriterionModifier.NotBetween,
			],
			defaultModifier: CriterionModifier.Equals,
			inputType: "text",
			makeCriterion: () => new DateCriterion(this),
		});
	}
}
export function createDateCriterionOption(value) {
	return new DateCriterionOption(value, value);
}
export class DateCriterion extends ModifierCriterion {
	constructor(type) {
		super(type, { value: "", value2: undefined });
	}
	cloneValues() {
		this.value = { ...this.value };
	}
	setFromSavedCriterion(c) {
		super.setFromSavedCriterion(c);
		// this.value = decodeRangeValue(c);
	}
	encodeValue() {
		return encodeRangeValue(this.modifier, this.value);
	}
	toCriterionInput() {
		var _a, _b, _c;
		return {
			modifier: this.modifier,
			value:
				(_b =
					(_a = this.value) === null || _a === void 0 ? void 0 : _a.value) !==
					null && _b !== void 0
					? _b
					: "",
			value2: (_c = this.value) === null || _c === void 0 ? void 0 : _c.value2,
		};
	}
	getLabelValue() {
		const { value } = this.value;
		return this.modifier === CriterionModifier.Between ||
			this.modifier === CriterionModifier.NotBetween
			? `${value}, ${this.value.value2}`
			: `${value}`;
	}
	isValid() {
		if (
			this.modifier === CriterionModifier.IsNull ||
			this.modifier === CriterionModifier.NotNull
		) {
			return true;
		}
		const { value, value2 } = this.value;
		if (!value) {
			return false;
		}
		if (
			!value2 &&
			(this.modifier === CriterionModifier.Between ||
				this.modifier === CriterionModifier.NotBetween)
		) {
			return false;
		}
		return true;
	}
}
export class TimestampCriterionOption extends ModifierCriterionOption {
	constructor(messageID, value) {
		super({
			messageID,
			type: value,
			modifierOptions: [
				CriterionModifier.GreaterThan,
				CriterionModifier.LessThan,
				CriterionModifier.IsNull,
				CriterionModifier.NotNull,
				CriterionModifier.Between,
				CriterionModifier.NotBetween,
			],
			defaultModifier: CriterionModifier.GreaterThan,
			inputType: "text",
			makeCriterion: () => new TimestampCriterion(this),
		});
	}
}
export function createTimestampCriterionOption(value) {
	return new TimestampCriterionOption(value, value);
}
export class MandatoryTimestampCriterionOption extends ModifierCriterionOption {
	constructor(messageID, value) {
		super({
			messageID,
			type: value,
			modifierOptions: [
				CriterionModifier.GreaterThan,
				CriterionModifier.LessThan,
				CriterionModifier.Between,
				CriterionModifier.NotBetween,
			],
			defaultModifier: CriterionModifier.GreaterThan,
			inputType: "text",
			makeCriterion: () => new TimestampCriterion(this),
		});
	}
}
export function createMandatoryTimestampCriterionOption(value) {
	return new MandatoryTimestampCriterionOption(value, value);
}
export class TimestampCriterion extends ModifierCriterion {
	constructor(type) {
		super(type, { value: "", value2: undefined });
	}
	cloneValues() {
		this.value = { ...this.value };
	}
	toCriterionInput() {
		var _a;
		return {
			modifier: this.modifier,
			value: this.transformValueToInput(
				(_a = this.value.value) !== null && _a !== void 0 ? _a : "",
			),
			value2: this.value.value2
				? this.transformValueToInput(this.value.value2)
				: null,
		};
	}
	setFromSavedCriterion(c) {
		super.setFromSavedCriterion(c);
		this.value = decodeRangeValue(c);
	}
	encodeValue() {
		return encodeRangeValue(this.modifier, this.value);
	}
	getLabelValue() {
		const { value } = this.value;
		return this.modifier === CriterionModifier.Between ||
			this.modifier === CriterionModifier.NotBetween
			? `${value}, ${this.value.value2}`
			: `${value}`;
	}
	transformValueToInput(value) {
		value = value.trim();
		if (/^\d{4}-\d{2}-\d{2}(( |T)\d{2}:\d{2})?$/.test(value)) {
			return value.replace(" ", "T");
		}
		return "";
	}
	isValid() {
		if (
			this.modifier === CriterionModifier.IsNull ||
			this.modifier === CriterionModifier.NotNull
		) {
			return true;
		}
		const { value, value2 } = this.value;
		if (!value) {
			return false;
		}
		if (
			!value2 &&
			(this.modifier === CriterionModifier.Between ||
				this.modifier === CriterionModifier.NotBetween)
		) {
			return false;
		}
		return true;
	}
}
export class UnsupportedCriterionOption extends StringCriterionOption {
	constructor(type) {
		super({
			messageID: "unsupported_criterion",
			type: type,
			makeCriterion: () => new UnsupportedCriterion(this),
		});
	}
}
export class UnsupportedCriterion extends StringCriterion {
	getLabel(intl) {
		const modifierString = ModifierCriterion.getModifierLabel(
			intl,
			this.modifier,
		);
		let valueString = "";
		if (
			this.modifier !== CriterionModifier.IsNull &&
			this.modifier !== CriterionModifier.NotNull
		) {
			valueString = this.getLabelValue(intl);
		}
		return intl.formatMessage(
			{ id: "criterion_modifier.format_string" },
			{
				criterion: intl.formatMessage(
					{ id: "criterion.unsupported" },
					{ type: this.criterionOption.type },
				),
				modifierString,
				valueString,
			},
		);
	}
	applyToCriterionInput() {
		// do nothing
	}
	applyToSavedCriterion() {
		// do nothing
	}
	setFromSavedCriterion() {
		// do nothing
	}
}
//# sourceMappingURL=criterion.js.map
