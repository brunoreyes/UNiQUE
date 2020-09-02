import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import RealmQuestion from "../../components/RealmQuestions/RealmQuestions";

const styles = (theme) => ({
    root: {
        background: "blue",
        // borderRadius: 3,
        // border: 0,
        color: "white",
        height: 48,
        padding: "0 30px",
        fontWeight: "bold",
        margin: "10px",
        justify: "center",
    },
    textField: {
        width: 400,
        margin: "10px",
    },
});

class AddNewRealmPage extends Component {
    
    constructor() {
        super();
        this.state = {
            questionInputs: []
        }
    }

    state = {
        name: "",
        photoLink: "",
        description: ""
    };

    //SEND DATA TO SAGA
    submitRealm = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: "SUBMIT_REALM",
            payload: {
                name: this.state.name,
                photoLink: this.state.photoLink,
                description: this.state.description,
                ///questions need to be added to payload
            },
        });
    };

    //CAPTURE INPUTS IN STATE
    handleInputChangeFor = (propertyName) => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
        console.log("state:", this.state);
    };

    appendNewQuestion = () => {
        console.log('You clicked add new questions');
        this.setState({
            questionInputs: [
                ...this.state.questionInputs, <RealmQuestion />
            ]
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <>
                <center>
                <h1>Add New Realm</h1>
                <div className="form">
                        <form>
                            {/* REALM NAME */}
                            <div>
                                <TextField
                                    required
                                    label="Realm Name"
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.handleInputChangeFor("name")}
                                    className={classes.textField}
                                    margin="normal"
                                />
                            </div> 
                            {/* REALM COVER PHOTO LINK */}
                            <div>
                                <TextField
                                    required
                                    label="Realm Cover Photo Link"
                                    type="text"
                                    value={this.state.photoLink}
                                    onChange={this.handleInputChangeFor("photoLink")}
                                    className={classes.textField}
                                    margin="normal"
                                />
                            </div>
                            {/* REALM DESCRIPTION */}
                            <div>
                                <TextField
                                    required
                                    label="Realm Description"
                                    type="text"
                                    value={this.state.description}
                                    onChange={this.handleInputChangeFor("description")}
                                    className={classes.textField}
                                    margin="normal"
                                />
                            </div>
                            {/* WHERE NEW QUESTION INPUTS GO */}
                            <div id="new-question">
                                {this.state.questionInputs.map((questionInputs) => (
                                    <RealmQuestion />
                                ))}
                            </div>
                            {/* ADD NEW QUESTION BUTTON */}
                            <div>
                                <Button
                                    variant="contained"
                                    className="add-section-question"
                                    onClick={this.appendNewQuestion}
                                    className={classes.button}
                                    classes={{ root: classes.root }}
                                >
                                    + Add Question
                                </Button>
                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    className="submit-new-realm"
                                    type="submit"
                                    name="submit"
                                    onClick={this.submitRealm}
                                    className={classes.button}
                                    classes={{ root: classes.root }}
                                >
                                    Save Realm
                                </Button>
                            </div>
                        </form>
                </div>
                </center>
            </>
        );
    }
}

AddNewRealmPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
});


export default withStyles(styles)(connect(mapReduxStateToProps)(AddNewRealmPage));
