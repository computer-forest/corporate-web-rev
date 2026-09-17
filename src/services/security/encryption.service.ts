
import CryptoJS from "crypto-js";
import { AES_IV, AES_KEY } from "./security.constants";

const key = CryptoJS.enc.Utf8.parse(AES_KEY);
const iv = CryptoJS.enc.Utf8.parse(AES_IV);

export function encryptPayload(value: string): string {
  const encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(value),
    key,
    {
      keySize: 256 / 8,
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return encrypted.toString();
}
