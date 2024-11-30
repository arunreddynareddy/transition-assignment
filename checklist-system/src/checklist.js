const { checklistRules } = require('./config');

// Evaluate the checklist based on the given data
function evaluateChecklist(data) {
    const results = checklistRules.map(rule => {
        const conditionMet = rule.condition(data);
        return {
            rule: rule.name,
            status: conditionMet ? 'Passed' : 'Failed'
        };
    });

    return results;
}

module.exports = { evaluateChecklist };
