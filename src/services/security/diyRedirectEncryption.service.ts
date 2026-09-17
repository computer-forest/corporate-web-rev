
import CryptoJS from "crypto-js";

const DIY_KEY_LENGTH = 16;

function createCryptoValue(value: string): CryptoJS.lib.WordArray {
    return CryptoJS.enc.Utf8.parse(
        value.padEnd(DIY_KEY_LENGTH, "=").slice(0, DIY_KEY_LENGTH)
    );
}

export function encryptDiyRedirectValue(
    plainText: string,
    key = "",
    iv = ""
): string {
    const encrypted = CryptoJS.AES.encrypt(
        CryptoJS.enc.Utf8.parse(plainText),
        createCryptoValue(key),
        {
            keySize: 128 / 8,
            iv: createCryptoValue(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }
    );

    return encrypted.toString();
}
