
import { faGoogle, faTwitter, faYahoo, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faGlobeEurope, } from '@fortawesome/free-solid-svg-icons';
import React, { useState,useEffect } from 'react';
import USAFlag from '../assets/img/flags/united-states-of-america.svg';
import CanadaFlag from '../assets/img/flags/canada.svg';
import GermanyFlag from '../assets/img/flags/germany.svg';
import FranceFlag from '../assets/img/flags/france.svg';
import JapanFlag from '../assets/img/flags/japan.svg';
import ItalyFlag from '../assets/img/flags/italy.svg';
import axios from "../pages/examples/api/axios";
const LICENCE_URL='licencelist_info/';
const token = localStorage.getItem("token");
const state=[];
axios.post(LICENCE_URL,{userid:1},{ headers : {'Content-Type': 'application/json','Authorization':  `TOKEN ${token}`,
'Access-Control-Allow-Origin':'Accept'}})
.then(res => {
const persons = res.data;
//console.log(persons)

const arb=persons.map(arb => arb)
const mapData = [...arb];
const result={
columns: [
  {
    label: 'num_licences',
    field: 'num_licences',
    sort: 'asc',
    width: 150
  }, {
    label: 'club',
    field: 'club',
    sort: 'asc',
    width: 150
  },{
    label: 'Nom',
    field: 'Nom',
    sort: 'asc',
    width: 150
  },{
    label: 'Prenom',
    field: 'last_name',
    sort: 'asc',
    width: 150
  }
  
],rows: []
};
mapData.forEach((element)=>{
result.rows.push({'num_licences':element.licence.num_licences,'club':element.licence.club,'Nom':element.profile.first_name,'last_name':element.profile.last_name});


});
result.rows.forEach((element)=>{
    state.push(element);

})
console.log(state)
}


)
//   axios.get(ATHLETE_URL)
//   .then(res => {
//     const persons = res.data;
  
//     console.log(persons)

// })


const pageVisits = [
    { id: 1, views: 4.525, returnValue: 255, bounceRate: 42.55, pageName: "/demo/admin/index.html" },
    { id: 2, views: 2.987, returnValue: 139, bounceRate: -43.52, pageName: "/demo/admin/forms.html" },
    { id: 3, views: 2.844, returnValue: 124, bounceRate: -32.35, pageName: "/demo/admin/util.html" },
    { id: 4, views: 1.220, returnValue: 55, bounceRate: 15.78, pageName: "/demo/admin/validation.html" },
    { id: 5, views: 505, returnValue: 3, bounceRate: -75.12, pageName: "/demo/admin/modals.html" }
];

const pageTraffic = [
    { id: 1, source: "12345678", sourceType: "Ali", category: "ben ali",rank: "02/01/1998",trafficShare:"tunisienne", change: "akaber" },
    { id: 2, source: "02514896", sourceType: "Mohessen", category: "ben mohssen",rank: "02/01/1998",trafficShare: "tunisienne", change: "akaber" },
    { id: 3, source: "02158741", sourceType: "Sarah", category: "ali", rank:"02/01/1998", trafficShare: "tunisienne", change: "akaber" },
    { id: 4, source: "15424890", sourceType: "Ali", category: "moghamed", rank: "02/01/1998", trafficShare: "tunisienne" ,change: "akaber" },
    { id: 5, source: "10147852", sourceType: "oumayma", category: "kelmi", rank: "02/01/1998", trafficShare: "tunisienne", change: "akaber" }
];

const pageRanking = [
    { id: 1, country: "United States", countryImage: USAFlag, overallRank: 76, overallRankChange: -5, travelRank: 3, widgetsRank: 32, widgetsRankChange: 3 },
    { id: 2, country: "Canada", countryImage: CanadaFlag, overallRank: 106, overallRankChange: 17, travelRank: 4, widgetsRank: 30, widgetsRankChange: 3 },
    { id: 4, country: "France", countryImage: FranceFlag, overallRank: 112, overallRankChange: 10, travelRank: 5, widgetsRank: 34, widgetsRankChange: 7 },
    { id: 5, country: "Japan", countryImage: JapanFlag, overallRank: 115, overallRankChange: 3, travelRank: 7, travelRankChange: 1, widgetsRank: 39, widgetsRankChange: -2 },
    { id: 3, country: "Germany", countryImage: GermanyFlag, overallRank: 147, overallRankChange: -12, travelRank: 10, travelRankChange: -1, widgetsRank: 12, widgetsRankChange: -5 },
    { id: 6, country: "Italy", countryImage: ItalyFlag, overallRank: 220, overallRankChange: -56, travelRank: 11, travelRankChange: -3, widgetsRank: 89, widgetsRankChange: 2 }
];

const invoiceItems = [
    { id: 1, item: "Origin License", description: "Extended License", price: "999,00", quantity: 1 },
    { id: 2, item: "Custom Services", description: "Instalation and Customization (cost per hour)", price: "150,00", quantity: 20 },
    { id: 3, item: "Hosting", description: "1 year subcription", price: "499,00", quantity: 1 },
    { id: 4, item: "Platinum Support", description: "1 year subcription 24/7", price: "3999,00", quantity: 1 },
];

export {
    pageVisits,
    pageTraffic,
    pageRanking,
    invoiceItems,
    state
    
};