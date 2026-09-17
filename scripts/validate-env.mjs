
const REQUIRED_ENV_VARIABLES = [
    "NEXT_PUBLIC_APP_ENV",
    "NEXT_PUBLIC_SITE_URL",
    "NEXT_PUBLIC_API_BASE_URL",
    "NEXT_PUBLIC_CMS_BASE_URL",
    "NEXT_PUBLIC_REDIRECTION_URL",
    "NEXT_PUBLIC_DEMAT_REDIRECT_URL",
];

const ALLOWED_ENVIRONMENTS = [
    "local",
    "uat",
    "production",
];

function getMissingVariables() {
    return REQUIRED_ENV_VARIABLES.filter(
        (variableName) =>
            !process.env[variableName]?.trim()
    );
}

function validateUrl(
    variableName,
    errors
) {
    const value = process.env[variableName];

    if (!value) {
        return;
    }

    try {
        const parsedUrl = new URL(value);

        if (
            parsedUrl.protocol !== "http:" &&
            parsedUrl.protocol !== "https:"
        ) {
            errors.push(
                `${variableName} must use http or https.`
            );
        }
    } catch {
        errors.push(
            `${variableName} must contain a valid URL.`
        );
    }
}

function validateEnvironmentName(errors) {
    const appEnvironment =
        process.env.NEXT_PUBLIC_APP_ENV;

    if (
        appEnvironment &&
        !ALLOWED_ENVIRONMENTS.includes(
            appEnvironment
        )
    ) {
        errors.push(
            `NEXT_PUBLIC_APP_ENV must be one of: ${ALLOWED_ENVIRONMENTS.join(
                ", "
            )}.`
        );
    }
}

function validateRemoteEnvironment(errors) {
    const appEnvironment =
        process.env.NEXT_PUBLIC_APP_ENV;

    if (
        appEnvironment !== "uat" &&
        appEnvironment !== "production"
    ) {
        return;
    }

    const remoteUrlVariables = [
        "NEXT_PUBLIC_SITE_URL",
        "NEXT_PUBLIC_API_BASE_URL",
        "NEXT_PUBLIC_CMS_BASE_URL",
        "NEXT_PUBLIC_REDIRECTION_URL",
        "NEXT_PUBLIC_DEMAT_REDIRECT_URL",
    ];

    for (const variableName of remoteUrlVariables) {
        const value = process.env[variableName];

        if (!value) {
            continue;
        }

        const parsedUrl = new URL(value);

        if (parsedUrl.protocol !== "https:") {
            errors.push(
                `${variableName} must use HTTPS for ${appEnvironment}.`
            );
        }

        if (
            parsedUrl.hostname === "localhost" ||
            parsedUrl.hostname === "127.0.0.1"
        ) {
            errors.push(
                `${variableName} must not point to localhost for ${appEnvironment}.`
            );
        }
    }
}

function validateProductionUrls(errors) {
    const appEnvironment =
        process.env.NEXT_PUBLIC_APP_ENV;

    if (appEnvironment !== "production") {
        return;
    }

    const productionVariables = [
        "NEXT_PUBLIC_SITE_URL",
        "NEXT_PUBLIC_API_BASE_URL",
        "NEXT_PUBLIC_DEMAT_REDIRECT_URL",
    ];

    for (const variableName of productionVariables) {
        const value = process.env[variableName];

        if (
            value?.includes("awsuat") ||
            value?.includes("udn.sbisecurities.in")
        ) {
            errors.push(
                `${variableName} contains a UAT URL in the production environment.`
            );
        }
    }
}

function validateEnvironment() {
    const errors = [];
    const missingVariables =
        getMissingVariables();

    if (missingVariables.length > 0) {
        errors.push(
            `Missing required environment variables: ${missingVariables.join(
                ", "
            )}.`
        );
    }

    for (
        const variableName
        of REQUIRED_ENV_VARIABLES
    ) {
        if (
            variableName !==
            "NEXT_PUBLIC_APP_ENV"
        ) {
            validateUrl(
                variableName,
                errors
            );
        }
    }

    validateEnvironmentName(errors);

    if (errors.length === 0) {
        validateRemoteEnvironment(errors);
        validateProductionUrls(errors);
    }

    if (errors.length > 0) {
        console.error(
            "\nEnvironment validation failed:\n"
        );

        for (const error of errors) {
            console.error(`- ${error}`);
        }

        console.error(
            "\nFix the environment configuration before continuing.\n"
        );

        process.exit(1);
    }

    console.log(
        `Environment validation passed for "${process.env.NEXT_PUBLIC_APP_ENV}".`
    );
}

validateEnvironment();

/* "scripts": {
    "dev": "next dev",
    "dev:uat": "env-cmd -f .env.uat next dev",
    "build": "next build",
    "build:uat": "env-cmd -f .env.uat next build",
    "start": "next start",
    "start:uat": "env-cmd -f .env.uat next start",
    "build:prod": "env-cmd -f .env.production next build",
    "start:prod": "env-cmd -f .env.production next start",
    "lint": "eslint"
}, */