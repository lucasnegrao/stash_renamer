"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicatedCriterion = exports.DuplicatedCriterionOption = exports.PhashCriterion = exports.PhashCriterionOption = exports.DUPLICATION_FIELD_IDS = exports.DUPLICATION_FIELD_MESSAGE_IDS = void 0;
const generated_graphql_1 = require("src/core/generated-graphql");
const criterion_1 = require("./criterion");
// Shared mapping of duplication field IDs to their i18n message IDs
exports.DUPLICATION_FIELD_MESSAGE_IDS = {
    phash: "media_info.phash",
    stash_id: "stash_id",
    title: "title",
    url: "url",
};
exports.DUPLICATION_FIELD_IDS = [
    "phash",
    "stash_id",
    "title",
    "url",
];
exports.PhashCriterionOption = new criterion_1.ModifierCriterionOption({
    messageID: "media_info.phash",
    type: "phash_distance",
    inputType: "text",
    modifierOptions: [
        generated_graphql_1.CriterionModifier.Equals,
        generated_graphql_1.CriterionModifier.NotEquals,
        generated_graphql_1.CriterionModifier.IsNull,
        generated_graphql_1.CriterionModifier.NotNull,
    ],
    makeCriterion: () => new PhashCriterion(),
});
class PhashCriterion extends criterion_1.ModifierCriterion {
    constructor() {
        super(exports.PhashCriterionOption, { value: "", distance: 0 });
    }
    cloneValues() {
        this.value = { ...this.value };
    }
    getLabelValue() {
        const { value, distance } = this.value;
        if ((this.modifier === generated_graphql_1.CriterionModifier.Equals ||
            this.modifier === generated_graphql_1.CriterionModifier.NotEquals) &&
            distance) {
            return `${value} (${distance})`;
        }
        else {
            return `${value}`;
        }
    }
    toCriterionInput() {
        return {
            value: this.value.value,
            modifier: this.modifier,
            distance: this.value.distance,
        };
    }
}
exports.PhashCriterion = PhashCriterion;
exports.DuplicatedCriterionOption = new criterion_1.ModifierCriterionOption({
    messageID: "duplicated",
    type: "duplicated",
    modifierOptions: [], // No modifiers for this filter
    defaultModifier: generated_graphql_1.CriterionModifier.Equals,
    makeCriterion: () => new DuplicatedCriterion(),
});
class DuplicatedCriterion extends criterion_1.ModifierCriterion {
    constructor() {
        super(exports.DuplicatedCriterionOption, {});
    }
    cloneValues() {
        this.value = { ...this.value };
    }
    // Override getLabel to provide custom formatting for duplication fields
    getLabel(intl) {
        const parts = [];
        const trueLabel = intl.formatMessage({ id: "true" });
        const falseLabel = intl.formatMessage({ id: "false" });
        for (const fieldId of exports.DUPLICATION_FIELD_IDS) {
            const fieldValue = this.value[fieldId];
            if (fieldValue !== undefined) {
                const label = intl.formatMessage({
                    id: exports.DUPLICATION_FIELD_MESSAGE_IDS[fieldId],
                });
                parts.push(`${label}: ${fieldValue ? trueLabel : falseLabel}`);
            }
        }
        // Handle legacy duplicated field
        if (parts.length === 0 && this.value.duplicated !== undefined) {
            const label = intl.formatMessage({ id: "duplicated_phash" });
            return `${label}: ${this.value.duplicated ? trueLabel : falseLabel}`;
        }
        if (parts.length === 0) {
            return intl.formatMessage({ id: "duplicated" });
        }
        return parts.join(", ");
    }
    getLabelValue(intl) {
        // Required by abstract class - returns basic label when getLabel isn't overridden
        return intl.formatMessage({ id: "duplicated" });
    }
    toCriterionInput() {
        return {
            duplicated: this.value.duplicated,
            distance: this.value.distance,
            phash: this.value.phash,
            url: this.value.url,
            stash_id: this.value.stash_id,
            title: this.value.title,
        };
    }
    // Override to handle legacy saved formats
    setFromSavedCriterion(criterion) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const c = criterion;
        // Handle various saved formats
        if (c.value !== undefined) {
            // New format: { value: { phash: true, ... } }
            if (typeof c.value === "object") {
                this.value = c.value;
            }
            else if (typeof c.value === "string") {
                // Legacy format: { value: "true" } - convert to phash
                this.value = { phash: c.value === "true" };
            }
        }
        else if (typeof c === "object") {
            // Direct value format
            this.value = c;
        }
        if (c.modifier) {
            this.modifier = c.modifier;
        }
    }
    isValid() {
        // Check if any duplication field is set
        const hasFieldSet = exports.DUPLICATION_FIELD_IDS.some((fieldId) => this.value[fieldId] !== undefined);
        return hasFieldSet || this.value.duplicated !== undefined;
    }
}
exports.DuplicatedCriterion = DuplicatedCriterion;
//# sourceMappingURL=phash.js.map