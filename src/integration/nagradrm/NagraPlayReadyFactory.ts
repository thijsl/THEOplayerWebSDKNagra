import {
  ContentProtectionIntegration,
  ContentProtectionIntegrationFactory
} from "THEOplayer";
import { NagraDrmConfiguration } from "./NagraDrmConfiguration";
import { NagraDrmPlayReadyContentProtectionIntegration } from "./NagraPlayReadyIntegration";

export class NagraDrmPlayReadyContentProtectionIntegrationFactory
  implements ContentProtectionIntegrationFactory {
  build(configuration: NagraDrmConfiguration): ContentProtectionIntegration {
    return new NagraDrmPlayReadyContentProtectionIntegration(configuration);
  }
}
