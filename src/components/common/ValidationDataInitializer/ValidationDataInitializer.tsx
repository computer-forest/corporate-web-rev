"use client";

import { useEffect } from "react";

import { getJunkNames } from "@/services/validation/validationData.service";

export default function ValidationDataInitializer() {
    useEffect(() => {
        void getJunkNames().catch(() => {
            /*
             * Do not block the marketing website if
             * validation reference data cannot be loaded.
             *
             * A form that needs the junk-name list will
             * retry through getJunkNames() on submission.
             */
        });
    }, []);

    return null;
}