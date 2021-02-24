import React, {Component} from "react"
import PageLayout from "./layout/PageLayout";
import SignIn from "./pages/SignIn";
import { Switch, Route, Redirect } from "react-router-dom";
import SignUp from "./pages/SignUp";
import CheckEmailInfo from "./pages/ChekAuth";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {history, isAuth} = this.props
        return (
        <PageLayout>
            <Switch>
                <Route history = {history} exact path = "/signin"  component = {SignIn}/>
                <Route history = {history} exact path = "/signup" component = {SignUp}/>
                <Route exact path="/signup/verify" component={CheckEmailInfo} />
                <Route exact path="/" render={()=> (isAuth? null: <Redirect to = "signin"/> )}/>
                
            </Switch>
        </PageLayout>        
        );
    }
}
 
export default App;