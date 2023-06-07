import React, { Component } from 'react';
import { connect } from "react-redux";

class DefaultClass extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    async componentDidMount() {
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        return (
            <div >

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);


// "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
// "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
