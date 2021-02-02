import {
  ContentProtectionIntegration,
  ContentProtectionIntegrationFactory
} from "THEOplayer";
import { NagraDrmConfiguration } from "./NagraDrmConfiguration";
import { NagraDrmFairplayContentProtectionIntegration } from "./NagraFairPlayIntegration";

export class NagraDrmFairplayContentProtectionIntegrationFactory
  implements ContentProtectionIntegrationFactory {
  build(configuration: NagraDrmConfiguration): ContentProtectionIntegration {
    return new NagraDrmFairplayContentProtectionIntegration(configuration);
  }
}
