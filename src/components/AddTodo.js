import React, { Component } from 'react';

export class AddTodo extends Component {
	state = {
		title: ''
	};

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		this.props.addTodo(this.state.title);
		// Clear input
		this.setState({ title: '' });
		document.querySelector('input[name="title"').value = '';
	};

	render() {
		return (
			<form style={{ display: 'flex' }} onSubmit={this.onSubmit}>
				<input
					type="text"
					name="title"
					placeholder="Add Todo ..."
					style={{ flex: '10', padding: '5px', fontSize: '20px' }}
					onChange={this.onChange}
				/>
				<input type="submit" value="Submit" className="btn" style={{ flex: '1' }} />
			</form>
		);
	}
}

export default AddTodo;
