import ReactDOM from 'react-dom/client';
import App from './App';
import { datadogRum } from '@datadog/browser-rum';

if (process.env.NODE_ENV === 'production') {
  datadogRum.init({
    applicationId: import.meta.env.VITE_DATADOG_APPID,
    clientToken: import.meta.env.VITE_DATADOG_SECRET,
    // `site` refers to the Datadog site parameter of your organization
    // see https://docs.datadoghq.com/getting_started/site/
    site: 'ap1.datadoghq.com',
    service: 'mm---kcl',
    env: process.env.NODE_ENV,
    // Specify a version number to identify the deployed version of your application in Datadog
    version: '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input',
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
