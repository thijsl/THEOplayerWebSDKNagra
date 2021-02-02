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
      sources: {
        src: "//cdn.theoplayer.com/video/elephants-dream/playlist.m3u8",
        useCredentials: false
      }
    };

    player.source = {
      sources: [
        {
          src:
            "https://media.axprod.net/TestVectors/v7-MultiDRM-SingleKey/Manifest_1080p.mpd",
          contentProtection: {
            integration: "nagra",
            widevine: {
              licenseAcquisitionURL:
                "https://drm-widevine-licensing.axtest.net/AcquireLicense"
            },
            integrationParameters: {
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJjb21fa2V5X2lkIjoiYjMzNjRlYjUtNTFmNi00YWUzLThjOTgtMzNjZWQ1ZTMxYzc4IiwibWVzc2FnZSI6eyJ0eXBlIjoiZW50aXRsZW1lbnRfbWVzc2FnZSIsInZlcnNpb24iOjIsImxpY2Vuc2UiOnsiYWxsb3dfcGVyc2lzdGVuY2UiOnRydWV9LCJjb250ZW50X2tleXNfc291cmNlIjp7ImlubGluZSI6W3siaWQiOiI5ZWI0MDUwZC1lNDRiLTQ4MDItOTMyZS0yN2Q3NTA4M2UyNjYiLCJlbmNyeXB0ZWRfa2V5IjoibEszT2pITFlXMjRjcjJrdFI3NGZudz09IiwidXNhZ2VfcG9saWN5IjoiUG9saWN5IEEifV19LCJjb250ZW50X2tleV91c2FnZV9wb2xpY2llcyI6W3sibmFtZSI6IlBvbGljeSBBIiwicGxheXJlYWR5Ijp7Im1pbl9kZXZpY2Vfc2VjdXJpdHlfbGV2ZWwiOjE1MCwicGxheV9lbmFibGVycyI6WyI3ODY2MjdEOC1DMkE2LTQ0QkUtOEY4OC0wOEFFMjU1QjAxQTciXX19XX19.W2FbPDSDaq-LeeLfOnbpTMa-zCmXh8RLChEVDYvdcVw"
            }
          }
        }
      ]
    };
  }
}
