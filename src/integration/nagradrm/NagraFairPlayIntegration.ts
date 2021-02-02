import {
  ContentProtectionIntegration,
  LicenseRequest,
  MaybeAsync,
  BufferSource,
  CertificateRequest
} from "THEOplayer";
import { NagraDrmConfiguration } from "./NagraDrmConfiguration";
import { isNagraDrmDRMConfiguration } from "./NagraUtils";

export class NagraDrmFairplayContentProtectionIntegration
  implements ContentProtectionIntegration {
  private readonly contentProtectionConfiguration: NagraDrmConfiguration;

  constructor(configuration: NagraDrmConfiguration) {
    if (!isNagraDrmDRMConfiguration(configuration)) {
      throw new Error("The Axinom token has not been correctly configured.");
    }
    this.contentProtectionConfiguration = configuration;
  }

  onCertificateRequest(
    request: CertificateRequest
  ): MaybeAsync<Partial<CertificateRequest> | BufferSource> {
    if (!this.contentProtectionConfiguration.fairplay?.certificateURL) {
      throw new Error(
        "The Axinom certificate url has not been correctly configured."
      );
    }
    request.url = this.contentProtectionConfiguration.fairplay?.certificateURL;
    request.headers = {
      ...request.headers,
      "X-AxDRM-Message": this.contentProtectionConfiguration
        .integrationParameters.token
    };
    return request;
  }

  onLicenseRequest(
    request: LicenseRequest
  ): MaybeAsync<Partial<LicenseRequest> | BufferSource> {
    if (!this.contentProtectionConfiguration.fairplay?.licenseAcquisitionURL) {
      throw new Error(
        "The Axinom Fairplay license url has not been correctly configured."
      );
    }
    request.url = this.contentProtectionConfiguration.fairplay?.licenseAcquisitionURL;
    request.headers = {
      ...request.headers,
      "X-AxDRM-Message": this.contentProtectionConfiguration
        .integrationParameters.token
    };
    return request;
  }
}
