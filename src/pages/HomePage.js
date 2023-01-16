import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";
// pages
import Presentation from "./Presentation";
import Upgrade from "./Upgrade";
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import Profile from "./Profile";
import EditeProfile from "./Editprofile";

import BootstrapTables from "./tables/BootstrapTables";
import Athletes from "./tables/Athletes";
import Comp from "./tables/Comp";

import EntUpd from "./tables/EntUpd";
import UpdPhotos from "./tables/updphotos";
import photosent from "./tables/photosent";
import photosarb from "./tables/photosarb";

import Sportadd from "./tables/Sportadd";
import ClubUpd from "./tables/ClubUpd";

import SuppAdd from "./tables/SuppAdd";
import PoidsAdd from "./tables/PoidsAdd";
import AgeAdd from "./tables/AgeAdd";

import LigueAdd from "./tables/LigueAdd";
import AthleteUpd from "./tables/AthleteUpd";
import LicenceUpd from "./tables/LicenceUpd";

import ArAdd from "./tables/ArAdd";

import SaisonAdd from "./tables/SaisonAdd";
import Supporteur from "./tables/Supporteur";

import Saison from "./tables/saison";
import Arbitre from "./tables/Arbitre";
import Entraineur from "./tables/Entraineur";
import EntAdd from "./tables/EntAdd";

import Athleteadd from "./tables/Athleteadd";
import Clubs from "./tables/Clubs";
import Ligue from "./tables/Ligue";

import ClubAdd from "./tables/ClubAdd";

import Sports from "./tables/Sports";
import Licence from "./tables/Licence";
import LicenceAdd from"./tables/LicenceAdd"
import Signin from "./examples/Signin";
import Signinadmin from "./admin/Signin";
import Signup from "./examples/Signup";
import Role from "./examples/Role";
import Age from "./tables/age";
import Poids from "./tables/Poids";

import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

// documentation pages
import DocsOverview from "./documentation/DocsOverview";
import DocsDownload from "./documentation/DocsDownload";
import DocsQuickStart from "./documentation/DocsQuickStart";
import DocsLicense from "./documentation/DocsLicense";
import DocsFolderStructure from "./documentation/DocsFolderStructure";
import DocsBuild from "./documentation/DocsBuild";
import DocsChangelog from "./documentation/DocsChangelog";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";
import { UploadFile } from '@mui/icons-material';

const RouteWithLoader = ({ component: Component, ...rest }) => {
  
  
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('Visible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }
  const [isLoggedin, setIsLoggedin] = useState();
  return (

<>
{/* {!isLoggedin ? (
          <> 
               <Signin />
           </>
          ) : ( */}
         
<>
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar />
        <main className="content">
          <Navbar />
          <Component {...props} />
          <Footer toggleSettings={toggleSettings} showSettings={showSettings} />
        </main>
      </>
    )}
    /> </>
    {/* )
  
    } */}
    
    //</>
  );
};

export default () => (
<Switch>
    <RouteWithLoader exact path={Routes.Presentation.path} component={Presentation} />
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signinadmin.path} component={Signinadmin} />
   <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
   <RouteWithLoader exact path={Routes.Role.path} component={Role} />

    <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
    <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword} />
    <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
    <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />

    {/* pages */}
    <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
    <RouteWithSidebar exact path={Routes.Upgrade.path} component={Upgrade} />
    <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions} />
    <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
    <RouteWithSidebar exact path={Routes.Profile.path} component={Profile} />
    <RouteWithSidebar exact path={Routes.EditeProfile.path} component={EditeProfile} />

    <RouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables} />
    <RouteWithSidebar exact path={Routes.Athletes.path} component={Athletes} />
    <RouteWithSidebar exact path={Routes.Comp.path} component={Comp} />

    <RouteWithSidebar exact path={Routes.photosent.path} component={photosent} />
    <RouteWithSidebar exact path={Routes.photosarb.path} component={photosarb} />

    <RouteWithSidebar exact path={Routes.EntUpd.path} component={EntUpd} />

    <RouteWithSidebar exact path={Routes.AthleteUpd.path} component={AthleteUpd} />
    <RouteWithSidebar exact path={Routes.LicenceUpd.path} component={LicenceUpd} />
    <RouteWithSidebar exact path={Routes.ClubUpd.path} component={ClubUpd} />

    <RouteWithSidebar exact path={Routes.SuppAdd.path} component={SuppAdd} />
    <RouteWithSidebar exact path={Routes.PoidsAdd.path} component={PoidsAdd} />
    <RouteWithSidebar exact path={Routes.Sportadd.path} component={Sportadd} />
    <RouteWithSidebar exact path={Routes.updphotos.path} component={UpdPhotos} />

    <RouteWithSidebar exact path={Routes.SaisonAdd.path} component={SaisonAdd} />
    <RouteWithSidebar exact path={Routes.ArAdd.path} component={ArAdd} />

    <RouteWithSidebar exact path={Routes.ClubAdd.path} component={ClubAdd} />
    <RouteWithSidebar exact path={Routes.EntAdd.path} component={EntAdd} />

    <RouteWithSidebar exact path={Routes.Supporteur.path} component={Supporteur} />

    <RouteWithSidebar exact path={Routes.Arbitre.path} component={Arbitre} />
    <RouteWithSidebar exact path={Routes.Entraineur.path} component={Entraineur} />

    <RouteWithSidebar exact path={Routes.Age.path} component={Age} />
    <RouteWithSidebar exact path={Routes.Poids.path} component={Poids} />
    <RouteWithSidebar exact path={Routes.Saison.path} component={Saison} />
    <RouteWithSidebar exact path={Routes.Ligue.path} component={Ligue} />
    <RouteWithSidebar exact path={Routes.LigueAdd.path} component={LigueAdd} />
    <RouteWithSidebar exact path={Routes.AgeAdd.path} component={AgeAdd} />

    <RouteWithSidebar exact path={Routes.Athleteadd.path} component={Athleteadd} />
    <RouteWithSidebar exact path={Routes.Clubs.path} component={Clubs} />
    <RouteWithSidebar exact path={Routes.Sports.path} component={Sports} />

    <RouteWithSidebar exact path={Routes.Licence.path} component={Licence} />
    <RouteWithSidebar exact path={Routes.LicenceAdd.path} component={LicenceAdd} />
    {/* components */}
    <RouteWithSidebar exact path={Routes.Accordions.path} component={Accordion} />
    <RouteWithSidebar exact path={Routes.Alerts.path} component={Alerts} />
    <RouteWithSidebar exact path={Routes.Badges.path} component={Badges} />
    <RouteWithSidebar exact path={Routes.Breadcrumbs.path} component={Breadcrumbs} />
    <RouteWithSidebar exact path={Routes.Buttons.path} component={Buttons} />
    <RouteWithSidebar exact path={Routes.Forms.path} component={Forms} />
    <RouteWithSidebar exact path={Routes.Modals.path} component={Modals} />
    <RouteWithSidebar exact path={Routes.Navs.path} component={Navs} />
    <RouteWithSidebar exact path={Routes.Navbars.path} component={Navbars} />
    <RouteWithSidebar exact path={Routes.Pagination.path} component={Pagination} />
    <RouteWithSidebar exact path={Routes.Popovers.path} component={Popovers} />
    <RouteWithSidebar exact path={Routes.Progress.path} component={Progress} />
    <RouteWithSidebar exact path={Routes.Tables.path} component={Tables} />
    <RouteWithSidebar exact path={Routes.Tabs.path} component={Tabs} />
    <RouteWithSidebar exact path={Routes.Tooltips.path} component={Tooltips} />
    <RouteWithSidebar exact path={Routes.Toasts.path} component={Toasts} />

    {/* documentation */}
    <RouteWithSidebar exact path={Routes.DocsOverview.path} component={DocsOverview} />
    <RouteWithSidebar exact path={Routes.DocsDownload.path} component={DocsDownload} />
    <RouteWithSidebar exact path={Routes.DocsQuickStart.path} component={DocsQuickStart} />
    <RouteWithSidebar exact path={Routes.DocsLicense.path} component={DocsLicense} />
    <RouteWithSidebar exact path={Routes.DocsFolderStructure.path} component={DocsFolderStructure} />
    <RouteWithSidebar exact path={Routes.DocsBuild.path} component={DocsBuild} />
    <RouteWithSidebar exact path={Routes.DocsChangelog.path} component={DocsChangelog} />

    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
