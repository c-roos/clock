class MyClass extends React.Component {
    render() {
        return (
            <div>
                <h1>Test Component</h1>
            </div>
        );
    }
}

const testElement = (
    <div id='test'>
        <p>Hello</p>
    </div>
);

ReactDOM.render(testElement, document.getElementById('container'));
ReactDOM.render(<MyClass />, document.getElementById('test'));