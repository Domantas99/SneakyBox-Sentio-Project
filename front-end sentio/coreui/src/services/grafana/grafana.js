import { GrafanaCreationAPI } from '../backend-urls';

export default function linkToGrafana(databaseId, dashboardId) {
    const obj = {
      Dashboard: {
        ObjectId: dashboardId,
        FileName: "Dashboardas.json"
      },
      DbMetrics: {
        ObjectId: databaseId,
        FileName: "metrics.json"
      }
    }
    return fetch(GrafanaCreationAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })    
  }