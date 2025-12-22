function ethicalStub(prompt) {
    if (/hack|crime|illegal/i.test(prompt)) return "Rejected: Ethical response only.";
    return prompt;
}