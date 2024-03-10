import CryptoJS  from 'crypto-js'

export const encrypt = (text:string) => {
  return CryptoJS.AES.encrypt(text, process.env.NEXT_ENCRYPTION_KEY ?? '').toString();
}

export const decrypt = (text:string) => {
  const bytes = CryptoJS.AES.decrypt(text, process.env.NEXT_ENCRYPTION_KEY ?? '');
  return bytes.toString(CryptoJS.enc.Utf8);
}