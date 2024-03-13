import CryptoJS  from 'crypto-js'

export const encrypt = (text:string) => {
  console.log(process.env.NEXT_PUBLIC_ENCRYPTION_KEY , 'frr');
  return CryptoJS.AES.encrypt(text, process.env.NEXT_PUBLIC_ENCRYPTION_KEY ?? '').toString();
}

export const decrypt = (text:string) => {
  const bytes = CryptoJS.AES.decrypt(text, process.env.NEXT_PUBLIC_ENCRYPTION_KEY ?? '');
  return bytes.toString(CryptoJS.enc.Utf8);
}