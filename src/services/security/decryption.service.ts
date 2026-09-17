import CryptoJS from "crypto-js";
import { AES_IV, AES_KEY } from "./security.constants";

const key = CryptoJS.enc.Utf8.parse(AES_KEY);
const iv = CryptoJS.enc.Utf8.parse(AES_IV);
const JUNK_CRYPTO_LENGTH = 16;

export function decryptPayload(value: string): string {
  const decrypted = CryptoJS.AES.decrypt(value, key, {
    keySize: 256 / 8,
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return CryptoJS.enc.Utf8.stringify(decrypted);
}

export function decryptJunkData(encryptedValue: string, clientId: string): string {
  if (!encryptedValue || !clientId) {
    return "";
  }

  try {
    const clientCryptoValue = CryptoJS.enc.Utf8.parse(
      clientId.padEnd(JUNK_CRYPTO_LENGTH, "=").slice(0, JUNK_CRYPTO_LENGTH)
    );

    const decrypted = CryptoJS.AES.decrypt(encryptedValue, clientCryptoValue, {
      keySize: 128 / 8,
      iv: clientCryptoValue,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return CryptoJS.enc.Utf8.stringify(decrypted);

  } catch {
    return "";
  }
}