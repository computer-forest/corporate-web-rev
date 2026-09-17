import { appConfig } from "@/config/app.config";

export default function EnvCheckPage() {
  return (
    <section className="section-padding">
      <div className="container">
        <h1>Environment Check</h1>

        <ul>
          <li>
            <strong>App Env:</strong> {appConfig.env}
          </li>
          <li>
            <strong>Site URL:</strong> {appConfig.siteUrl}
          </li>
          <li>
            <strong>API Base URL:</strong> {appConfig.apiBaseUrl}
          </li>
          <li>
            <strong>CMS Base URL:</strong> {appConfig.cmsBaseUrl}
          </li>
          <li>
            <strong>Redirection URL:</strong> {appConfig.redirectionUrl}
          </li>
        </ul>
      </div>
    </section>
  );
}