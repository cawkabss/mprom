import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MuiThemeProviderNext from 'material-ui-next/styles/MuiThemeProvider';
import {Route, Redirect} from 'react-router-dom';
import Reboot from 'material-ui-next/Reboot';

import Layout from "./Containers/Layout/Layout";
import Providers from "./Containers/Providers/Providers";
import Products from "./Containers/Products/Products";
import Shops from "./Containers/Shops/Shops";
import Orders from "./Containers/Orders/Orders";
import Search from "./Containers/Search/Search";
import createMuiTheme from "material-ui-next/styles/createMuiTheme";

const themeV1 = createMuiTheme({
    palette: {
        type: 'light', // Switching the dark mode on is a single property value change.
    },
});
class App extends Component {
    render() {
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
    }
}

export default App;
