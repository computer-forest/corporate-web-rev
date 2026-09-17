export const salesforceChatbotConfig = {
    organizationId: "00D2w000008TDq8",

    deploymentName: "SFDC_Test_ESD",

    deploymentUrl:
        "https://sbicapsec.my.site.com/ESWSFDCTestESD1762866056191",

    scrt2Url:
        "https://sbicapsec.my.salesforce-scrt.com",

    scriptUrl:
        "https://sbicapsec.my.site.com/ESWSFDCTestESD1762866056191/assets/js/bootstrap.min.js",

    language: "en_US",

    hiddenPreChatFields: {
        chatreq: "",
    },
} as const;


// Why keep this separate?

// Chatbot component
// → Handles loading and Salesforce events
// Configuration file
// → Contains Salesforce deployment settings