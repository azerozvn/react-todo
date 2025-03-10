import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import Header from './components/layout/Header';
import About from './components/pages/About';
import './App.css';
import Axios from 'axios';

class App extends Component {
	state = {
		todos: []
	};

	componentDidMount() {
		Axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
			.then((res) => this.setState({ todos: res.data }))
			.catch((err) => console.log(err));
	}

	markComplete = (id) => {
		this.setState({
			todos: this.state.todos.map((todo) => {
				if (todo.id === id) {
					todo.completed = !todo.completed;
				}
				return todo;
			})
		});
	};

	delTodo = (id) => {
		Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
			.then((res) => {
				this.setState({
					todos: this.state.todos.filter((todo) => todo.id !== id)
				});
			})
			.catch((err) => console.log(err));
	};

	addTodo = (title) => {
		Axios.post('https://jsonplaceholder.typicode.com/todos', {
			title,
			completed: false
		})
			.then((res) => {
				this.setState({
					todos: [ ...this.state.todos, res.data ]
				});
			})
			.catch((err) => console.log(err));
	};

	render() {
		return (
			<Router>
				<div className="App container">
					<Header />
					<Route
						exact
						path="/"
						render={(props) => (
							<React.Fragment>
								<AddTodo addTodo={this.addTodo} />
								{/* Use Todos component here, todos attribute contain todos data */}
								<Todos
									todos={this.state.todos}
									markComplete={this.markComplete}
									delTodo={this.delTodo}
								/>
							</React.Fragment>
						)}
					/>
					<Route path="/about" component={About} />
				</div>
			</Router>
		);
	}
}

export default App;
