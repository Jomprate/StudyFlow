export const handleEmailValidation = (
    e: React.ChangeEvent<HTMLInputElement>,
    t: (key: string) => string
): void => {
    const emailValue = e.target.value;
    const atSymbolMissing = !emailValue.includes('@');
    const dotMissing = !emailValue.includes('.');
    const atPosition = emailValue.indexOf('@');
    const dotPosition = emailValue.lastIndexOf('.');

    if (atSymbolMissing) {
        e.target.setCustomValidity(t('login_error_atSymbolMissing'));
    } else if (atPosition === emailValue.length - 1 || emailValue[atPosition + 1] === '.') {
        e.target.setCustomValidity(t('login_error_domainMissing'));
    } else if (dotMissing || dotPosition < atPosition + 2) {
        e.target.setCustomValidity(t('login_error_dotMissing'));
    } else if (dotPosition === emailValue.length - 1 || emailValue[dotPosition + 1] === '') {
        e.target.setCustomValidity(t('login_error_invalidDomain'));
    } else {
        e.target.setCustomValidity('');
    }
};