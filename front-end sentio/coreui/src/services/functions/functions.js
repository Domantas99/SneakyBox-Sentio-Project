import { GrafanaCreationAPI } from '../backend-urls';

export function linkToGrafana(databaseId, dashboardId) {
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

export function sortData(array, property, sortReverse) {
  array.sort((a,b) => {
    let h = a[property];
    if(typeof a[property]==='number' && typeof b[property]==='number') {
      return a[property] > b[property] ? 1: -1; 
      
    } else {
      return a[property].toLowerCase() > b[property].toLowerCase() ? 1: -1;
    }
  })
  return sortReverse ? array.reverse() : array;
} 