import jsQR from "jsqr";
import { verifyPassURIOffline } from "@vaxxnz/nzcp";

type ParseQrcodeProps = { imageData: ImageData; trustedIssuers: string[] };

export const readQRcode = async ({
  imageData,
  trustedIssuers
}: ParseQrcodeProps): Promise<string> => {
  const message = {
    status: "none",
    payload: null
  };
  const code = jsQR(imageData?.data, imageData?.width, imageData?.height);

  if (code?.data) {
    const { data } = code;

    message.status = "success";
    const verification = verifyPassURIOffline(data, {
      trustedIssuer: trustedIssuers
    });
    message.payload = { verification, raw: data, timestamp: new Date() };
  }

  return JSON.stringify(message);
};
