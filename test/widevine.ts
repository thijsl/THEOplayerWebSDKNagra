import { NagraDrmWidevineContentProtectionIntegrationFactory } from "../src/integration/nagradrm/NagraWidevineFactory";
export { NagraDrmWidevineContentProtectionIntegrationFactory };

declare global {
  interface Window {
    THEOplayer: any;
  }
}

window.THEOplayer = window.THEOplayer || {};

if (window.THEOplayer) {
  const contentProtectionIdentifier = "nagra";
  window.THEOplayer.registerContentProtectionIntegration(
    contentProtectionIdentifier,
    "widevine",
    new NagraDrmWidevineContentProtectionIntegrationFactory()
  );
  const element = document.querySelector("#THEOplayer");
  if (element) {
    const player = new window.THEOplayer.Player(element, {
      ui: {
        fluid: true
      },
      libraryLocation:
        "https://cdn.myth.theoplayer.com/0944d0a8-84c3-40f6-9649-52be4de8ff3c/"
    });

    player.source = {
      sources: [
        {
          src:
            "https://s3-eu-west-1.amazonaws.com/conaxconnect-public/content/ssp/tfs5mlsh/dash/stream.mpd",
          contentProtection: {
            integration: "nagra",
            widevine: {
              licenseAcquisitionURL:
                "https://tfs5mlsh.anycast.nagra.com/TFS5MLSH/wvls/contentlicenseservice/v1/licenses"
            },
            integrationParameters: {
              token:
                "eyJraWQiOiIxMDgzMjAiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIxLjAiLCJ0eXAiOiJDb250ZW50QXV0aFoiLCJleHAiOjE2NTI5NDA2MjYsImNvbnRlbnRSaWdodHMiOlt7ImNvbnRlbnRJZCI6IlZPRC1DT05URU5USUQxIiwidXNhZ2VSdWxlc1Byb2ZpbGVJZCI6IlRlc3QifV19.oFS4dUaNEjdyhE_1J5Q1ssy65VWOHvxWl8Uq1bPavco"
            }
          }
        }
      ]
    };
  }
}
