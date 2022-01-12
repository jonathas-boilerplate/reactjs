import React from 'react';

export default class HelloWorld extends React.Component {
    render() {
        const name = (this.props.name == null) ? "World" : this.props.name;
        return <h1>Hello {name}!</h1>;
    }
}