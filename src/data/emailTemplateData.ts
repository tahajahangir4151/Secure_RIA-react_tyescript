import logoUrl from "../images/png-clipart-paypal-logo-paypal-blue-text-removebg-preview.png"

export interface Email {
    from: string,
    to: string,
    date: string,
    subject: string,
    message: string,
    eventOccured: string,
    authenticationMessage: string,
    Regards: string,
    logoUrl: string
}

export const emailTemplateData: Email = {
    from: "Account Support <example@gmail.com>",
    to: "Recipient <recipient@gmail.com>",
    date: "Monday, February 15, 2021 6:01:04 AM",
    subject: "Re: Your account has been filtered by our system for authentication.",
    message: `
    Your account has been filtered by our system for authentication. Please view the possible events listed below for this cause.`,

    eventOccured: `
    1. Log in attempts from Windows 7 - Ontario, Canada.
    2. Requesting any operation using an unusual pattern.
    3. Too many incorrect log in attempts.
`,
    authenticationMessage: `
For security, all your account features are disabled until a response has been received from you.

Please click "Authenticate now" button below to secure your account.

`, Regards: `Best regards,
PayPal Inc Help Center`,


    logoUrl: `${logoUrl}`,
};
