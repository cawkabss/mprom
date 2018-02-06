import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MuiThemeProviderNext from 'material-ui-next/styles/MuiThemeProvider';
import {Route, Redirect} from 'react-router-dom';
import Reboot from 'material-ui-next/Reboot';

import Layout from "./components/Layout/Layout";
import Providers from "./components/Providers";
import Products from "./components/Products";
import Shops from "./components/Shops/Shops";
import Orders from "./components/Orders";
import Search from "./components/Search/Search";
import createMuiTheme from "material-ui-next/styles/createMuiTheme";

const themeV1 = createMuiTheme({
    palette: {
        type: 'light', // Switching the dark mode on is a single property value change.
    },
});
const App = props => {
    return (
        <MuiThemeProvider>
            <MuiThemeProviderNext theme={themeV1}>
                <Layout>
                    <Reboot />
                    <Route path="/" exact render={() => <Redirect to="/products"/>}/>
                    <Route path="/products" component={Products}/>
                    <Route path="/providers" component={Providers}/>
                    <Route path="/shops" component={Shops}/>
                    <Route path="/orders" component={Orders}/>
                    <Route path="/search" component={Search}/>
                </Layout>
            </MuiThemeProviderNext>
        </MuiThemeProvider>
    );
};

export default App;
