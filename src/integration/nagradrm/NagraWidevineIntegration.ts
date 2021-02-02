import {
  ContentProtectionIntegration,
  LicenseRequest,
  MaybeAsync,
  BufferSource
} from "THEOplayer";
import { NagraDrmConfiguration } from "./NagraDrmConfiguration";
import { isNagraDrmDRMConfiguration } from "./NagraUtils";

export class NagraDrmWidevineContentProtectionIntegration
  implements ContentProtectionIntegration {
  private readonly contentProtectionConfiguration: NagraDrmConfiguration;

  constructor(configuration: NagraDrmConfiguration) {
    if (!isNagraDrmDRMConfiguration(configuration)) {
      throw new Error("The Nagra token has not been correctly configured.");
    }
    this.contentProtectionConfiguration = configuration;
  }

  onLicenseRequest(
    request: LicenseRequest
  ): MaybeAsync<Partial<LicenseRequest> | BufferSource> {
    if (!this.contentProtectionConfiguration.widevine?.licenseAcquisitionURL) {
      throw new Error(
        "The Widevine Nagra license url has not been correctly configured."
      );
    }
    request.url = this.contentProtectionConfiguration.widevine?.licenseAcquisitionURL;
    request.headers = {
      ...request.headers,
      "nv-authorizations": this.contentProtectionConfiguration
        .integrationParameters.token
    };
    return request;
  }
}
